import { describe, expect, it } from "vitest";
import { scoreOverallMarket, scoreSemiconductors, statusFromScores } from "./scoring";
import type { MarketSnapshot, NewsItem, SemiconductorQuote } from "./types";

const quote = (ticker: string, change: number): SemiconductorQuote => ({
  ticker,
  company: ticker,
  previousClose: 100,
  premarketPrice: 100 + change,
  premarketPercent: change,
  currentPrice: 100 + change,
  volume: 1000,
  direction: change > 0 ? "up" : change < 0 ? "down" : "flat",
  relatedNews: "test",
  timestamp: "2026-07-11T12:00:00.000Z",
  dataStatus: "Delayed",
  changePercent: change,
});

const news: NewsItem[] = [
  {
    headline: "Chip stocks rise",
    source: "Reuters",
    publishedAt: "2026-07-11T12:00:00.000Z",
    summary: "NVDA rises",
    whyItMatters: "Chip breadth",
    sentiment: "positive",
    affectedTickers: ["NVDA", "SMH"],
    articleUrl: "https://example.com",
  },
];

describe("scoring", () => {
  it("scores semiconductor strength from structured quote breadth", () => {
    const result = scoreSemiconductors(
      ["SOXL", "SMH", "QQQ", "NVDA", "AMD", "AVGO", "TSM", "MU", "ARM", "INTC", "QCOM"].map((ticker) => quote(ticker, 1)),
      news,
    );

    expect(result.score).toBeGreaterThan(70);
    expect(result.label).toBe("Strong");
  });

  it("applies high-impact event caution to posture", () => {
    expect(statusFromScores(82, "High", "Low").posture).toBe("Wait");
  });

  it("scores overall market from market snapshots", () => {
    const snapshots: MarketSnapshot[] = [
      { symbol: "QQQ", name: "QQQ", value: 100, changePercent: 1, interpretation: "", timestamp: "2026-07-11T12:00:00.000Z", dataStatus: "Delayed" },
      { symbol: "SPY", name: "SPY", value: 100, changePercent: 0.5, interpretation: "", timestamp: "2026-07-11T12:00:00.000Z", dataStatus: "Delayed" },
      { symbol: "SMH", name: "SMH", value: 100, changePercent: 1.2, interpretation: "", timestamp: "2026-07-11T12:00:00.000Z", dataStatus: "Delayed" },
    ];

    expect(scoreOverallMarket(snapshots, 75, "Low", "Low")).toBeGreaterThan(55);
  });
});
