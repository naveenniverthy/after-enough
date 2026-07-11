import { z } from "zod";
import { dedupeNews, rankNews } from "./news";
import { dataStatusFromTimestamp, numberOrNull, percentChange } from "./providerUtils";
import { dateKeyInDetroit, previousUsMarketClose, todayAndTomorrowDetroit } from "./time.testable";
import type {
  DataStatus,
  EarningsEvent,
  EconomicEvent,
  MarketSnapshot,
  NewsItem,
  SemiconductorQuote,
} from "./types";

export interface MarketDataProvider {
  getOvernightSnapshot(): Promise<MarketSnapshot[]>;
  getSemiconductorQuotes(): Promise<SemiconductorQuote[]>;
}

export interface NewsProvider {
  getMarketNews(): Promise<NewsItem[]>;
}

export interface EconomicCalendarProvider {
  getTodaysEvents(): Promise<EconomicEvent[]>;
}

export interface EarningsProvider {
  getEarningsEvents(): Promise<EarningsEvent[]>;
}

type Fetcher = typeof fetch;

export const TRACKED_SYMBOLS = [
  "SOXL",
  "SOXS",
  "SMH",
  "QQQ",
  "SPY",
  "NVDA",
  "AMD",
  "AVGO",
  "TSM",
  "MU",
  "ARM",
  "INTC",
  "QCOM",
];

const MARKET_SNAPSHOT_SYMBOLS = ["QQQ", "SPY", "SMH", "SOXL", "SOXS"];
const SEMICONDUCTOR_SYMBOLS = TRACKED_SYMBOLS;
const MAJOR_EARNINGS_SYMBOLS = new Set([
  "NVDA",
  "AMD",
  "AVGO",
  "TSM",
  "MU",
  "ARM",
  "INTC",
  "QCOM",
  "AAPL",
  "MSFT",
  "GOOGL",
  "GOOG",
  "AMZN",
  "META",
  "TSLA",
  "NFLX",
  "ADBE",
  "ASML",
  "AMAT",
  "LRCX",
  "KLAC",
  "MRVL",
  "PANW",
  "CRWD",
  "SNOW",
]);

const SYMBOL_NAMES: Record<string, string> = {
  SOXL: "Direxion Daily Semiconductor Bull 3X",
  SOXS: "Direxion Daily Semiconductor Bear 3X",
  SMH: "VanEck Semiconductor ETF",
  QQQ: "Invesco QQQ Trust",
  SPY: "SPDR S&P 500 ETF",
  NVDA: "NVIDIA",
  AMD: "Advanced Micro Devices",
  AVGO: "Broadcom",
  TSM: "Taiwan Semiconductor",
  MU: "Micron",
  ARM: "Arm Holdings",
  INTC: "Intel",
  QCOM: "Qualcomm",
};

const FmpQuoteSchema = z
  .object({
    symbol: z.string(),
    name: z.string().optional().nullable(),
    price: z.union([z.number(), z.string()]).optional().nullable(),
    previousClose: z.union([z.number(), z.string()]).optional().nullable(),
    changesPercentage: z.union([z.number(), z.string()]).optional().nullable(),
    changePercentage: z.union([z.number(), z.string()]).optional().nullable(),
    volume: z.union([z.number(), z.string()]).optional().nullable(),
    timestamp: z.union([z.number(), z.string()]).optional().nullable(),
  })
  .passthrough();

const FmpAftermarketSchema = z
  .object({
    symbol: z.string(),
    price: z.union([z.number(), z.string()]).optional().nullable(),
    bidPrice: z.union([z.number(), z.string()]).optional().nullable(),
    askPrice: z.union([z.number(), z.string()]).optional().nullable(),
    volume: z.union([z.number(), z.string()]).optional().nullable(),
    timestamp: z.union([z.number(), z.string()]).optional().nullable(),
  })
  .passthrough();

const FmpNewsSchema = z
  .object({
    symbol: z.string().optional().nullable(),
    publishedDate: z.string().optional().nullable(),
    site: z.string().optional().nullable(),
    publisher: z.string().optional().nullable(),
    title: z.string().optional().nullable(),
    text: z.string().optional().nullable(),
    url: z.string().optional().nullable(),
  })
  .passthrough();

