import { z } from "zod";

const BooleanString = z.enum(["true", "false"]).transform((value) => value === "true");
const emptyToUndefined = (value: unknown) => (value === "" ? undefined : value);
const OptionalString = z.preprocess(emptyToUndefined, z.string().optional());
const OptionalUrl = z.preprocess(emptyToUndefined, z.string().url().optional());
const OptionalSecret = z.preprocess(emptyToUndefined, z.string().min(24).optional());

const EnvSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  MOCK_DATA_MODE: BooleanString.default(true),
  FMP_API_KEY: OptionalString,
  FMP_DATA_DELAY_STATUS: z.enum(["live", "delayed"]).default("delayed"),
  SUPABASE_URL: OptionalUrl,
  SUPABASE_ANON_KEY: OptionalString,
  SUPABASE_SERVICE_ROLE_KEY: OptionalString,
  AUTHORIZED_EMAIL: z.preprocess(emptyToUndefined, z.string().email().optional()),
  CRON_SECRET: OptionalSecret,
  ADMIN_DASHBOARD_SECRET: OptionalSecret,
  DASHBOARD_DEV_BYPASS: BooleanString.default(false),
  PUBLIC_DASHBOARD_ACCESS: BooleanString.default(false),
  NEXT_PUBLIC_APP_URL: OptionalUrl,
  GENERATE_ON_MARKET_HOLIDAYS: BooleanString.default(false),
  CLOUDFLARE_ACCESS_TEAM_DOMAIN: OptionalUrl,
  CLOUDFLARE_ACCESS_AUD: OptionalString,
  ALLOW_VERCEL_BYPASS: BooleanString.default(false),
});

export type AppEnv = z.infer<typeof EnvSchema>;

export function getEnv(): AppEnv {
  const parsed = EnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(`Invalid environment: ${parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ")}`);
  }
  return parsed.data;
}

export function validateProductionEnv() {
  const env = getEnv();
  if (env.NODE_ENV !== "production") {
    return env;
  }

  const missing: string[] = [];
  if (env.MOCK_DATA_MODE) missing.push("MOCK_DATA_MODE must be false");
  if (env.DASHBOARD_DEV_BYPASS) missing.push("DASHBOARD_DEV_BYPASS must be false");
  if (!env.FMP_API_KEY) missing.push("FMP_API_KEY");
  if (!env.SUPABASE_URL) missing.push("SUPABASE_URL");
  if (!env.SUPABASE_SERVICE_ROLE_KEY) missing.push("SUPABASE_SERVICE_ROLE_KEY");
  if (!env.PUBLIC_DASHBOARD_ACCESS && !env.AUTHORIZED_EMAIL) missing.push("AUTHORIZED_EMAIL");
  if (!env.CRON_SECRET) missing.push("CRON_SECRET");
  if (!env.ADMIN_DASHBOARD_SECRET) missing.push("ADMIN_DASHBOARD_SECRET");
  if (!env.NEXT_PUBLIC_APP_URL) missing.push("NEXT_PUBLIC_APP_URL");

  if (missing.length) {
    throw new Error(`Production environment is not ready: ${missing.join(", ")}`);
  }

  return env;
}

export function safeConfigSummary() {
  const env = getEnv();
  return {
    environment: env.NODE_ENV,
    mockMode: env.MOCK_DATA_MODE,
    publicDashboardAccess: env.PUBLIC_DASHBOARD_ACCESS,
    dataDelayStatus: env.FMP_DATA_DELAY_STATUS,
    supabaseConfigured: Boolean(env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY),
    fmpConfigured: Boolean(env.FMP_API_KEY),
    appUrl: env.NEXT_PUBLIC_APP_URL ?? null,
    holidayReportsEnabled: env.GENERATE_ON_MARKET_HOLIDAYS,
    cloudflareJwtValidationConfigured: Boolean(env.CLOUDFLARE_ACCESS_TEAM_DOMAIN && env.CLOUDFLARE_ACCESS_AUD),
  };
}
