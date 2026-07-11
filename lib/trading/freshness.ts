import { previousUsMarketClose, isStaleTimestamp, dateKeyInDetroit } from "./time.testable";
import type { MorningReport } from "./types";

export function reportFreshness(report: MorningReport, now = new Date()) {
  const staleSections: string[] = [];

  if (isStaleTimestamp(report.generatedAt, 12 * 60, now)) {
    staleSections.push("report");
  }

  if (report.semiconductors.some((quote) => quote.dataStatus === "Stale" || isStaleTimestamp(quote.timestamp, 30, now))) {
    staleSections.push("premarket quotes");
  }

  const previousClose = previousUsMarketClose(now);
  if (report.newsItems.length && report.newsItems.every((item) => new Date(item.publishedAt) < previousClose)) {
    staleSections.push("news");
  }

  if (report.economicEvents.length && report.economicEvents.every((event) => dateKeyInDetroit(new Date(event.eventTime)) !== dateKeyInDetroit(now))) {
    staleSections.push("economic calendar");
  }

  if (report.earningsEvents.length && isStaleTimestamp(report.generatedAt, 24 * 60, now)) {
    staleSections.push("earnings calendar");
  }

  return {
    staleSections: [...new Set(staleSections)],
    isCriticalStale: staleSections.includes("report") || staleSections.includes("premarket quotes"),
  };
}
