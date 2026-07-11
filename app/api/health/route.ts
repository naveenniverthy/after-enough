import { validateProductionEnv, safeConfigSummary } from "@/lib/trading/env";
import { getSystemStatus } from "@/lib/trading/systemStatus";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    validateProductionEnv();
    const status = await getSystemStatus();
    return Response.json({
      applicationStatus: "ok",
      environment: status.config.environment,
      mockMode: status.config.mockMode,
      publicDashboardAccess: status.config.publicDashboardAccess,
      dataDelayStatus: status.config.dataDelayStatus,
      supabaseConfigured: status.config.supabaseConfigured,
      fmpConfigured: status.config.fmpConfigured,
      latestReportTimestamp: status.latestReport?.generatedAt ?? null,
      latestReportStatus: status.latestReport?.overallStatus ?? null,
      market: status.market,
      nextScheduledRefresh: status.nextScheduledRefresh,
    });
  } catch (error) {
    const config = safeConfigSummary();
    return Response.json(
      {
        applicationStatus: "configuration_error",
        environment: config.environment,
        mockMode: config.mockMode,
        publicDashboardAccess: config.publicDashboardAccess,
        dataDelayStatus: config.dataDelayStatus,
        supabaseConfigured: config.supabaseConfigured,
        fmpConfigured: config.fmpConfigured,
        error: error instanceof Error ? error.message : "Unknown health error",
      },
      { status: config.environment === "production" ? 500 : 200 },
    );
  }
}
