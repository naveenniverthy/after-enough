"use client";

import { useEffect, useMemo, useState } from "react";
import type { MorningReport, ReportListItem } from "@/lib/trading/types";
import { countdownText } from "@/lib/trading/time.testable";
import { reportFreshness } from "@/lib/trading/freshness";

type CalculatorState = {
  ticker: string;
  currentPrice: number;
  currentShares: number;
  averagePrice: number;
  currentCapital: number;
  plannedEntry: number;
  rapidFall: boolean;
};

type DashboardSystemStatus = {
  config?: {
    mockMode?: boolean;
    dataDelayStatus?: string;
  };
  market?: {
    isMarketDay?: boolean;
    reason?: string;
  };
  nextScheduledRefresh?: string;
};

const formatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 2,
});

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

function formatEastern(value?: string) {
  if (!value) return "Not scheduled";
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Detroit",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  }).format(new Date(value));
}

function countdownTo(value?: string) {
  return countdownText(value);
}

function directionClass(change: number | null) {
  if (change === null) return "is-muted";
  if (change > 0) return "is-positive";
  if (change < 0) return "is-negative";
  return "is-muted";
}

function formatCurrency(value: number | null) {
  return value === null ? "N/A" : currency.format(value);
}

function formatNumber(value: number | null) {
  return value === null ? "N/A" : formatter.format(value);
}

function formatPercent(value: number | null) {
  if (value === null) {
    return "";
  }

  return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}

function scoreClass(score: number) {
  if (score >= 68) return "score-good";
  if (score >= 48) return "score-neutral";
  return "score-risk";
}

function HealthPill({ label, state }: { label: string; state: string }) {
  return <span className={`health-pill health-${state}`}>{label}: {state}</span>;
}

