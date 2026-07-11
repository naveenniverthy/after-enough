import { describe, expect, it } from "vitest";
import { validateProductionEnv } from "./env";

describe("environment validation", () => {
  it("fails clearly when production variables are missing", () => {
    process.env.NODE_ENV = "production";
    process.env.MOCK_DATA_MODE = "true";
    process.env.DASHBOARD_DEV_BYPASS = "false";

    expect(() => validateProductionEnv()).toThrow(/Production environment is not ready/);
  });
});
