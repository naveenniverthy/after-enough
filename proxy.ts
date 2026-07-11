import { NextRequest, NextResponse } from "next/server";
import { canUseDevBypass, getAuthorizedEmail, verifyCloudflareAccessRequest } from "./lib/trading/auth";

const protectedPrefixes = [
  "/dashboard",
  "/api/refresh",
  "/api/latest-report",
  "/api/reports",
  "/api/system-status",
  "/api/admin",
];

type RawUrlEnv = Partial<Record<"NODE_ENV" | "VERCEL_ENV" | "NEXT_PUBLIC_APP_URL" | "ALLOW_VERCEL_BYPASS", string>>;

export function shouldBlockRawDeploymentUrl(origin: string, env: RawUrlEnv = process.env) {
  const isProductionDeployment = env.NODE_ENV === "production" || env.VERCEL_ENV === "production";
  return Boolean(
    isProductionDeployment &&
      env.NEXT_PUBLIC_APP_URL &&
      env.ALLOW_VERCEL_BYPASS !== "true" &&
      origin !== env.NEXT_PUBLIC_APP_URL,
  );
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (shouldBlockRawDeploymentUrl(request.nextUrl.origin)) {
    return new Response("Forbidden", { status: 403 });
  }

  const isProtected = protectedPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!isProtected || pathname.startsWith("/dashboard/login")) {
    return NextResponse.next();
  }

  if (canUseDevBypass()) {
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
