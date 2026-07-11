import { describe, expect, it } from "vitest";
import { getMarketDayStatus } from "./marketCalendar";
import { shouldRunMorningCron } from "./time";

describe("market calendar", () => {
  it("skips weekends", () => {
    expect(getMarketDayStatus(new Date("2026-07-11T12:00:00.000Z")).isMarketDay).toBe(false);
  });

  it("marks US market holidays", () => {
    const status = getMarketDayStatus(new Date("2026-12-25T14:00:00.000Z"));
    expect(status.isMarketDay).toBe(false);
    expect(status.reason).toContain("Christmas");
  });

  it("allows holiday override", () => {
    expect(getMarketDayStatus(new Date("2026-12-25T14:00:00.000Z"), true).isMarketDay).toBe(true);
  });

  it("guards the 7 AM Detroit cron window across DST schedule attempts", () => {
    expect(shouldRunMorningCron(new Date("2026-07-13T11:00:00.000Z"))).toBe(true);
    expect(shouldRunMorningCron(new Date("2026-07-13T12:00:00.000Z"))).toBe(false);
  });
});
