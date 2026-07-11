export type MarketStatus =
  | "Bullish"
  | "Neutral"
  | "Cautious"
  | "Bearish"
  | "High-Risk Event Day";

export type TradingPosture = "Trade" | "Wait" | "Trade Small" | "Avoid";

export type RiskLevel = "Low" | "Moderate" | "Elevated" | "High";

export type Sentiment = "positive" | "negative" | "neutral";

export type Staleness = "fresh" | "stale" | "unavailable";

export type DataStatus =
  | "Live"
  | "Delayed"
  | "Previous close only"
  | "Unavailable"
  | "Stale";

export type MarketSnapshot = {
  symbol: string;
  name: string;
  value: number | string | null;
  changePercent: number | null;
  interpretation: string;
  timestamp: string;
  dataStatus: DataStatus;
  stale?: boolean;
};

export type SemiconductorQuote = {
  ticker: string;
  company: string;
  previousClose: number | null;
  premarketPrice: number | null;
  premarketPercent: number | null;
  currentPrice: number | null;
  volume: number | null;
  direction: "up" | "down" | "flat" | "unavailable";
  relatedNews: string;
  timestamp: string | null;
  dataStatus: DataStatus;
  changePercent: number | null;
};

export type NewsItem = {
  headline: string;
  source: string;
  publishedAt: string;
  summary: string;
  whyItMatters: string;
  sentiment: Sentiment;
  affectedTickers: string[];
  articleUrl: string;
};

export type EconomicEvent = {
  eventTime: string;
  eventName: string;
  importance: "Low" | "Medium" | "High";
  forecast: string;
  previous: string;
  actual?: string;
  marketImpact: string;
};

export type EarningsEvent = {
  ticker: string;
  company: string;
  reportingTime: "Before open" | "After close" | "Tomorrow" | "Unknown";
  epsEstimate: string;
  revenueEstimate: string;
  importance: "Low" | "Medium" | "High";
  expectedImpact: string;
};

export type ProviderHealth = {
  marketData: Staleness;
  news: Staleness;
  economicCalendar: Staleness;
  earnings: Staleness;
};

export type MorningReport = {
  id?: string;
  reportDate: string;
  generatedAt: string;
  overallStatus: MarketStatus;
  overallScore: number;
  semiconductorScore: number;
  semiconductorLabel: "Strong" | "Moderately Strong" | "Mixed" | "Weak" | "Very Weak";
  volatilityLevel: RiskLevel;
  economicRisk: RiskLevel;
  newsRisk: RiskLevel;
  recommendedPosture: TradingPosture;
  morningSummary: string;
  criticalAlert: {
    title: string;
    detail: string;
    eventTime?: string;
  };
  providerHealth: ProviderHealth;
  marketSnapshots: MarketSnapshot[];
  semiconductors: SemiconductorQuote[];
  newsItems: NewsItem[];
  economicEvents: EconomicEvent[];
  earningsEvents: EarningsEvent[];
  strongestSemiconductor: string;
  weakestSemiconductor: string;
  positiveChipCount: number;
  negativeChipCount: number;
  rawData: Record<string, unknown>;
};

export type ReportListItem = {
  reportDate: string;
  generatedAt: string;
  overallStatus: MarketStatus;
  overallScore: number;
  semiconductorScore: number;
  recommendedPosture: TradingPosture;
};
