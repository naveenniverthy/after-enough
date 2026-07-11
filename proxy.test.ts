import { describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { isPublicReadRoute, proxy, shouldBlockRawDeploymentUrl } from "./proxy";

describe("proxy production protection", () => {
  it("blocks raw Vercel URL access when production app URL is configured", async () => {
    expect(
      shouldBlockRawDeploymentUrl("https://after-enough.vercel.app", "/dashboard", {
        VERCEL_ENV: "production",
        NEXT_PUBLIC_APP_URL: "https://dashboard.after-enough.com",
        ALLOW_VERCEL_BYPASS: "false",
      }),
    ).toBe(true);
  });

  it("redirects the domain root to dashboard", async () => {
    vi.stubEnv("VERCEL_ENV", "");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "");
    const response = await proxy(new NextRequest("https://dashboard.after-enough.com/"));

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toContain("/dashboard");
  });

  it("allows public dashboard and read API routes only when enabled", () => {
    expect(isPublicReadRoute("/dashboard", "GET", true)).toBe(true);
    expect(isPublicReadRoute("/api/latest-report", "GET", true)).toBe(true);
    expect(isPublicReadRoute("/api/reports", "GET", true)).toBe(true);
    expect(isPublicReadRoute("/api/reports/2026-07-11", "GET", true)).toBe(true);
    expect(isPublicReadRoute("/dashboard", "GET", false)).toBe(false);
  });

  it("PUBLIC_DASHBOARD_ACCESS=true lets /dashboard through without email or Cloudflare headers", async () => {
    vi.stubEnv("PUBLIC_DASHBOARD_ACCESS", "true");
    vi.stubEnv("AUTHORIZED_EMAIL", "");
    vi.stubEnv("NEXT_PUBLIC_APP_URL", "");
    vi.stubEnv("VERCEL_ENV", "");

    const response = await proxy(new NextRequest("https://dashboard.after-enough.com/dashboard"));

    expect(response.status).toBe(200);
    expect(response.headers.get("location")).toBeNull();
  });

  it("does not make system status or refresh public", () => {
    expect(isPublicReadRoute("/dashboard/system-status", "GET", true)).toBe(false);
    expect(isPublicReadRoute("/api/refresh", "POST", true)).toBe(false);
  });

  it("does not block health or cron through raw URL helper", () => {
    const env = {
      VERCEL_ENV: "production",
      NEXT_PUBLIC_APP_URL: "https://dashboard.after-enough.com",
      ALLOW_VERCEL_BYPASS: "false",
    };
    expect(shouldBlockRawDeploymentUrl("https://after-enough.vercel.app", "/api/health", env)).toBe(false);
    expect(shouldBlockRawDeploymentUrl("https://after-enough.vercel.app", "/api/generate-morning-report", env)).toBe(false);
    expect(shouldBlockRawDeploymentUrl("https://after-enough.vercel.app", "/dashboard", env)).toBe(true);
  });
});
