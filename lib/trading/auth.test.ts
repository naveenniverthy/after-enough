import { describe, expect, it } from "vitest";
import { canUseDevBypass, hasValidAdminSecret, hasValidCronSecret, isAuthorizedRequest } from "./auth";

describe("dashboard authorization", () => {
  it("authorizes the configured email header", () => {
    process.env.AUTHORIZED_EMAIL = "me@example.com";
    const request = new Request("https://dashboard.after-enough.com/dashboard", {
      headers: { "cf-access-authenticated-user-email": "me@example.com" },
    });

    expect(isAuthorizedRequest(request)).toBe(true);
  });

  it("rejects missing or mismatched emails", () => {
    process.env.AUTHORIZED_EMAIL = "me@example.com";
    const request = new Request("https://dashboard.after-enough.com/dashboard", {
      headers: { "cf-access-authenticated-user-email": "other@example.com" },
    });

    expect(isAuthorizedRequest(request)).toBe(false);
  });

  it("rejects missing identity headers", () => {
    process.env.AUTHORIZED_EMAIL = "me@example.com";
    const request = new Request("https://dashboard.after-enough.com/dashboard");

    expect(isAuthorizedRequest(request)).toBe(false);
  });

  it("allows development bypass only outside production", () => {
    process.env.NODE_ENV = "development";
    process.env.DASHBOARD_DEV_BYPASS = "true";
    expect(canUseDevBypass()).toBe(true);

    process.env.NODE_ENV = "production";
    expect(canUseDevBypass()).toBe(false);
  });

  it("validates cron secrets", () => {
    process.env.CRON_SECRET = "abcdefghijklmnopqrstuvwxyz";
    const valid = new Request("https://dashboard.after-enough.com/api/generate-morning-report", {
      headers: { authorization: "Bearer abcdefghijklmnopqrstuvwxyz" },
    });
    const invalid = new Request("https://dashboard.after-enough.com/api/generate-morning-report", {
      headers: { authorization: "Bearer nope" },
    });

    expect(hasValidCronSecret(valid)).toBe(true);
    expect(hasValidCronSecret(invalid)).toBe(false);
  });

  it("validates admin secrets", () => {
    process.env.ADMIN_DASHBOARD_SECRET = "adminsecretabcdefghijklmnopqrstuvwxyz";
    const valid = new Request("https://dashboard.after-enough.com/api/refresh", {
      method: "POST",
      headers: { authorization: "Bearer adminsecretabcdefghijklmnopqrstuvwxyz" },
    });
    const invalid = new Request("https://dashboard.after-enough.com/api/refresh", {
      method: "POST",
      headers: { authorization: "Bearer nope" },
    });

    expect(hasValidAdminSecret(valid)).toBe(true);
    expect(hasValidAdminSecret(invalid)).toBe(false);
  });
});
