import { NextRequest, NextResponse } from "next/server";
import { canUseDevBypass, getAuthorizedEmail, hasValidAdminSecret, verifyCloudflareAccessRequest } from "./lib/trading/auth";
import { getEnv } from "./lib/trading/env";

const protectedPrefixes = [
  "/dashboard",
  "/api/refresh",
  "/api/latest-report",
  "/api/reports",
  "/api/system-status",
  "/api/admin",
];

type RawUrlEnv = Partial<Record<"NODE_ENV" | "VERCEL_ENV" | "NEXT_PUBLIC_APP_URL" | "ALLOW_VERCEL_BYPASS", string>>;

function normalizedOrigin(url: string | undefined) {
  if (!url) {
    return "";
  }

  try {
    return new URL(url).origin;
  } catch {
    return "";
  }
}

export function shouldRedirectRootToDashboard(origin: string, env: RawUrlEnv = process.env) {
  const configuredOrigin = normalizedOrigin(env.NEXT_PUBLIC_APP_URL);
  const configuredHostname = configuredOrigin ? new URL(configuredOrigin).hostname : "";

  return origin === "https://dashboard.after-enough.com" || (origin === configuredOrigin && configuredHostname.startsWith("dashboard."));
}

export function shouldBlockRawDeploymentUrl(origin: string, pathname = "/dashboard", env: RawUrlEnv = process.env) {
  const isProductionDeployment = env.NODE_ENV === "production" || env.VERCEL_ENV === "production";
  return Boolean(
    isProductionDeployment &&
      env.NEXT_PUBLIC_APP_URL &&
      env.ALLOW_VERCEL_BYPASS !== "true" &&
      origin !== env.NEXT_PUBLIC_APP_URL &&
      (pathname === "/dashboard" || pathname.startsWith("/api/latest-report") || pathname.startsWith("/api/reports")),
  );
}

export function isPublicReadRoute(pathname: string, method: string, publicAccess: boolean) {
  if (!publicAccess || method !== "GET") {
    return false;
  }

  return (
    pathname === "/dashboard" ||
    pathname === "/api/latest-report" ||
    pathname === "/api/reports" ||
    pathname.startsWith("/api/reports/")
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/" && shouldRedirectRootToDashboard(request.nextUrl.origin)) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (shouldBlockRawDeploymentUrl(request.nextUrl.origin, pathname)) {
    return new Response("Forbidden", { status: 403 });
  }

  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isProtected || pathname.startsWith("/dashboard/login")) {
    return NextResponse.next();
  }

  if (canUseDevBypass()) {
    return NextResponse.next();
  }

  if (isPublicReadRoute(pathname, request.method, getEnv().PUBLIC_DASHBOARD_ACCESS)) {
    return NextResponse.next();
  }

  if (hasValidAdminSecret(request)) {
    return NextResponse.next();
  }

  if (await verifyCloudflareAccessRequest(request)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/dashboard/login";
  loginUrl.searchParams.set("next", pathname);
  if (!getAuthorizedEmail()) {
    loginUrl.searchParams.set("missing", "AUTHORIZED_EMAIL");
  }
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/api/refresh/:path*", "/api/latest-report/:path*", "/api/reports/:path*", "/api/system-status/:path*", "/api/admin/:path*"],
};
