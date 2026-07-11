import type { DataStatus } from "./types";
import { isStaleTimestamp } from "./time.testable";

export function dataStatusFromTimestamp({
  timestamp,
  hasPrice,
  previousCloseOnly,
  configuredDelay,
  staleAfterMinutes = 45,
}: {
  timestamp: string | null;
  hasPrice: boolean;
  previousCloseOnly: boolean;
  configuredDelay: "live" | "delayed";
  staleAfterMinutes?: number;
}): DataStatus {
  if (!hasPrice) {
    return "Unavailable";
  }

  if (previousCloseOnly) {
    return "Previous close only";
  }

  if (isStaleTimestamp(timestamp, staleAfterMinutes)) {
    return "Stale";
  }

  return configuredDelay === "live" ? "Live" : "Delayed";
}

export function percentChange(current: number | null, previous: number | null) {
  if (current === null || previous === null || previous === 0) {
    return null;
  }

  return ((current - previous) / previous) * 100;
}

export function numberOrNull(value: unknown) {
  const number = typeof value === "number" ? value : typeof value === "string" ? Number(value) : NaN;
  return Number.isFinite(number) ? number : null;
}
