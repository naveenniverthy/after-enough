import { describe, expect, it, vi } from "vitest";
import { FmpProvider, parseFmpEconomicEvents, parseFmpNews, parseFmpQuotes } from "./providers";

describe("FMP provider parsing", () => {
  it("validates quote payloads", () => {
    const parsed = parseFmpQuotes([{ symbol: "NVDA", price: 174, previousClose: 170, timestamp: 1783771200 }]);
    expect(parsed[0].symbol).toBe("NVDA");
  });

  it("rejects malformed news payloads", () => {
    expect(() => parseFmpNews([{ title: 123 }])).toThrow();
  });

  it("validates economic events", () => {
    expect(parseFmpEconomicEvents([{ date: "2026-07-11 08:30:00", event: "CPI", country: "US" }])[0].event).toBe("CPI");
  });

  it("parses quote responses into nullable semiconductor quotes", async () => {
    const fetcher = vi.fn(async (url: URL) => {
      const href = url.toString();
      return {
        ok: true,
        json: async () =>
          href.includes("aftermarket")
            ? [{ symbol: "NVDA", price: 176, timestamp: 1783771200 }]
            : [{ symbol: "NVDA", name: "NVIDIA", price: 175, previousClose: 170, changesPercentage: 2.94, volume: 100 }],
      } as Response;
    });
    const provider = new FmpProvider("test-key", fetcher as unknown as typeof fetch);
    const quotes = await provider.getSemiconductorQuotes();
    const nvda = quotes.find((item) => item.ticker === "NVDA");

    expect(nvda?.previousClose).toBe(170);
    expect(nvda?.premarketPercent).toBeCloseTo(3.529, 2);
  });
});
