# After Enough Trading Dashboard

Private morning day-trading intelligence dashboard for `dashboard.after-enough.com`.

The dashboard is a Next.js App Router project with server-side report generation, Supabase report storage, Vercel Cron, Cloudflare Access style authorization, and a mock-data mode for local development.

## Local Development

```bash
npm install
MOCK_DATA_MODE=true DASHBOARD_DEV_BYPASS=true npm run dev
```

Open `http://localhost:3000/dashboard`.

`DASHBOARD_DEV_BYPASS=true` is only for local development. Do not set it in production.

## API Vendor Setup

The production provider is Financial Modeling Prep (FMP), wired through `lib/trading/providers.ts`.

Used endpoints:

- `batch-quote` for tracked symbols.
- `batch-aftermarket-quote` for extended-hours bid/ask/price when available.
- `news/stock-latest` for market news, then local filtering, ranking, and dedupe.
- `economic-calendar` for US economic events.
- `earnings-calendar` for today and tomorrow earnings.

Required variables:

```bash
FMP_API_KEY=...
FMP_DATA_DELAY_STATUS=delayed
MOCK_DATA_MODE=false
```

Set `FMP_DATA_DELAY_STATUS=live` only if your FMP plan and exchange licensing actually provide live data. Otherwise keep `delayed`.

## Subscription And Licensing Notes

FMP Basic is useful for endpoint testing but is limited. For this dashboard, expect to need at least a paid plan that supports real-time or near-real-time quotes, financial market news, corporate calendars, and enough call volume for scheduled and manual refreshes.

Rate-limit considerations:

- A normal report uses quote, extended-hours quote, news, economic-calendar, and earnings-calendar calls.
- Manual refreshes add the same call load.
- Keep Vercel Cron to weekday mornings unless you intentionally expand refresh frequency.
- Public display or redistribution of vendor market data may require a separate data display or exchange agreement. This project is designed as a private dashboard.

Known data limitations:

- Premarket fields depend on FMP extended-hours availability and plan coverage. If unavailable, the UI shows `N/A`.
- Futures are not currently pulled from a futures feed; Version 1 tracks QQQ/SPY/SMH/SOXL/SOXS and chip equities/ETFs through FMP.
- Exchange delay status is configured by `FMP_DATA_DELAY_STATUS`; the app cannot independently verify exchange entitlements.
- Economic-calendar timestamps are converted for display to America/Detroit by the UI.

## Supabase Configuration

Create a Supabase project and run `lib/trading/schema.sql` in the SQL editor.

Required variables:

```bash
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Only server code uses `SUPABASE_SERVICE_ROLE_KEY`. Do not expose it to client components or `NEXT_PUBLIC_*` variables.

Reports are saved into:

- `daily_reports`
- `market_snapshots`
- `news_items`
- `economic_events`
- `earnings_events`

If Supabase is not configured, the dashboard still renders a generated in-memory report but cannot archive it.

## Authentication

The project uses Next.js `proxy.ts` as an authorization gate. It expects Cloudflare Access or a similar identity layer to inject the authenticated email in one of these headers:

- `cf-access-authenticated-user-email`
- `x-authenticated-user-email`
- `x-vercel-auth-user-email`

Required variable:

```bash
AUTHORIZED_EMAIL=your-approved-email@example.com
```

Cloudflare Access setup:

1. Put `dashboard.after-enough.com` behind Cloudflare.
2. Create a Zero Trust Access application for the dashboard hostname.
3. Allow only the approved email address.
4. Confirm Cloudflare forwards `cf-access-authenticated-user-email`.
5. Set the same email in Vercel as `AUTHORIZED_EMAIL`.

Do not rely on a hidden URL.

## Vercel Environment Configuration

Set these in Vercel Project Settings:

```bash
AUTHORIZED_EMAIL=...
CRON_SECRET=...
MOCK_DATA_MODE=false
FMP_API_KEY=...
FMP_DATA_DELAY_STATUS=delayed
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
DASHBOARD_DEV_BYPASS=false
```

`vercel.json` schedules `/api/generate-morning-report` on weekday UTC times that cover 7:00 AM America/Detroit across daylight saving changes. The route itself checks Detroit local time and skips calls that are not exactly the intended weekday hour.

## Manual Cron Testing

Generate a report manually:

```bash
curl -X POST https://dashboard.after-enough.com/api/generate-morning-report \
  -H "Authorization: Bearer $CRON_SECRET"
```

Manual dashboard refresh uses `/api/refresh` and requires the authorized email header through Cloudflare Access.

## Production Deployment

1. Configure Supabase and run `lib/trading/schema.sql`.
2. Configure FMP and confirm your subscription covers the endpoints above.
3. Add Vercel environment variables.
4. Configure Cloudflare Access for `dashboard.after-enough.com`.
5. Deploy to Vercel.
6. Test `/dashboard` through Cloudflare Access.
7. Trigger the manual cron endpoint once.
8. Confirm a row appears in `daily_reports`.

## Testing

```bash
npm run lint
npm run build
npm test
```

Tests cover provider parsing, scoring, news dedupe, stale data detection, timezone countdowns, provider fallback, and dashboard authorization helpers.

## Troubleshooting

- Dashboard redirects to login: verify Cloudflare Access is sending the authenticated email header and that it matches `AUTHORIZED_EMAIL`.
- Reports are not saved: verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`, then check Supabase table names from `schema.sql`.
- Data says `Stale`: a provider failed and the report reused the previous successful section. Check `daily_reports.raw_data.providerErrors`.
- Premarket is `N/A`: your FMP plan or endpoint response did not include extended-hours data.
- Cron skipped: the route only generates at 7:00 AM America/Detroit on weekdays; off-hour calls return a skipped response unless you use POST for manual testing.
- Vendor HTTP errors: check FMP key, subscription level, call limits, and endpoint availability.
