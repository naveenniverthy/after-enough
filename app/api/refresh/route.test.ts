import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("/api/refresh protection", () => {
  it("rejects missing admin secret", async () => {
    process.env.NODE_ENV = "production";
    process.env.DASHBOARD_DEV_BYPASS = "false";
    process.env.ADMIN_DASHBOARD_SECRET = "adminsecretabcdefghijklmnopqrstuvwxyz";

    const response = await POST(new Request("https://dashboard.after-enough.com/api/refresh", { method: "POST" }));

    expect(response.status).toBe(401);
  });
});
