import { hasValidCronSecret } from "@/lib/trading/auth";
import { getEnv } from "@/lib/trading/env";
import { logInfo, logWarn, logError } from "@/lib/trading/logger";
import { getMarketDayStatus } from "@/lib/trading/marketCalendar";
import { generateMorningReport } from "@/lib/trading/report";
import { hasReportForDate, recordReportRun, saveReport } from "@/lib/trading/store";
import { shouldRunMorningCron } from "@/lib/trading/time";
import { easternDateKey } from "@/lib/trading/time";

export const dynamic = "force-dynamic";

async function generateAndSave() {
  const report = await generateMorningReport();
  return saveReport(report);
}

export async function GET(request: Request) {
  const startedAt = new Date().toISOString();
  const reportDate = easternDateKey();
  if (!hasValidCronSecret(request)) {
    logWarn("cron_rejected", { reason: "invalid_secret" });
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!shouldRunMorningCron()) {
    const reason = "Cron only generates at 7:00 AM America/Detroit on weekdays.";
    logInfo("cron_skipped", { reason, reportDate });
    await recordReportRun({ startedAt, completedAt: new Date().toISOString(), triggerType: "cron", reportDate, status: "skipped", errorSummary: reason });
    return Response.json({
      skipped: true,
      reason,
    });
  }

  const marketDay = getMarketDayStatus(new Date(), getEnv().GENERATE_ON_MARKET_HOLIDAYS);
  if (!marketDay.isMarketDay) {
    logInfo("cron_skipped", { reason: marketDay.reason, reportDate });
    await recordReportRun({ startedAt, completedAt: new Date().toISOString(), triggerType: "cron", reportDate, status: "skipped", errorSummary: marketDay.reason });
    return Response.json({ skipped: true, reason: marketDay.reason });
  }

  if (await hasReportForDate(reportDate)) {
    const reason = "Report already exists for this report date.";
    logInfo("cron_duplicate_prevented", { reportDate });
    await recordReportRun({ startedAt, completedAt: new Date().toISOString(), triggerType: "cron", reportDate, status: "skipped", errorSummary: reason });
    return Response.json({ skipped: true, reason });
  }

  try {
    logInfo("report_generation_start", { triggerType: "cron", reportDate });
    const report = await generateAndSave();
    const staleSections = Object.entries(report.providerHealth).filter(([, state]) => state === "stale").map(([section]) => section);
    await recordReportRun({
      startedAt,
      completedAt: new Date().toISOString(),
      triggerType: "cron",
      reportDate,
      status: staleSections.length ? "partial" : "completed",
      providerStatus: report.providerHealth,
      fallbackUsed: staleSections.length > 0,
      staleSections,
    });
    return Response.json({ report });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown cron generation error";
    logError("report_generation_failed", { triggerType: "cron", reportDate, error: message });
    await recordReportRun({ startedAt, completedAt: new Date().toISOString(), triggerType: "cron", reportDate, status: "failed", errorSummary: message });
    return Response.json({ error: "Report generation failed" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const startedAt = new Date().toISOString();
  const reportDate = easternDateKey();
  if (!hasValidCronSecret(request)) {
    logWarn("cron_rejected", { reason: "invalid_secret" });
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    logInfo("report_generation_start", { triggerType: "test", reportDate });
    const report = await generateAndSave();
    const staleSections = Object.entries(report.providerHealth).filter(([, state]) => state === "stale").map(([section]) => section);
    await recordReportRun({
      startedAt,
      completedAt: new Date().toISOString(),
      triggerType: "test",
      reportDate,
      status: staleSections.length ? "partial" : "completed",
      providerStatus: report.providerHealth,
      fallbackUsed: staleSections.length > 0,
      staleSections,
    });
    return Response.json({ report });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown manual cron generation error";
    await recordReportRun({ startedAt, completedAt: new Date().toISOString(), triggerType: "test", reportDate, status: "failed", errorSummary: message });
    return Response.json({ error: "Report generation failed" }, { status: 500 });
  }
}
