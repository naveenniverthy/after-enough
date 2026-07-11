import { describe, expect, it } from "vitest";
import { dedupeNews, rankNews } from "./news";
import type { NewsItem } from "./types";

const base: NewsItem = {
  headline: "Nvidia shares rise as chip demand improves",
  source: "Reuters",
  publishedAt: "2026-07-11T11:00:00.000Z",
  summary: "Nvidia and semiconductor stocks are moving higher.",
  whyItMatters: "Relevant to SOXL and SMH.",
  sentiment: "positive",
  affectedTickers: ["NVDA", "SMH", "SOXL"],
  articleUrl: "https://example.com/nvda",
};

describe("news ranking and dedupe", () => {
  it("deduplicates similar headlines", () => {
    const result = dedupeNews([
      base,
      { ...base, headline: "Nvidia stock rises as chip demand improves", articleUrl: "https://example.com/dupe" },
    ]);

    expect(result).toHaveLength(1);
  });

  it("ranks relevant reliable recent items higher", () => {
    const ranked = rankNews(
      [
        { ...base, source: "Unknown blog", publishedAt: "2026-07-10T11:00:00.000Z", headline: "Generic market note" },
        base,
      ],
      new Date("2026-07-11T12:00:00.000Z"),
    );

    expect(ranked[0].headline).toContain("Nvidia");
  });
});
