import { describe, expect, it } from "vitest";
import { dataStatusFromTimestamp, percentChange } from "./providerUtils";
import { countdownText } from "./time.testable";

describe("provider utilities", () => {
  it("detects stale data by timestamp", () => {
    const status = dataStatusFromTimestamp({
      timestamp: "2026-07-11T10:00:00.000Z",
      hasPrice: true,
      previousCloseOnly: false,
      configuredDelay: "delayed",
      staleAfterMinutes: 10,
    });

    expect(status).toBe("Stale");
  });

  it("marks previous-close-only data", () => {
    expect(
      dataStatusFromTimestamp({
        timestamp: null,
        hasPrice: true,
        previousCloseOnly: true,
        configuredDelay: "delayed",
      }),
    ).toBe("Previous close only");
  });

  it("calculates percentage change without fabricating missing values", () => {
    expect(percentChange(110, 100)).toBe(10);
    expect(percentChange(null, 100)).toBeNull();
  });

  it("formats economic event countdown text", () => {
    expect(countdownText("2026-07-11T13:30:00.000Z", new Date("2026-07-11T13:05:00.000Z"))).toBe("25m");
  });
});