function ScoreRing({ label, score }: { label: string; score: number }) {
  return (
    <div className={`score-ring ${scoreClass(score)}`} style={{ "--score": score } as React.CSSProperties}>
      <div>
        <strong>{score}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
}

function Section({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <section className="trading-panel">
      <div className="trading-section-head">
        <h2>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export default function DashboardClient({
  initialReport,
  initialArchive,
}: {
  initialReport: MorningReport;
  initialArchive: ReportListItem[];
}) {
  const [report, setReport] = useState(initialReport);
  const [archive, setArchive] = useState(initialArchive);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshError, setRefreshError] = useState("");
  const [systemStatus, setSystemStatus] = useState<DashboardSystemStatus | null>(null);
  const [checklistsByDate, setChecklistsByDate] = useState<Record<string, Record<string, boolean>>>(() => {
    if (typeof window === "undefined") {
      return {};
    }

    const saved = window.localStorage.getItem("trading-checklists");
    return saved ? JSON.parse(saved) : {};
  });
  const [calculator, setCalculator] = useState<CalculatorState>({
    ticker: "SOXL",
    currentPrice: 0,
    currentShares: 0,
    averagePrice: 0,
    currentCapital: 0,
    plannedEntry: 5000,
    rapidFall: false,
  });

  const checklistItems = [
    "Checked futures",
    "Checked VIX",
    "Checked economic calendar",
    "Checked earnings",
    "Checked semiconductor strength",
    "No major event within the next 30 minutes",
    "Position size planned",
    "Maximum exposure confirmed",
    "Exit plan defined",
  ];

  const checklist = checklistsByDate[report.reportDate] ?? {};
  const freshness = reportFreshness(report);

  useEffect(() => {
    window.localStorage.setItem("trading-checklists", JSON.stringify(checklistsByDate));
  }, [checklistsByDate]);

  useEffect(() => {
    fetch("/api/system-status")
      .then((response) => (response.ok ? response.json() : null))
      .then((payload) => setSystemStatus(payload))
      .catch(() => setSystemStatus(null));
  }, []);

  const calc = useMemo(() => {
    const costBasis = calculator.currentShares * calculator.averagePrice;
    const marketValue = calculator.currentShares * calculator.currentPrice;
    const exposure = calculator.currentCapital || costBasis;
    const pnl = marketValue - costBasis;
    const pnlPercent = costBasis > 0 ? (pnl / costBasis) * 100 : 0;
    const entriesUsed = Math.ceil(exposure / 5000);
    const remainingExposure = Math.max(0, 20000 - exposure);
    const nextAdversePrice = calculator.averagePrice > 0 ? calculator.averagePrice * 0.9 : 0;
    const additionAllowed =
      calculator.plannedEntry <= remainingExposure &&
      entriesUsed < 4 &&
      calculator.currentPrice <= nextAdversePrice &&
      !calculator.rapidFall;

    return {
      pnl,
      pnlPercent,
      exposure,
      entriesUsed,
      remainingExposure,
      nextAdversePrice,
      additionAllowed,
      entriesRemaining: Math.max(0, 4 - entriesUsed),
      warnings: [
        exposure > 20000 ? "Exposure exceeds $20,000." : "",
        entriesUsed > 4 ? "More than four entries are already used." : "",
        calculator.currentPrice > nextAdversePrice && calculator.averagePrice > 0
          ? "Planned addition does not satisfy the approximate 10% adverse-move rule."
          : "",
        calculator.rapidFall ? "Do not add while the instrument is rapidly falling." : "",
      ].filter(Boolean),
    };
  }, [calculator]);

  async function refreshReport() {
    setIsRefreshing(true);
    setRefreshError("");

    try {
      const response = await fetch("/api/refresh", { method: "POST" });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ?? "Refresh failed");
      }
      setReport(payload.report);
      const archiveResponse = await fetch("/api/reports");
      if (archiveResponse.ok) {
        const archivePayload = await archiveResponse.json();
        setArchive(archivePayload.reports);
      }
    } catch (error) {
      setRefreshError(error instanceof Error ? error.message : "Refresh failed");
    } finally {
      setIsRefreshing(false);
    }
  }

  async function loadArchive(date: string) {
    const response = await fetch(`/api/reports/${date}`);
    if (response.ok) {
      const payload = await response.json();
      setReport(payload.report);
    }
  }

  return (
    <main className="trading-dashboard">
      <header className="trading-topbar">
        <div>
          <p className="trading-kicker">After Enough Trading Dashboard</p>
          <h1>Morning trading briefing</h1>
          <p className="trading-muted">
            Report date {report.reportDate} · Last updated {formatEastern(report.generatedAt)}. Informational only, not financial advice.
          </p>
          <div className="health-row">
            <HealthPill label="Mode" state={systemStatus?.config?.mockMode ? "mock" : "production"} />
            <HealthPill label="Delay" state={systemStatus?.config?.dataDelayStatus ?? "unknown"} />
            <HealthPill label="Market" state={systemStatus?.market?.isMarketDay ? "open" : "closed"} />
            <HealthPill label="Next refresh" state={systemStatus?.nextScheduledRefresh ? formatEastern(systemStatus.nextScheduledRefresh) : "unknown"} />
          </div>
        </div>
        <button className="trading-button" onClick={refreshReport} disabled={isRefreshing}>
          {isRefreshing ? "Refreshing..." : "Refresh Now"}
        </button>
      </header>

      {refreshError ? <div className="trading-error">{refreshError}</div> : null}
      {systemStatus?.market && !systemStatus.market.isMarketDay ? (
        <div className="trading-error">US Market Closed: {systemStatus.market.reason}. Trading posture should be treated as informational only.</div>
      ) : null}
      {freshness.isCriticalStale ? (
        <div className="trading-error">Stale data warning: {freshness.staleSections.join(", ")} need attention before trading.</div>
      ) : null}

      <section className="critical-alert">
        <div>
          <p className="trading-kicker">Critical alert</p>
          <h2>{report.criticalAlert.title}</h2>
          <p>{report.criticalAlert.detail}</p>
        </div>
        <div className="countdown-box">
          <span>Countdown</span>
          <strong>{countdownTo(report.criticalAlert.eventTime)}</strong>
          <small>{formatEastern(report.criticalAlert.eventTime)}</small>
        </div>
      </section>

      <section className="market-conclusion">
        <div className="status-block">
          <span className={`status-badge ${report.overallStatus.toLowerCase().replaceAll(" ", "-")}`}>
            {report.overallStatus}
          </span>
          <h2>{report.recommendedPosture}</h2>
          <p>{report.morningSummary}</p>
          <div className="health-row">
            <HealthPill label="Market data" state={report.providerHealth.marketData} />
            <HealthPill label="News" state={report.providerHealth.news} />
            <HealthPill label="Calendar" state={report.providerHealth.economicCalendar} />
            <HealthPill label="Earnings" state={report.providerHealth.earnings} />
          </div>
        </div>
        <div className="score-row">
          <ScoreRing label="Market" score={report.overallScore} />
          <ScoreRing label="Semis" score={report.semiconductorScore} />
        </div>
        <dl className="risk-grid">
          <div>
            <dt>Volatility</dt>
            <dd>{report.volatilityLevel}</dd>
          </div>
          <div>
            <dt>Economic risk</dt>
            <dd>{report.economicRisk}</dd>
          </div>
          <div>
            <dt>News risk</dt>
            <dd>{report.newsRisk}</dd>
          </div>
        </dl>
      </section>

      <div className="dashboard-grid">
        <div className="main-column">
          <Section title="SOXL and semiconductor dashboard">
            <div className="semi-summary">
              <strong>{report.semiconductorLabel}</strong>
              <span>Strongest: {report.strongestSemiconductor}</span>
              <span>Weakest: {report.weakestSemiconductor}</span>
              <span>{report.positiveChipCount} positive / {report.negativeChipCount} negative</span>
            </div>
            <div className="table-scroll">
              <table className="trading-table">
                <thead>
                  <tr>
                    <th>Ticker</th>
                    <th>Prev close</th>
                    <th>Premarket</th>
                    <th>Current</th>
                    <th>Volume</th>
                    <th>Status</th>
                    <th>Related news</th>
                  </tr>
                </thead>
                <tbody>
                  {report.semiconductors.map((quote) => (
                    <tr key={quote.ticker}>
                      <td><strong>{quote.ticker}</strong><small>{quote.company}</small></td>
                      <td>{formatCurrency(quote.previousClose)}</td>
                      <td className={directionClass(quote.premarketPercent)}>
                        {formatCurrency(quote.premarketPrice)} {formatPercent(quote.premarketPercent)}
                      </td>
                      <td>{formatCurrency(quote.currentPrice)} <small className={directionClass(quote.changePercent)}>{formatPercent(quote.changePercent)}</small></td>
                      <td>{formatNumber(quote.volume)}</td>
                      <td><span className={`data-status ${quote.dataStatus.toLowerCase().replaceAll(" ", "-")}`}>{quote.dataStatus}</span><small>{quote.timestamp ? formatEastern(quote.timestamp) : ""}</small></td>
                      <td>{quote.relatedNews}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="Overnight market snapshot">
            <div className="snapshot-grid">
              {report.marketSnapshots.map((item) => (
                <article className="snapshot-card" key={item.symbol}>
                  <div>
                    <strong>{item.symbol}</strong>
                    <span>{item.name}</span>
                  </div>
                  <p>{typeof item.value === "number" ? formatter.format(item.value) : item.value ?? "N/A"}</p>
                  <em className={directionClass(item.changePercent)}>
                    {item.changePercent === null ? "→" : item.changePercent > 0 ? "↑" : item.changePercent < 0 ? "↓" : "→"} {formatPercent(item.changePercent)}
                  </em>
                  <small>{item.interpretation}</small>
                  <small>{formatEastern(item.timestamp)} · {item.dataStatus}</small>
                </article>
              ))}
            </div>
          </Section>

          <Section title="Important market news">
            <div className="news-list">
              {report.newsItems.map((item) => (
                <article className="news-item" key={item.headline}>
                  <div>
                    <span className={`sentiment ${item.sentiment}`}>{item.sentiment}</span>
                    <time>{formatEastern(item.publishedAt)}</time>
                  </div>
                  <h3><a href={item.articleUrl} target="_blank" rel="noreferrer">{item.headline}</a></h3>
                  <p>{item.summary}</p>
                  <p><strong>Why it matters:</strong> {item.whyItMatters}</p>
                  <small>{item.source} · {item.affectedTickers.join(", ")}</small>
                </article>
              ))}
            </div>
          </Section>

          <div className="two-up">
            <Section title="Economic calendar">
              <div className="event-list">
                {report.economicEvents.map((event) => (
                  <article className={`event-card importance-${event.importance.toLowerCase()}`} key={`${event.eventName}-${event.eventTime}`}>
                    <strong>{event.eventName}</strong>
                    <span>{formatEastern(event.eventTime)} · {countdownTo(event.eventTime)}</span>
                    <p>{event.marketImpact}</p>
                    <small>Forecast {event.forecast} · Previous {event.previous}{event.actual ? ` · Actual ${event.actual}` : ""}</small>
                  </article>
                ))}
              </div>
            </Section>

            <Section title="Earnings calendar">
              <div className="event-list">
                {report.earningsEvents.map((event) => (
                  <article className="event-card" key={`${event.ticker}-${event.reportingTime}`}>
                    <strong>{event.ticker} · {event.company}</strong>
                    <span>{event.reportingTime} · {event.importance}</span>
                    <p>{event.expectedImpact}</p>
                    <small>EPS {event.epsEstimate} · Revenue {event.revenueEstimate}</small>
                  </article>
                ))}
              </div>
            </Section>
          </div>
        </div>

        <aside className="side-column">
          <Section title="Personal trading rules">
            <ul className="rules-list">
              {[
                "Initial SOXL or SOXS entry: $5,000",
                "Add another $5,000 only after approximately a 10% adverse move",
                "Maximum four entries",
                "Maximum exposure: $20,000 per ticker",
                "Do not average while price is falling rapidly",
                "Wait for stabilization before entering",
                "Do not trade simply because the market is open",
                "Stay out when there is no clear setup",
                "Target profit may be approximately 3% to 5% depending on momentum",
                "Capital protection comes before profit",
              ].map((rule) => <li key={rule}>{rule}</li>)}
            </ul>
            <div className="checklist">
              {checklistItems.map((item) => (
                <label key={item}>
                  <input
                    type="checkbox"
                    checked={Boolean(checklist[item])}
                    onChange={(event) =>
                      setChecklistsByDate((current) => ({
                        ...current,
                        [report.reportDate]: {
                          ...(current[report.reportDate] ?? {}),
                          [item]: event.target.checked,
                        },
                      }))
                    }
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </Section>

          <Section title="Position risk calculator">
            <div className="calculator-grid">
              {[
                ["ticker", "Ticker"],
                ["currentPrice", "Current price"],
                ["currentShares", "Current shares"],
                ["averagePrice", "Average price"],
                ["currentCapital", "Current capital invested"],
                ["plannedEntry", "Planned next entry amount"],
              ].map(([key, label]) => (
                <label key={key}>
                  <span>{label}</span>
                  <input
                    value={calculator[key as keyof CalculatorState] as string | number}
                    type={key === "ticker" ? "text" : "number"}
                    min="0"
                    onChange={(event) =>
                      setCalculator((current) => ({
                        ...current,
                        [key]: key === "ticker" ? event.target.value.toUpperCase() : Number(event.target.value),
                      }))
                    }
                  />
                </label>
              ))}
              <label className="toggle-row">
                <input
                  type="checkbox"
                  checked={calculator.rapidFall}
                  onChange={(event) => setCalculator((current) => ({ ...current, rapidFall: event.target.checked }))}
                />
                Instrument is falling rapidly
              </label>
            </div>
            <dl className="calc-results">
              <div><dt>Unrealized P/L</dt><dd className={directionClass(calc.pnl)}>{currency.format(calc.pnl)} ({calc.pnlPercent.toFixed(2)}%)</dd></div>
              <div><dt>Current exposure</dt><dd>{currency.format(calc.exposure)}</dd></div>
              <div><dt>Remaining allowed</dt><dd>{currency.format(calc.remainingExposure)}</dd></div>
              <div><dt>Next 10% adverse entry</dt><dd>{calc.nextAdversePrice ? currency.format(calc.nextAdversePrice) : "N/A"}</dd></div>
              <div><dt>Entries used</dt><dd>{calc.entriesUsed} used / {calc.entriesRemaining} remaining</dd></div>
              <div><dt>Another entry?</dt><dd>{calc.additionAllowed ? "Allowed by rules" : "Not allowed yet"}</dd></div>
            </dl>
            {calc.warnings.length ? (
              <div className="calculator-warning">
                {calc.warnings.map((warning) => <p key={warning}>{warning}</p>)}
              </div>
            ) : null}
          </Section>

          <Section title="Daily archive">
            <div className="archive-list">
              {archive.length ? archive.map((item) => (
                <button key={item.reportDate} onClick={() => loadArchive(item.reportDate)}>
                  <strong>{item.reportDate}</strong>
                  <span>{item.overallStatus} · Market {item.overallScore} · Semis {item.semiconductorScore}</span>
                </button>
              )) : <p className="trading-muted">Reports will appear here after Supabase is configured and the first report is saved.</p>}
            </div>
          </Section>
        </aside>
      </div>
    </main>
  );
}