const FmpEconomicEventSchema = z
  .object({
    date: z.string(),
    event: z.string().optional().nullable(),
    country: z.string().optional().nullable(),
    impact: z.string().optional().nullable(),
    forecast: z.union([z.string(), z.number()]).optional().nullable(),
    previous: z.union([z.string(), z.number()]).optional().nullable(),
    actual: z.union([z.string(), z.number()]).optional().nullable(),
  })
  .passthrough();

const FmpEarningsEventSchema = z
  .object({
    symbol: z.string(),
    date: z.string().optional().nullable(),
    epsEstimated: z.union([z.string(), z.number()]).optional().nullable(),
    revenueEstimated: z.union([z.string(), z.number()]).optional().nullable(),
    time: z.string().optional().nullable(),
    company: z.string().optional().nullable(),
  })
  .passthrough();

export function parseFmpQuotes(payload: unknown) {
  return z.array(FmpQuoteSchema).parse(payload);
}

export function parseFmpNews(payload: unknown) {
  return z.array(FmpNewsSchema).parse(payload);
}

export function parseFmpEconomicEvents(payload: unknown) {
  return z.array(FmpEconomicEventSchema).parse(payload);
}

export function parseFmpEarningsEvents(payload: unknown) {
  return z.array(FmpEarningsEventSchema).parse(payload);
}

function configuredDelay(): "live" | "delayed" {
  return process.env.FMP_DATA_DELAY_STATUS === "live" ? "live" : "delayed";
}

function nowIso() {
  return new Date().toISOString();
}

