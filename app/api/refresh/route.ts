import { canUseDevBypass, hasValidAdminSecret } from "@/lib/trading/auth";
import { logError, logInfo, logWarn } from "@/lib/trading/logger";
import { generateMorningReport } from "@/lib/trading/report";
import { recordReportRun, saveReport } from "@/lib/trading/store";
import { easternDateKey } from "@/lib/trading/time";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!hasValidAdminSecret(request) && !canUseDevBypass()) {
    logWarn("auth_rejected", { reason: "refresh_unauthorized" });
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const startedAt = new Date().toISOString();
  const reportDate = easternDateKey();
  try {
    logInfo("report_generation_start", { triggerType: "manual", reportDate });
    const report = await saveReport(await generateMorningReport());
    const staleSections = Object.entries(report.providerHealth).filter(([, state]) => state === "stale").map(([section]) => section);
    await recordReportRun({
      startedAt,
      completedAt: new Date().toISOString(),
      triggerType: "manual",
      reportDate,
      status: staleSections.length ? "partial" : "completed",
      providerStatus: report.providerHealth,
      fallbackUsed: staleSections.length > 0,
      staleSections,
    });
    return Response.json({ report });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown refresh error";
    logError("report_generation_failed", { triggerType: "manual", reportDate, error: message });
    await recordReportRun({ startedAt, completedAt: new Date().toISOString(), triggerType: "manual", reportDate, status: "failed", errorSummary: message });
    return Response.json({ error: "Refresh failed. Previous report remains available." }, { status: 500 });
  }
}
