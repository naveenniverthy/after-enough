import type {
  EarningsEvent,
  EconomicEvent,
  MarketSnapshot,
  MorningReport,
  NewsItem,
  ReportListItem,
} from "./types";
import { logError, logInfo } from "./logger";

const supabaseUrl = () => process.env.SUPABASE_URL?.replace(/\/$/, "");
const serviceRoleKey = () => process.env.SUPABASE_SERVICE_ROLE_KEY;
type SupabaseRow = Record<string, unknown>;

function hasSupabase() {
  return Boolean(supabaseUrl() && serviceRoleKey());
}

async function supabaseFetch(path: string, init: RequestInit = {}) {
  const url = supabaseUrl();
  const key = serviceRoleKey();

  if (!url || !key) {
    throw new Error("Supabase is not configured.");
  }

  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      "content-type": "application/json",
      prefer: "return=representation",
      ...(init.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Supabase request failed: ${response.status} ${await response.text()}`);
  }

  return response;
}

const reportColumns =
  "id,report_date,generated_at,overall_status,overall_score,semiconductor_score,volatility_level,economic_risk,news_risk,recommended_posture,morning_summary,critical_alert,raw_data,created_at";

function toReport(row: SupabaseRow): MorningReport {
  const rawData = (row.raw_data ?? {}) as Partial<MorningReport> & Record<string, unknown>;

  return {
    id: row.id as string,
    reportDate: row.report_date as string,
    generatedAt: row.generated_at as string,
    overallStatus: row.overall_status as MorningReport["overallStatus"],
    overallScore: row.overall_score as number,
    semiconductorScore: row.semiconductor_score as number,
    semiconductorLabel: rawData.semiconductorLabel ?? "Mixed",
    volatilityLevel: row.volatility_level as MorningReport["volatilityLevel"],
    economicRisk: row.economic_risk as MorningReport["economicRisk"],
    newsRisk: row.news_risk as MorningReport["newsRisk"],
    recommendedPosture: row.recommended_posture as MorningReport["recommendedPosture"],
    morningSummary: row.morning_summary as string,
    criticalAlert: row.critical_alert as MorningReport["criticalAlert"],
    providerHealth: rawData.providerHealth ?? {
      marketData: "unavailable",
      news: "unavailable",
      economicCalendar: "unavailable",
      earnings: "unavailable",
    },
    marketSnapshots: rawData.marketSnapshots ?? [],
    semiconductors: rawData.semiconductors ?? [],
    newsItems: rawData.newsItems ?? [],
    economicEvents: rawData.economicEvents ?? [],
    earningsEvents: rawData.earningsEvents ?? [],
    strongestSemiconductor: rawData.strongestSemiconductor ?? "N/A",
    weakestSemiconductor: rawData.weakestSemiconductor ?? "N/A",
    positiveChipCount: rawData.positiveChipCount ?? 0,
    negativeChipCount: rawData.negativeChipCount ?? 0,
    rawData,
  };
}

function toListItem(row: SupabaseRow): ReportListItem {
  return {
    reportDate: row.report_date as string,
    generatedAt: row.generated_at as string,
    overallStatus: row.overall_status as ReportListItem["overallStatus"],
    overallScore: row.overall_score as number,
    semiconductorScore: row.semiconductor_score as number,
    recommendedPosture: row.recommended_posture as ReportListItem["recommendedPosture"],
  };
}

export async function saveReport(report: MorningReport) {
  if (!hasSupabase()) {
    return report;
  }

  const reportPayload = {
    report_date: report.reportDate,
    generated_at: report.generatedAt,
    overall_status: report.overallStatus,
    overall_score: report.overallScore,
    semiconductor_score: report.semiconductorScore,
    volatility_level: report.volatilityLevel,
    economic_risk: report.economicRisk,
    news_risk: report.newsRisk,
    recommended_posture: report.recommendedPosture,
    morning_summary: report.morningSummary,
    critical_alert: report.criticalAlert,
    raw_data: {
      ...report.rawData,
      semiconductorLabel: report.semiconductorLabel,
      providerHealth: report.providerHealth,
      marketSnapshots: report.marketSnapshots,
      semiconductors: report.semiconductors,
      newsItems: report.newsItems,
      economicEvents: report.economicEvents,
      earningsEvents: report.earningsEvents,
      strongestSemiconductor: report.strongestSemiconductor,
      weakestSemiconductor: report.weakestSemiconductor,
      positiveChipCount: report.positiveChipCount,
      negativeChipCount: report.negativeChipCount,
    },
  };

  const response = await supabaseFetch("daily_reports?on_conflict=report_date", {
    method: "POST",
    headers: {
      prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(reportPayload),
  });
  const [saved] = await response.json();
  const reportId = saved.id;

  await Promise.all([
    replaceRows<MarketSnapshot>(`market_snapshots?report_id=eq.${reportId}`, "market_snapshots", reportId, report.marketSnapshots, (item) => ({
      symbol: item.symbol,
      name: item.name,
      value: String(item.value),
      change_percent: item.changePercent,
      interpretation: item.interpretation,
      timestamp: item.timestamp,
    })),
    replaceRows<NewsItem>(`news_items?report_id=eq.${reportId}`, "news_items", reportId, report.newsItems, (item) => ({
      headline: item.headline,
      source: item.source,
      published_at: item.publishedAt,
      summary: item.summary,
      why_it_matters: item.whyItMatters,
      sentiment: item.sentiment,
      affected_tickers: item.affectedTickers,
      article_url: item.articleUrl,
    })),
    replaceRows<EconomicEvent>(`economic_events?report_id=eq.${reportId}`, "economic_events", reportId, report.economicEvents, (item) => ({
      event_time: item.eventTime,
      event_name: item.eventName,
      importance: item.importance,
      forecast: item.forecast,
      previous: item.previous,
      actual: item.actual ?? null,
      market_impact: item.marketImpact,
    })),
    replaceRows<EarningsEvent>(`earnings_events?report_id=eq.${reportId}`, "earnings_events", reportId, report.earningsEvents, (item) => ({
      ticker: item.ticker,
      company: item.company,
      reporting_time: item.reportingTime,
      eps_estimate: item.epsEstimate,
      revenue_estimate: item.revenueEstimate,
      importance: item.importance,
    })),
  ]);

  logInfo("supabase_save_success", { reportDate: report.reportDate, reportId });
  return { ...report, id: reportId };
}

async function replaceRows<T>(
  deletePath: string,
  table: string,
  reportId: string,
  rows: T[],
  mapRow: (row: T) => Record<string, unknown>,
) {
  await supabaseFetch(deletePath, { method: "DELETE" });

  if (!rows.length) {
    return;
  }

  await supabaseFetch(table, {
    method: "POST",
    body: JSON.stringify(rows.map((row) => ({ report_id: reportId, ...mapRow(row) }))),
  });
}

export async function getLatestReport() {
  if (!hasSupabase()) {
    return null;
  }

  const response = await supabaseFetch(
    `daily_reports?select=${reportColumns}&order=generated_at.desc&limit=1`,
  );
  const rows = await response.json();
  return rows[0] ? toReport(rows[0]) : null;
}

export async function getReportByDate(date: string) {
  if (!hasSupabase()) {
    return null;
  }

  const response = await supabaseFetch(
    `daily_reports?select=${reportColumns}&report_date=eq.${encodeURIComponent(date)}&limit=1`,
  );
  const rows = await response.json();
  return rows[0] ? toReport(rows[0]) : null;
}

export async function hasReportForDate(date: string) {
  if (!hasSupabase()) {
    return false;
  }

  return Boolean(await getReportByDate(date));
}

export async function listReports() {
  if (!hasSupabase()) {
    return [] as ReportListItem[];
  }

  const response = await supabaseFetch(
    "daily_reports?select=report_date,generated_at,overall_status,overall_score,semiconductor_score,recommended_posture&order=report_date.desc&limit=60",
  );
  const rows = await response.json();
  return rows.map(toListItem);
}

export type ReportRunInput = {
  startedAt: string;
  completedAt?: string | null;
  triggerType: "cron" | "manual" | "test";
  reportDate?: string | null;
  status: "started" | "completed" | "partial" | "failed" | "skipped";
  providerStatus?: Record<string, unknown>;
  fallbackUsed?: boolean;
  staleSections?: string[];
  errorSummary?: string | null;
};

export async function recordReportRun(run: ReportRunInput) {
  if (!hasSupabase()) {
    logInfo("report_run_not_persisted", { status: run.status, triggerType: run.triggerType, reportDate: run.reportDate });
    return null;
  }

  try {
    const response = await supabaseFetch("report_runs", {
      method: "POST",
      body: JSON.stringify({
        started_at: run.startedAt,
        completed_at: run.completedAt ?? null,
        trigger_type: run.triggerType,
        report_date: run.reportDate ?? null,
        status: run.status,
        provider_status: run.providerStatus ?? {},
        fallback_used: run.fallbackUsed ?? false,
        stale_sections: run.staleSections ?? [],
        error_summary: run.errorSummary ?? null,
      }),
    });
    const [saved] = await response.json();
    return saved;
  } catch (error) {
    logError("report_run_save_failed", { error: error instanceof Error ? error.message : "unknown", status: run.status });
    return null;
  }
}

export async function latestReportRuns(limit = 5) {
  if (!hasSupabase()) {
    return [];
  }

  const response = await supabaseFetch(
    `report_runs?select=started_at,completed_at,trigger_type,report_date,status,provider_status,fallback_used,stale_sections,error_summary&order=started_at.desc&limit=${limit}`,
  );
  return response.json();
}

export async function latestFailedReportRun() {
  if (!hasSupabase()) {
    return null;
  }

  const response = await supabaseFetch(
    "report_runs?select=started_at,completed_at,trigger_type,report_date,status,error_summary&status=in.(failed,partial)&order=started_at.desc&limit=1",
  );
  const rows = await response.json();
  return rows[0] ?? null;
}