function timestampToIso(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (typeof value === "number") {
    return new Date(value < 10_000_000_000 ? value * 1000 : value).toISOString();
  }

  const numeric = Number(value);
  if (Number.isFinite(numeric)) {
    return new Date(numeric < 10_000_000_000 ? numeric * 1000 : numeric).toISOString();
  }

  const parsed = new Date(String(value));
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

function directionFromChange(change: number | null): SemiconductorQuote["direction"] {
  if (change === null) return "unavailable";
  if (change > 0.05) return "up";
  if (change < -0.05) return "down";
  return "flat";
}

function valueText(value: unknown) {
  if (value === null || value === undefined || value === "") {
    return "N/A";
  }
  return String(value);
}

function inferSentiment(text: string): NewsItem["sentiment"] {
  const lower = text.toLowerCase();
  const negativeTerms = ["restriction", "ban", "probe", "cut", "miss", "war", "tariff", "sanction", "falls", "weak"];
  const positiveTerms = ["beat", "raises", "surge", "strong", "upgrade", "record", "deal", "rises", "growth"];
  const negative = negativeTerms.some((term) => lower.includes(term));
  const positive = positiveTerms.some((term) => lower.includes(term));
  if (negative && !positive) return "negative";
  if (positive && !negative) return "positive";
  return "neutral";
}

function affectedTickersFromText(text: string, fallbackSymbol?: string | null) {
  const upper = text.toUpperCase();
  const tickers = TRACKED_SYMBOLS.filter((symbol) => upper.includes(symbol));
  if (fallbackSymbol && TRACKED_SYMBOLS.includes(fallbackSymbol) && !tickers.includes(fallbackSymbol)) {
    tickers.push(fallbackSymbol);
  }
  if (/NVIDIA/i.test(text) && !tickers.includes("NVDA")) tickers.push("NVDA");
  if (/BROADCOM/i.test(text) && !tickers.includes("AVGO")) tickers.push("AVGO");
  if (/MICRON/i.test(text) && !tickers.includes("MU")) tickers.push("MU");
  if (/TAIWAN SEMICONDUCTOR|TSMC/i.test(text) && !tickers.includes("TSM")) tickers.push("TSM");
  if (/SEMICONDUCTOR|CHIP/i.test(text) && !tickers.includes("SMH")) tickers.push("SMH");
  if (/NASDAQ|AI|ARTIFICIAL INTELLIGENCE/i.test(text) && !tickers.includes("QQQ")) tickers.push("QQQ");
  return [...new Set(tickers)];
}

function buildWhyItMatters(item: NewsItem) {
  if (item.affectedTickers.some((ticker) => ["SOXL", "SOXS", "SMH", "NVDA", "AMD", "AVGO", "TSM", "MU"].includes(ticker))) {
    return "Directly relevant to semiconductor breadth and SOXL/SOXS risk.";
  }
  if (/fed|inflation|yield|rate|cpi|ppi/i.test(`${item.headline} ${item.summary}`)) {
    return "Macro rate expectations can move QQQ, yields, and semiconductor multiples.";
  }
  if (/china|taiwan|tariff|export/i.test(`${item.headline} ${item.summary}`)) {
    return "Policy or geopolitical pressure can affect chip supply chains and risk appetite.";
  }
  return "Relevant market context for today, but confirm with price action before trading.";
}

function eventImportance(eventName: string, impact?: string | null): EconomicEvent["importance"] {
  if (/cpi|ppi|payroll|unemployment|jobless|gdp|retail|ism|consumer confidence|fomc|fed|treasury/i.test(eventName)) {
    return "High";
  }
  if (/medium|moderate/i.test(impact ?? "")) {
    return "Medium";
  }
  if (/high/i.test(impact ?? "")) {
    return "High";
  }
  return "Low";
}

function earningsImportance(symbol: string): EarningsEvent["importance"] {
  return MAJOR_EARNINGS_SYMBOLS.has(symbol) ? "High" : "Medium";
}

function reportingTime(value: string | null | undefined): EarningsEvent["reportingTime"] {
  const lower = (value ?? "").toLowerCase();
  if (lower.includes("bmo") || lower.includes("before")) return "Before open";
  if (lower.includes("amc") || lower.includes("after")) return "After close";
  return "Unknown";
}

export class FmpProvider implements MarketDataProvider, NewsProvider, EconomicCalendarProvider, EarningsProvider {
  private readonly baseUrl = "https://financialmodelingprep.com/stable";

  constructor(
    private readonly apiKey = process.env.FMP_API_KEY,
    private readonly fetcher: Fetcher = fetch,
  ) {}

  private async request(path: string, params: Record<string, string | number | undefined> = {}) {
    if (!this.apiKey) {
      throw new Error("FMP_API_KEY is not configured.");
    }

    const url = new URL(`${this.baseUrl}/${path}`);
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
    url.searchParams.set("apikey", this.apiKey);

    const response = await this.fetcher(url, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`FMP ${path} failed: ${response.status}`);
    }

    return response.json();
  }

  private async quoteMap(symbols: string[]) {
    const payload = await this.request("batch-quote", { symbols: symbols.join(",") });
    const quotes = parseFmpQuotes(payload);
    return new Map(quotes.map((quote) => [quote.symbol, quote]));
  }

  private async aftermarketMap(symbols: string[]) {
    try {
      const payload = await this.request("batch-aftermarket-quote", { symbols: symbols.join(",") });
      const quotes = z.array(FmpAftermarketSchema).parse(payload);
      return new Map(quotes.map((quote) => [quote.symbol, quote]));
    } catch {
      return new Map<string, z.infer<typeof FmpAftermarketSchema>>();
    }
  }

  async getOvernightSnapshot(): Promise<MarketSnapshot[]> {
    const quotes = await this.quoteMap(MARKET_SNAPSHOT_SYMBOLS);

    return MARKET_SNAPSHOT_SYMBOLS.map((symbol) => {
      const quote = quotes.get(symbol);
      const price = numberOrNull(quote?.price);
      const previousClose = numberOrNull(quote?.previousClose);
      const changePercent = numberOrNull(quote?.changesPercentage ?? quote?.changePercentage) ?? percentChange(price, previousClose);
      const timestamp = timestampToIso(quote?.timestamp);
      const previousCloseOnly = price === null && previousClose !== null;
      const dataStatus = dataStatusFromTimestamp({
        timestamp,
        hasPrice: price !== null || previousClose !== null,
        previousCloseOnly,
        configuredDelay: configuredDelay(),
      });

      return {
        symbol,
        name: quote?.name ?? SYMBOL_NAMES[symbol] ?? symbol,
        value: price ?? previousClose,
        changePercent,
        interpretation: interpretMarketMove(symbol, changePercent, dataStatus),
        timestamp: timestamp ?? nowIso(),
        dataStatus,
        stale: dataStatus === "Stale",
      };
    });
  }

  async getSemiconductorQuotes(): Promise<SemiconductorQuote[]> {
    const [quotes, aftermarket] = await Promise.all([
      this.quoteMap(SEMICONDUCTOR_SYMBOLS),
      this.aftermarketMap(SEMICONDUCTOR_SYMBOLS),
    ]);

    return SEMICONDUCTOR_SYMBOLS.map((symbol) => {
      const quote = quotes.get(symbol);
      const extended = aftermarket.get(symbol);
      const previousClose = numberOrNull(quote?.previousClose);
      const currentPrice = numberOrNull(quote?.price);
      const extendedPrice = numberOrNull(extended?.price ?? extended?.bidPrice ?? extended?.askPrice);
      const premarketPercent = percentChange(extendedPrice, previousClose);
      const changePercent =
        numberOrNull(quote?.changesPercentage ?? quote?.changePercentage) ?? percentChange(currentPrice, previousClose);
      const timestamp = timestampToIso(extended?.timestamp ?? quote?.timestamp);
      const dataStatus = dataStatusFromTimestamp({
        timestamp,
        hasPrice: currentPrice !== null || extendedPrice !== null || previousClose !== null,
        previousCloseOnly: currentPrice === null && extendedPrice === null && previousClose !== null,
        configuredDelay: configuredDelay(),
      });

      return {
        ticker: symbol,
        company: quote?.name ?? SYMBOL_NAMES[symbol] ?? symbol,
        previousClose,
        premarketPrice: extendedPrice,
        premarketPercent,
        currentPrice,
        volume: numberOrNull(extended?.volume ?? quote?.volume),
        direction: directionFromChange(premarketPercent ?? changePercent),
        relatedNews: dataStatus === "Unavailable" ? "No validated market data available." : `${dataStatus} quote from FMP.`,
        timestamp,
        dataStatus,
        changePercent,
      };
    });
  }

  async getMarketNews(): Promise<NewsItem[]> {
    const since = previousUsMarketClose();
    const payload = await this.request("news/stock-latest", { page: 0, limit: 80 });
    const items = parseFmpNews(payload)
      .map((item) => {
        const publishedAt = timestampToIso(item.publishedDate) ?? nowIso();
        const headline = item.title?.trim();
        if (!headline || new Date(publishedAt) < since) {
          return null;
        }
        const summary = item.text?.trim() || "No summary supplied by the news provider.";
        const affectedTickers = affectedTickersFromText(`${headline} ${summary}`, item.symbol);
        const newsItem: NewsItem = {
          headline,
          source: item.publisher ?? item.site ?? "FMP news",
          publishedAt,
          summary,
          whyItMatters: "",
          sentiment: inferSentiment(`${headline} ${summary}`),
          affectedTickers,
          articleUrl: item.url ?? "https://financialmodelingprep.com/",
        };
        return { ...newsItem, whyItMatters: buildWhyItMatters(newsItem) };
      })
      .filter((item): item is NewsItem => Boolean(item))
      .filter((item) => isRelevantNews(item));

    return rankNews(dedupeNews(items)).slice(0, 10);
  }

  async getTodaysEvents(): Promise<EconomicEvent[]> {
    const { today } = todayAndTomorrowDetroit();
    const payload = await this.request("economic-calendar", { from: today, to: today });
    return parseFmpEconomicEvents(payload)
      .filter((item) => /us|united states/i.test(item.country ?? "US"))
      .map((item) => {
        const eventName = item.event?.trim() || "Economic event";
        return {
          eventTime: timestampToIso(item.date) ?? new Date(`${today}T08:30:00-04:00`).toISOString(),
          eventName,
          importance: eventImportance(eventName, item.impact),
          forecast: valueText(item.forecast),
          previous: valueText(item.previous),
          actual: item.actual === null || item.actual === undefined ? undefined : valueText(item.actual),
          marketImpact: marketImpactForEvent(eventName),
        };
      })
      .filter((event) => event.importance !== "Low")
      .sort((a, b) => new Date(a.eventTime).getTime() - new Date(b.eventTime).getTime());
  }

  async getEarningsEvents(): Promise<EarningsEvent[]> {
    const { today, tomorrow } = todayAndTomorrowDetroit();
    const payload = await this.request("earnings-calendar", { from: today, to: tomorrow });
    return parseFmpEarningsEvents(payload)
      .map((item) => {
        const symbol = item.symbol.toUpperCase();
        return {
          ticker: symbol,
          company: item.company ?? SYMBOL_NAMES[symbol] ?? symbol,
          reportingTime: dateKeyInDetroit(new Date(item.date ?? today)) === tomorrow ? "Tomorrow" : reportingTime(item.time),
          epsEstimate: valueText(item.epsEstimated),
          revenueEstimate: valueText(item.revenueEstimated),
          importance: earningsImportance(symbol),
          expectedImpact: expectedEarningsImpact(symbol),
        };
      })
      .filter((event) => event.importance === "High")
      .slice(0, 16);
  }
}

