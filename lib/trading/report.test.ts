import { describe, expect, it, vi } from "vitest";
import type { MarketSnapshot, MorningReport, SemiconductorQuote } from "./types";

const snapshot: MarketSnapshot = {
  symbol: "QQQ",
  name: "QQQ",
  value: 100,
  changePercent: 1,
  interpretation: "up",
  timestamp: "2026-07-11T12:00:00.000Z",
  dataStatus: "Delayed",
};

const quote: SemiconductorQuote = {
  ticker: "NVDA",
  company: "NVIDIA",
  previousClose: 100,
  premarketPrice: 101,
  premarketPercent: 1,
  currentPrice: 101,
  volume: 100,
  direction: "up",
  relatedNews: "fresh",
  timestamp: "2026-07-11T12:00:00.000Z",
  dataStatus: "Delayed",
  changePercent: 1,
};

vi.mock("./providers", () => ({
  createProviders: () => ({
    marketData: {
      getOvernightSnapshot: async () => {
        throw new Error("market down");
      },
      getSemiconductorQuotes: async () => [quote],
    },
    news: { getMarketNews: async () => [] },
    economicCalendar: { getTodaysEvents: async () => [] },
    earnings: { getEarningsEvents: async () => [] },
  }),
}));

vi.mock("./store", () => ({
  getLatestReport: async () =>
    ({
      marketSnapshots: [snapshot],
      semiconductors: [quote],
      newsItems: [],
      economicEvents: [],
      earningsEvents: [],
    }) as Partial<MorningReport>,
}));

describe("report fallback", () => {
  it("uses previous successful market snapshot when a provider fails", async () => {
    const { generateMorningReport } = await import("./report");
    const report = await generateMorningReport();

    expect(report.providerHealth.marketData).toBe("stale");
    expect(report.marketSnapshots[0].dataStatus).toBe("Stale");
    expect(report.rawData.providerErrors).toHaveProperty("snapshots");
  });
});
