import { describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { proxy, shouldBlockRawDeploymentUrl } from "./proxy";

describe("proxy production protection", () => {
  it("blocks raw Vercel URL access when production app URL is configured", async () => {
    expect(
      shouldBlockRawDeploymentUrl("https://after-enough.vercel.app", {
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
});