function isRelevantNews(item: NewsItem) {
  const text = `${item.headline} ${item.summary}`.toLowerCase();
  return (
    item.affectedTickers.length > 0 ||
    /semiconductor|nvidia|amd|broadcom|tsmc|micron|federal reserve|inflation|interest rate|treasury yield|china|taiwan|tariff|export restriction|artificial intelligence|geopolitical/.test(text)
  );
}

function interpretMarketMove(symbol: string, change: number | null, status: DataStatus) {
  if (status === "Unavailable") {
    return "No validated quote is available from the provider.";
  }
  if (status === "Previous close only") {
    return "Only prior close is available; do not infer current direction.";
  }
  if (change === null) {
    return `${status} quote available, but percentage change was not supplied.`;
  }
  if (Math.abs(change) < 0.15) {
    return `${symbol} is nearly flat.`;
  }
  return change > 0 ? `${symbol} is trading higher.` : `${symbol} is trading lower.`;
}

function marketImpactForEvent(eventName: string) {
  if (/cpi|ppi|inflation/i.test(eventName)) {
    return "Inflation surprise can move yields, QQQ, and semiconductor multiples quickly.";
  }
  if (/payroll|unemployment|jobless/i.test(eventName)) {
    return "Labor-market surprise can reprice Fed expectations before the open.";
  }
  if (/fomc|fed/i.test(eventName)) {
    return "Fed communication can create broad index and volatility risk.";
  }
  if (/treasury/i.test(eventName)) {
    return "Auction demand can affect yields and growth-stock appetite.";
  }
  return "High-priority US economic event; wait for the first reaction if timing is close.";
}

