import { z } from "zod";
import { canUseDevBypass, hasValidAdminSecret } from "@/lib/trading/auth";
import { FmpProvider } from "@/lib/trading/providers";
import { generateMorningReport } from "@/lib/trading/report";
import { recordReportRun, saveReport } from "@/lib/trading/store";
import { getSystemStatus } from "@/lib/trading/systemStatus";
import { easternDateKey } from "@/lib/trading/time";

export const dynamic = "force-dynamic";

const BodySchema = z.object({
  action: z.enum(["test-fmp", "test-supabase", "generate-test-report", "generate-production-report", "clear-test-report"]),
});

export async function POST(request: Request) {
  if (!hasValidAdminSecret(request) && !canUseDevBypass()) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { action } = BodySchema.parse(await request.json());

  if (action === "test-fmp") {
    const provider = new FmpProvider();
    await provider.getOvernightSnapshot();
    return Response.json({ message: "FMP connection succeeded." });
  }

  if (action === "test-supabase") {
    const status = await getSystemStatus();
    return Response.json({ message: status.config.supabaseConfigured ? "Supabase is configured and reachable for status reads." : "Supabase is not configured." });
  }

  if (action === "generate-test-report") {
    const startedAt = new Date().toISOString();
    const report = await generateMorningReport();
    await recordReportRun({
      startedAt,
      completedAt: new Date().toISOString(),
      triggerType: "test",
      reportDate: report.reportDate,
      status: "completed",
      providerStatus: report.providerHealth,
      fallbackUsed: Object.values(report.providerHealth).includes("stale"),
      staleSections: Object.entries(report.providerHealth).filter(([, state]) => state === "stale").map(([section]) => section),
    });
    return Response.json({ message: "Test report generated and run recorded." });
  }

  if (action === "generate-production-report") {
    const report = await saveReport(await generateMorningReport());
    return Response.json({ message: `Production report saved for ${report.reportDate}.` });
  }

  if (action === "clear-test-report") {
    await recordReportRun({
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
      triggerType: "test",
      reportDate: easternDateKey(),
      status: "skipped",
      errorSummary: "Clear test report requested. No report data deleted by this safe action.",
    });
    return Response.json({ message: "Safe clear action recorded. No report data was deleted." });
  }

  return Response.json({ error: "Unknown action" }, { status: 400 });
}
