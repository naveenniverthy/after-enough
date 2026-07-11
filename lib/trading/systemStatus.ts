import { safeConfigSummary } from "./env";
import { reportFreshness } from "./freshness";
import { getLatestReport, latestFailedReportRun, latestReportRuns } from "./store";
import { getMarketDayStatus, nextScheduledRefresh } from "./marketCalendar";

export async function getSystemStatus() {
  const latestReport = await getLatestReport().catch(() => null);
  const latestFailedRun = await latestFailedReportRun().catch(() => null);
  const runs = await latestReportRuns(5).catch(() => []);
  const config = safeConfigSummary();
  const freshness = latestReport ? reportFreshness(latestReport) : null;
  const market = getMarketDayStatus(new Date(), config.holidayReportsEnabled);

  return {
    status: "ok",
    config,
    market,
    nextScheduledRefresh: nextScheduledRefresh(),
    latestReport: latestReport
      ? {
          reportDate: latestReport.reportDate,
          generatedAt: latestReport.generatedAt,
          overallStatus: latestReport.overallStatus,
          recommendedPosture: latestReport.recommendedPosture,
          providerHealth: latestReport.providerHealth,
          staleSections: freshness?.staleSections ?? [],
        }
      : null,
    latestFailedRun,
    recentRuns: runs,
    authMode: config.cloudflareJwtValidationConfigured ? "Cloudflare Access JWT" : "Cloudflare Access email header",
  };
}
