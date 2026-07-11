import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("/api/health", () => {
  it("returns safe health information without secrets", async () => {
    process.env.NODE_ENV = "development";
    process.env.MOCK_DATA_MODE = "true";
    process.env.DASHBOARD_DEV_BYPASS = "false";
    const response = await GET();
    const payload = await response.json();

    expect(payload.applicationStatus).toBeDefined();
    expect(JSON.stringify(payload)).not.toContain("SUPABASE_SERVICE_ROLE_KEY");
    expect(JSON.stringify(payload)).not.toContain("FMP_API_KEY");
  });
});
