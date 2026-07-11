import { NextRequest } from "next/server";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { getEnv } from "./env";
import { logWarn } from "./logger";

const EMAIL_HEADERS = [
  "cf-access-authenticated-user-email",
  "x-authenticated-user-email",
  "x-vercel-auth-user-email",
];

export function getAuthorizedEmail() {
  return getEnv().AUTHORIZED_EMAIL?.trim().toLowerCase() ?? "";
}

export function getRequestEmail(request: Request) {
  for (const header of EMAIL_HEADERS) {
    const value = request.headers.get(header);
    if (value) {
      return value.trim().toLowerCase();
    }
  }

  return "";
}

export function isAuthorizedRequest(request: Request | NextRequest) {
  const authorizedEmail = getAuthorizedEmail();
  if (!authorizedEmail) {
    return false;
  }

  return getRequestEmail(request) === authorizedEmail;
}

export function canUseDevBypass() {
  const env = getEnv();
  return env.NODE_ENV !== "production" && env.DASHBOARD_DEV_BYPASS;
}

export async function verifyCloudflareAccessRequest(request: Request | NextRequest) {
  const env = getEnv();
  const authorizedEmail = getAuthorizedEmail();
  const headerEmail = getRequestEmail(request);

  if (!authorizedEmail) {
    logWarn("auth_rejected", { reason: "missing_authorized_email" });
    return false;
  }

  if (env.CLOUDFLARE_ACCESS_TEAM_DOMAIN && env.CLOUDFLARE_ACCESS_AUD) {
    const token = request.headers.get("cf-access-jwt-assertion");
    if (!token) {
      logWarn("auth_rejected", { reason: "missing_cf_access_jwt", email: headerEmail });
      return false;
    }

    try {
      const jwks = createRemoteJWKSet(new URL(`${env.CLOUDFLARE_ACCESS_TEAM_DOMAIN.replace(/\/$/, "")}/cdn-cgi/access/certs`));
      const { payload } = await jwtVerify(token, jwks, {
        issuer: env.CLOUDFLARE_ACCESS_TEAM_DOMAIN.replace(/\/$/, ""),
        audience: env.CLOUDFLARE_ACCESS_AUD,
      });
      const jwtEmail = typeof payload.email === "string" ? payload.email.toLowerCase() : "";
      const allowed = jwtEmail === authorizedEmail;
      if (!allowed) {
        logWarn("auth_rejected", { reason: "jwt_email_mismatch", email: jwtEmail });
      }
      return allowed;
    } catch (error) {
      logWarn("auth_rejected", { reason: "invalid_cf_access_jwt", error: error instanceof Error ? error.message : "unknown" });
      return false;
    }
  }

  if (headerEmail !== authorizedEmail) {
    logWarn("auth_rejected", { reason: headerEmail ? "email_mismatch" : "missing_identity_header", email: headerEmail });
    return false;
  }

  return true;
}

export function hasValidCronSecret(request: Request) {
  const secret = getEnv().CRON_SECRET;
  if (!secret) {
    return false;
  }

  const authHeader = request.headers.get("authorization") ?? "";
  return authHeader === `Bearer ${secret}`;
}

export function hasValidAdminSecret(request: Request | NextRequest) {
  const secret = getEnv().ADMIN_DASHBOARD_SECRET;
  if (!secret) {
    return false;
  }

  const authHeader = request.headers.get("authorization") ?? "";
  return authHeader === `Bearer ${secret}`;
}
