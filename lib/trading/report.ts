import { createProviders } from "./providers";
import {
  deriveRiskLevels,
  scoreOverallMarket,
  scoreSemiconductors,
  statusFromScores,
} from "./scoring";
import { easternDateKey } from "./time";
import { getLatestReport } from "./store";
import type {
  EarningsEvent,
  EconomicEvent,
  MarketSnapshot,
  MorningReport,
  NewsItem,
  ProviderHealth,
  SemiconductorQuote,
  Staleness,
} from "./types";

type SectionResult<T> = {
  data: T;
  state: Staleness;
  error?: string;
  source: "provider" | "previous-report" | "empty";
};

function errorMessage(reason: unknown) {
  return reason instanceof Error ? reason.message : "Unknown provider error";
}

function markSnapshotsStale(items: MarketSnapshot[]) {
  return items.map((item) => ({ ...item, dataStatus: "Stale" as const, stale: true }));
}

function markQuotesStale(items: SemiconductorQuote[]) {
  return items.map((item) => ({ ...item, dataStatus: "Stale" as const, relatedNews: `Stale fallback: ${item.relatedNews}` }));
}

function sectionFromSettled<T>(
  result: PromiseSettledResult<T>,
  previous: T | undefined,
  markStale: (data: T) => T,
): SectionResult<T> {
  if (result.status === "fulfilled") {
    return { data: result.value, state: "fresh", source: "provider" };
  }

  if (previous) {
    return {
      data: markStale(previous),
      state: "stale",
      source: "previous-report",
      error: errorMessage(result.reason),
    };
  }

  return {
    data: [] as T,
    state: "unavailable",
    source: "empty",
    error: errorMessage(result.reason),
  };
}

export async function generateMorningReport(): Promise<MorningReport> {
  const providers = createProviders();
  const previousReport = await getLatestReport().catch(() => null);

  const [snapshotResult, semiconductorResult, newsResult, economicResult, earningsResult] = await Promise.allSettled([
    providers.marketData.getOvernightSnapshot(),
    providers.marketData.getSemiconductorQuotes(),
    providers.news.getMarketNews(),
    providers.economicCalendar.getTodaysEvents(),
    providers.earnings.getEarningsEvents(),
  ]);

  const snapshots = sectionFromSettled(
    snapshotResult as PromiseSettledResult<MarketSnapshot[]>,
    previousReport?.marketSnapshots,
    markSnapshotsStale,
  );
  const semiconductors = sectionFromSettled(
    semiconductorResult as PromiseSettledResult<SemiconductorQuote[]>,
    previousReport?.semiconductors,
    markQuotesStale,
  );
  const news = sectionFromSettled(
    newsResult as PromiseSettledResult<NewsItem[]>,
    previousReport?.newsItems,
    (items) => items,
  );
  const economicEvents = sectionFromSettled(
    economicResult as PromiseSettledResult<EconomicEvent[]>,
    previousReport?.economicEvents,
    (items) => items,
  );
  const earningsEvents = sectionFromSettled(
    earningsResult as PromiseSettledResult<EarningsEvent[]>,
    previousReport?.earningsEvents,
    (items) => items,
  );

  const providerHealth: ProviderHealth = {
    marketData: snapshots.state === "fresh" && semiconductors.state === "fresh" ? "fresh" : snapshots.state === "stale" || semiconductors.state === "stale" ? "stale" : "unavailable",
    news: news.state,
    economicCalendar: economicEvents.state,
    earnings: earningsEvents.state,
  };

  const semi = scoreSemiconductors(semiconductors.data, news.data);
  const risks = deriveRiskLevels(snapshots.data, economicEvents.data, news.data);
  const overallScore = scoreOverallMarket(
    snapshots.data,
    semi.score,
    risks.economicRisk,
    risks.newsRisk,
  );
  const { status, posture } = statusFromScores(overallScore, risks.economicRisk, risks.newsRisk);
  const highImpact = economicEvents.data.find((event) => event.importance === "High");
  const vix = snapshots.data.find((item) => item.symbol === "VIX");
  const qqq = snapshots.data.find((item) => item.symbol === "QQQ");

  const criticalAlert = highImpact
    ? {
        title: `${highImpact.eventName} today`,
        detail: `${highImpact.eventName} is scheduled before or during the trading day. Consider waiting for the first reaction to settle.`,
        eventTime: highImpact.eventTime,
      }
    : vix && Number(vix.value) >= 19
      ? {
          title: "VIX elevated above normal levels",
          detail: "Volatility is high enough to reduce position size and demand cleaner setups.",
        }
      : {
          title: "No single critical event dominates the morning",
          detail: "Continue to respect the checklist and avoid trading without a clear setup.",
        };

  const marketDirection =
    qqq?.changePercent === null || qqq?.changePercent === undefined
      ? "unknown"
      : qqq.changePercent >= 0
        ? "positive"
        : "negative";
  const staleWarning = Object.values(providerHealth).some((state) => state === "stale")
    ? " Some sections are stale fallback data and are marked accordingly."
    : "";
  const morningSummary = `${qqq?.name ?? "QQQ"} direction is ${marketDirection}, semiconductor strength is ${semi.label.toLowerCase()}, volatility is ${risks.volatilityLevel.toLowerCase()}, and the recommended posture is ${posture}. ${
    highImpact
      ? `Highest-impact event: ${highImpact.eventName}. Avoid treating the premarket move as a guaranteed signal.`
      : "There is no guaranteed prediction here; use the score as context and wait for price confirmation."
  }${staleWarning}`;

  return {
    reportDate: easternDateKey(),
    generatedAt: new Date().toISOString(),
    overallStatus: status,
    overallScore,
    semiconductorScore: semi.score,
    semiconductorLabel: semi.label,
    volatilityLevel: risks.volatilityLevel,
    economicRisk: risks.economicRisk,
    newsRisk: risks.newsRisk,
    recommendedPosture: posture,
    morningSummary,
    criticalAlert,
    providerHealth,
    marketSnapshots: snapshots.data,
    semiconductors: semiconductors.data,
    newsItems: news.data.slice(0, 10),
    economicEvents: economicEvents.data,
    earningsEvents: earningsEvents.data,
    strongestSemiconductor: semi.strongest,
    weakestSemiconductor: semi.weakest,
    positiveChipCount: semi.positive,
    negativeChipCount: semi.negative,
    rawData: {
      providerHealth,
      providerSources: {
        snapshots: snapshots.source,
        semiconductors: semiconductors.source,
        news: news.source,
        economicEvents: economicEvents.source,
        earningsEvents: earningsEvents.source,
      },
      providerErrors: {
        snapshots: snapshots.error,
        semiconductors: semiconductors.error,
        news: news.error,
        economicEvents: economicEvents.error,
        earningsEvents: earningsEvents.error,
      },
    },
  };
}