function expectedEarningsImpact(symbol: string) {
  if (["NVDA", "AMD", "AVGO", "TSM", "MU", "ARM", "INTC", "QCOM"].includes(symbol)) {
    return "Semiconductor earnings can affect SMH, SOXL, SOXS, QQQ, and chip-stock breadth.";
  }
  if (["AAPL", "MSFT", "GOOGL", "GOOG", "AMZN", "META", "TSLA"].includes(symbol)) {
    return "Mega-cap earnings can influence QQQ and overall risk appetite.";
  }
  return "Nasdaq-heavy earnings event with possible sentiment impact.";
}

export class DemoMarketDataProvider implements MarketDataProvider {
  async getOvernightSnapshot() {
    return [
      ["QQQ", "Invesco QQQ Trust", 555.1, 0.4, "Nasdaq benchmark is positive but not predictive."],
      ["SPY", "SPDR S&P 500 ETF", 650.8, 0.28, "Broad market is modestly positive."],
      ["SMH", "VanEck Semiconductor ETF", 284.8, 0.96, "Sector ETF is outperforming QQQ premarket."],
      ["SOXL", "Direxion Daily Semiconductor Bull 3X", 32.74, 3.39, "Leveraged chip ETF is showing a strong premarket bid."],
      ["SOXS", "Direxion Daily Semiconductor Bear 3X", 18.22, -3.3, "Inverse chip ETF confirms positive semiconductor risk appetite."],
    ].map(([symbol, name, value, changePercent, interpretation]) => ({
      symbol: String(symbol),
      name: String(name),
      value: value as number,
      changePercent: Number(changePercent),
      interpretation: String(interpretation),
      timestamp: nowIso(),
      dataStatus: "Stale" as const,
      stale: true,
    }));
  }

