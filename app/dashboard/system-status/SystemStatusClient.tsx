"use client";

import { useEffect, useState } from "react";

type Status = Record<string, unknown>;

export default function SystemStatusClient() {
  const [status, setStatus] = useState<Status | null>(null);
  const [message, setMessage] = useState("");
  const [busyAction, setBusyAction] = useState("");

  async function loadStatus() {
    const response = await fetch("/api/system-status");
    setStatus(await response.json());
  }

  useEffect(() => {
    queueMicrotask(() => {
      void loadStatus();
    });
  }, []);

  async function runAction(action: string, confirmText: string) {
    if (!window.confirm(confirmText)) {
      return;
    }

    setBusyAction(action);
    setMessage("");
    try {
      const response = await fetch("/api/admin/diagnostics", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const payload = await response.json();
      setMessage(response.ok ? payload.message ?? "Action completed." : payload.error ?? "Action failed.");
      await loadStatus();
    } finally {
      setBusyAction("");
    }
  }

  return (
    <main className="trading-dashboard">
      <header className="trading-topbar">
        <div>
          <p className="trading-kicker">Admin diagnostics</p>
          <h1>System status</h1>
          <p className="trading-muted">Safe operational status only. Secrets are never displayed.</p>
        </div>
      </header>

      {message ? <div className="trading-error">{message}</div> : null}

      <section className="market-conclusion">
        <dl className="risk-grid">
          <div><dt>FMP configured</dt><dd>{String(readStatus(status, ["config", "fmpConfigured"]) ?? false)}</dd></div>
          <div><dt>Supabase configured</dt><dd>{String(readStatus(status, ["config", "supabaseConfigured"]) ?? false)}</dd></div>
          <div><dt>Data mode</dt><dd>{readStatus(status, ["config", "mockMode"]) ? "Mock" : "Production"}</dd></div>
          <div><dt>Data delay</dt><dd>{String(readStatus(status, ["config", "dataDelayStatus"]) ?? "unknown")}</dd></div>
          <div><dt>Domain</dt><dd>{String(readStatus(status, ["config", "appUrl"]) ?? "not configured")}</dd></div>
          <div><dt>Authentication</dt><dd>{String(readStatus(status, ["authMode"]) ?? "unknown")}</dd></div>
          <div><dt>Market</dt><dd>{String(readStatus(status, ["market", "reason"]) ?? "unknown")}</dd></div>
          <div><dt>Next refresh</dt><dd>{String(readStatus(status, ["nextScheduledRefresh"]) ?? "unknown")}</dd></div>
        </dl>
      </section>

      <div className="dashboard-grid">
        <section className="trading-panel">
          <div className="trading-section-head"><h2>Latest reports</h2></div>
          <pre className="status-pre">{JSON.stringify({ latestReport: status?.latestReport, latestFailedRun: status?.latestFailedRun, recentRuns: status?.recentRuns }, null, 2)}</pre>
        </section>

        <aside className="trading-panel">
          <div className="trading-section-head"><h2>Actions</h2></div>
          <div className="status-actions">
            <button className="trading-button" disabled={Boolean(busyAction)} onClick={() => runAction("test-fmp", "Test FMP connection?")}>Test FMP connection</button>
            <button className="trading-button" disabled={Boolean(busyAction)} onClick={() => runAction("test-supabase", "Test Supabase connection?")}>Test Supabase connection</button>
            <button className="trading-button" disabled={Boolean(busyAction)} onClick={() => runAction("generate-test-report", "Generate a test report and record a test run?")}>Generate test report</button>
            <button className="trading-button" disabled={Boolean(busyAction)} onClick={() => runAction("generate-production-report", "Generate and save a production report now?")}>Generate production report</button>
            <button className="trading-button" disabled={Boolean(busyAction)} onClick={() => runAction("clear-test-report", "Clear test report run records?")}>Clear test report</button>
          </div>
        </aside>
      </div>
    </main>
  );
}

function readStatus(status: Status | null, path: string[]) {
  let value: unknown = status;
  for (const segment of path) {
    if (!value || typeof value !== "object" || !(segment in value)) {
      return undefined;
    }
    value = (value as Record<string, unknown>)[segment];
  }
  return value;
}
