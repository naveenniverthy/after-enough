import type {
  EconomicEvent,
  MarketSnapshot,
  MorningReport,
  NewsItem,
  RiskLevel,
  SemiconductorQuote,
  TradingPosture,
} from "./types";

const clampScore = (score: number) => Math.max(0, Math.min(100, Math.round(score)));

const snapshotChange = (snapshots: MarketSnapshot[], symbol: string) =>
  snapshots.find((item) => item.symbol === symbol)?.changePercent ?? 0;

const quoteChange = (quotes: SemiconductorQuote[], ticker: string) =>
  quotes.find((item) => item.ticker === ticker)?.premarketPercent ?? quotes.find((item) => item.ticker === ticker)?.changePercent ?? 0;

export function scoreSemiconductors(quotes: SemiconductorQuote[], news: NewsItem[]) {
  const chipTickers = quotes.filter((quote) => !["SOXS", "QQQ"].includes(quote.ticker));
  const positive = chipTickers.filter((quote) => (quote.premarketPercent ?? quote.changePercent ?? 0) > 0).length;
  const negative = chipTickers.filter((quote) => (quote.premarketPercent ?? quote.changePercent ?? 0) < 0).length;
  const breadthScore = chipTickers.length ? (positive / chipTickers.length) * 25 : 10;

  // Weights favor sector ETFs first, then breadth and the most market-moving chip leaders.
  const smh = quoteChange(quotes, "SMH") * 7;
  const soxl = quoteChange(quotes, "SOXL") * 4;
  const qqq = quoteChange(quotes, "QQQ") * 3;
  const leaders =
    (quoteChange(quotes, "NVDA") +
      quoteChange(quotes, "AMD") +
      quoteChange(quotes, "AVGO") +
      quoteChange(quotes, "TSM") +
      quoteChange(quotes, "MU")) *
    2.5;
  const relative = (quoteChange(quotes, "SMH") - quoteChange(quotes, "QQQ")) * 5;
  const sentiment =
    news.filter((item) => item.affectedTickers.some((ticker) => ["SOXL", "SMH", "NVDA", "AMD", "AVGO", "TSM", "MU"].includes(ticker)))
      .reduce((total, item) => total + (item.sentiment === "positive" ? 3 : item.sentiment === "negative" ? -4 : 0), 0);

  const score = clampScore(50 + breadthScore - 12.5 + smh + soxl + qqq + leaders + relative + sentiment);
  const sorted = [...chipTickers].sort((a, b) => (b.premarketPercent ?? b.changePercent ?? -999) - (a.premarketPercent ?? a.changePercent ?? -999));

  return {
    score,
    label:
      score >= 75
        ? "Strong"
        : score >= 62
          ? "Moderately Strong"
          : score >= 45
            ? "Mixed"
            : score >= 30
              ? "Weak"
              : "Very Weak",
    strongest: sorted[0]?.ticker ?? "N/A",
    weakest: sorted.at(-1)?.ticker ?? "N/A",
    positive,
    negative,
  } as const;
}

export function deriveRiskLevels(
  snapshots: MarketSnapshot[],
  events: EconomicEvent[],
  news: NewsItem[],
) {
  const vix = snapshots.find((item) => item.symbol === "VIX")?.value;
  const vixNumber = typeof vix === "number" ? vix : Number(vix);
  const volatilityLevel: RiskLevel =
    vixNumber >= 25 ? "High" : vixNumber >= 19 ? "Elevated" : vixNumber >= 15.5 ? "Moderate" : "Low";
  const economicRisk: RiskLevel = events.some((event) => event.importance === "High")
    ? "High"
    : events.some((event) => event.importance === "Medium")
      ? "Moderate"
      : "Low";
  const negativeNewsCount = news.filter((item) => item.sentiment === "negative").length;
  const newsRisk: RiskLevel = negativeNewsCount >= 3 ? "High" : negativeNewsCount >= 1 ? "Elevated" : "Low";

  return { volatilityLevel, economicRisk, newsRisk };
}

export function scoreOverallMarket(
  snapshots: MarketSnapshot[],
  semiconductorScore: number,
  economicRisk: RiskLevel,
  newsRisk: RiskLevel,
) {
  // Structured data is primary: index futures, volatility, rates, dollar, and semiconductor strength.
  const indexTone =
    snapshotChange(snapshots, "NQ") * 10 +
    snapshotChange(snapshots, "ES") * 8 +
    snapshotChange(snapshots, "RTY") * 5;
  const volatility = snapshotChange(snapshots, "VIX") * -2;
  const rates = (snapshotChange(snapshots, "US10Y") + snapshotChange(snapshots, "US2Y")) * -1.5;
  const dollar = snapshotChange(snapshots, "DXY") * -2;
  const semi = (semiconductorScore - 50) * 0.35;
  const eventPenalty = economicRisk === "High" ? -14 : economicRisk === "Elevated" ? -8 : economicRisk === "Moderate" ? -5 : 0;
  const newsPenalty = newsRisk === "High" ? -10 : newsRisk === "Elevated" ? -5 : 0;

  return clampScore(50 + indexTone + volatility + rates + dollar + semi + eventPenalty + newsPenalty);
}

export function statusFromScores(
  overallScore: number,
  economicRisk: RiskLevel,
  newsRisk: RiskLevel,
): { status: MorningReport["overallStatus"]; posture: TradingPosture } {
  if (economicRisk === "High") {
    return { status: "High-Risk Event Day", posture: "Wait" };
  }
  if (newsRisk === "High" || overallScore < 35) {
    return { status: "Bearish", posture: "Avoid" };
  }
  if (overallScore < 48) {
    return { status: "Cautious", posture: "Trade Small" };
  }
  if (overallScore >= 68) {
    return { status: "Bullish", posture: "Trade" };
  }
  return { status: "Neutral", posture: "Wait" };
}