  async getSemiconductorQuotes(): Promise<SemiconductorQuote[]> {
    const rows: Array<[string, string, number, number, number, number, number, string]> = [
      ["SOXL", "Direxion Daily Semiconductor Bull 3X", 31.82, 32.9, 3.39, 32.74, 2470000, "Mock fallback quote."],
      ["SOXS", "Direxion Daily Semiconductor Bear 3X", 18.76, 18.14, -3.3, 18.22, 1420000, "Mock fallback quote."],
      ["SMH", "VanEck Semiconductor ETF", 282.4, 285.1, 0.96, 284.8, 320000, "Mock fallback quote."],
      ["QQQ", "Invesco QQQ Trust", 553.2, 555.4, 0.4, 555.1, 880000, "Mock fallback quote."],
      ["SPY", "SPDR S&P 500 ETF", 648.7, 650.8, 0.32, 650.5, 1200000, "Mock fallback quote."],
      ["NVDA", "NVIDIA", 171.5, 174.1, 1.52, 173.8, 3900000, "Mock fallback quote."],
      ["AMD", "Advanced Micro Devices", 152.4, 153.7, 0.85, 153.4, 1100000, "Mock fallback quote."],
      ["AVGO", "Broadcom", 286.3, 288.6, 0.8, 288.1, 480000, "Mock fallback quote."],
      ["TSM", "Taiwan Semiconductor", 241.8, 240.5, -0.54, 240.9, 270000, "Mock fallback quote."],
      ["MU", "Micron", 125.2, 127.9, 2.16, 127.4, 740000, "Mock fallback quote."],
      ["ARM", "Arm Holdings", 164.8, 166.2, 0.85, 166.0, 290000, "Mock fallback quote."],
      ["INTC", "Intel", 33.4, 33.1, -0.9, 33.2, 530000, "Mock fallback quote."],
      ["QCOM", "Qualcomm", 159.2, 160.1, 0.57, 159.9, 180000, "Mock fallback quote."],
    ];

    return rows.map(([ticker, company, previousClose, premarketPrice, premarketPercent, currentPrice, volume, relatedNews]) => ({
      ticker,
      company,
      previousClose,
      premarketPrice,
      premarketPercent,
      currentPrice,
      volume,
      direction: directionFromChange(premarketPercent),
      relatedNews,
      timestamp: nowIso(),
      dataStatus: "Stale",
      changePercent: premarketPercent,
    }));
  }
}

export class DemoNewsProvider implements NewsProvider {
  async getMarketNews(): Promise<NewsItem[]> {
    const publishedAt = nowIso();
    return [
      {
        headline: "Markets wait for high-impact inflation data before the open",
        source: "Mock fallback",
        publishedAt,
        summary: "Index ETFs are positive, but traders are watching the morning inflation release.",
        whyItMatters: "A surprise in inflation can quickly move yields, QQQ, and leveraged semiconductor ETFs.",
        sentiment: "neutral",
        affectedTickers: ["QQQ", "SOXL", "SMH"],
        articleUrl: "https://financialmodelingprep.com/developer/docs",
      },
    ];
  }
}

export class DemoEconomicCalendarProvider implements EconomicCalendarProvider {
  async getTodaysEvents(): Promise<EconomicEvent[]> {
    return [
      {
        eventTime: new Date(new Date().setUTCHours(12, 30, 0, 0)).toISOString(),
        eventName: "Consumer Price Index",
        importance: "High",
        forecast: "Mock",
        previous: "Mock",
        marketImpact: "Mock fallback event; configure FMP for live calendar data.",
      },
    ];
  }
}

export class DemoEarningsProvider implements EarningsProvider {
  async getEarningsEvents(): Promise<EarningsEvent[]> {
    return [
      {
        ticker: "NVDA",
        company: "NVIDIA",
        reportingTime: "After close",
        epsEstimate: "Mock",
        revenueEstimate: "Mock",
        importance: "High",
        expectedImpact: "Mock fallback earnings; configure FMP for live earnings data.",
      },
    ];
  }
}

export function createProviders() {
  if (process.env.MOCK_DATA_MODE === "true" || !process.env.FMP_API_KEY) {
    return {
      marketData: new DemoMarketDataProvider(),
      news: new DemoNewsProvider(),
      economicCalendar: new DemoEconomicCalendarProvider(),
      earnings: new DemoEarningsProvider(),
    };
  }

  const fmp = new FmpProvider();
  return {
    marketData: fmp,
    news: fmp,
    economicCalendar: fmp,
    earnings: fmp,
  };
}
