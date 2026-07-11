# After Enough Trading Dashboard

Private morning trading dashboard for `dashboard.after-enough.com`.

The app is a Next.js App Router project deployed on Vercel, protected by Cloudflare Access, backed by Supabase, and powered by Financial Modeling Prep (FMP) market/news/calendar data. It keeps `MOCK_DATA_MODE=true` for development only.

## Required Environment Variables

Production values:

```bash
MOCK_DATA_MODE=false
FMP_API_KEY=...
FMP_DATA_DELAY_STATUS=delayed
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
AUTHORIZED_EMAIL=approved-user@example.com
CRON_SECRET=<long-random-secret-at-least-24-chars>
DASHBOARD_DEV_BYPASS=false
NEXT_PUBLIC_APP_URL=https://dashboard.after-enough.com
GENERATE_ON_MARKET_HOLIDAYS=false
ALLOW_VERCEL_BYPASS=false
```

Recommended for production Cloudflare Access JWT validation:

```bash
CLOUDFLARE_ACCESS_TEAM_DOMAIN=https://your-team.cloudflareaccess.com
CLOUDFLARE_ACCESS_AUD=<Cloudflare Access application audience tag>
```

Secrets are only used in server code. Do not create `NEXT_PUBLIC_*` copies of FMP, Supabase service role, or cron secrets.

## Local Development

```bash
npm install
MOCK_DATA_MODE=true DASHBOARD_DEV_BYPASS=true npm run dev
```

Open `http://localhost:3000/dashboard`.

## Production Checklist

1. Create a private GitHub repository.
2. Push the code.
3. Create a Vercel project from the repository.
4. Add all production environment variables.
5. Create a Supabase project.
6. Run `lib/trading/schema.sql` in Supabase SQL editor.
7. Deploy on Vercel.
8. Add `dashboard.after-enough.com` in Vercel Domains.
9. Add the DNS record requested by Vercel, usually a `CNAME` from `dashboard` to `cname.vercel-dns.com`.
10. Confirm HTTPS is issued by Vercel.
11. Configure Cloudflare Access for the full subdomain.
12. Verify authentication with the approved email.
13. Test `/api/health`.
14. Test `/dashboard/system-status`.
15. Test manual refresh.
16. Test cron route with `CRON_SECRET`.
17. Confirm report persistence in Supabase.
18. Confirm stale-data warnings appear when providers fail or old data is reused.
19. Confirm `MOCK_DATA_MODE=false`.
20. Confirm `DASHBOARD_DEV_BYPASS=false`.

## Custom Domain

In Vercel:

1. Project Settings -> Domains.
2. Add `dashboard.after-enough.com`.
3. Follow the displayed DNS instruction.

In DNS:

```text
Type: CNAME
Name: dashboard
Value: cname.vercel-dns.com
Proxy: DNS-only until Vercel verifies, then Cloudflare proxy can be enabled if Access is configured
```

Set:

```bash
NEXT_PUBLIC_APP_URL=https://dashboard.after-enough.com
```

The root path redirects to `/dashboard`. API routes are not redirected.

## Cloudflare Access

Create a Cloudflare Zero Trust Access application:

- Application domain: `dashboard.after-enough.com`
- Protect full subdomain
- Login method: Google login or one-time PIN
- Policy: allow only `AUTHORIZED_EMAIL`
- Session duration: 24 hours
- Deny everyone else

The app can read `cf-access-authenticated-user-email`, but production should prefer JWT validation. Configure:

- `CLOUDFLARE_ACCESS_TEAM_DOMAIN`
- `CLOUDFLARE_ACCESS_AUD`

When those are present, the app validates `Cf-Access-Jwt-Assertion` against Cloudflare Access certificates and then checks the JWT email against `AUTHORIZED_EMAIL`.

To reduce bypass risk for the raw Vercel URL, keep:

```bash
ALLOW_VERCEL_BYPASS=false
NEXT_PUBLIC_APP_URL=https://dashboard.after-enough.com
```

The proxy blocks protected requests whose origin does not match `NEXT_PUBLIC_APP_URL` in production. For stronger origin protection, combine this with Cloudflare Access JWT validation and Vercel/domain access controls where available.

## Cron Schedule

Vercel cron runs in UTC. `vercel.json` schedules both UTC equivalents for 7:00 AM America/Detroit:

- `0 11 * * 1-5`
- `0 12 * * 1-5`

The route checks Detroit local time and only generates inside the intended weekday 7 AM window. It also:

- skips weekends
- skips configured US market holidays unless `GENERATE_ON_MARKET_HOLIDAYS=true`
- prevents duplicate reports for the same report date
- records skipped, completed, partial, and failed runs in `report_runs`

Manual test:

```bash
curl -X POST https://dashboard.after-enough.com/api/generate-morning-report \
  -H "Authorization: Bearer $CRON_SECRET"
```

## Health And Diagnostics

Safe public health endpoint:

```text
GET /api/health
```

It reports only safe operational fields: app status, environment, mock mode, FMP/Supabase configured, latest report timestamp, and latest report status.

Authorized admin page:

```text
/dashboard/system-status
```

It shows provider configuration, latest successful/failed report information, cron run summaries, data mode, delay setting, domain configuration, and auth mode. It never displays secrets.

Admin actions require confirmation:

- Test FMP connection
- Test Supabase connection
- Generate test report
- Generate production report
- Clear test report, recorded as a safe no-delete action

## Data Vendor

Financial Modeling Prep endpoints used:

- `batch-quote`
- `batch-aftermarket-quote`
- `news/stock-latest`
- `economic-calendar`
- `earnings-calendar`

FMP plan requirements depend on endpoint access, rate limits, extended-hours availability, and exchange licensing. Keep `FMP_DATA_DELAY_STATUS=delayed` unless the subscription and exchange agreements actually provide live data.

## Supabase

Run:

```sql
-- see lib/trading/schema.sql
```

Tables:

- `profiles`
- `daily_reports`
- `market_snapshots`
- `news_items`
- `economic_events`
- `earnings_events`
- `report_runs`

`SUPABASE_SERVICE_ROLE_KEY` is server-only.

## Verification Commands

```bash
npm run lint
npm run build
npm test
```

Production-mode smoke test:

```bash
npm run build
MOCK_DATA_MODE=true DASHBOARD_DEV_BYPASS=true NEXT_PUBLIC_APP_URL=http://localhost:3000 npm start
```

Then check:

- `/dashboard`
- `/dashboard/system-status`
- `/api/health`
- `/api/latest-report`
- `/api/refresh`
- `/api/generate-morning-report`

## Troubleshooting

- Redirected to login: Cloudflare Access did not send the expected identity or JWT headers, or the email does not match `AUTHORIZED_EMAIL`.
- `/api/health` configuration error: required production variables are missing or unsafe.
- Cron skipped: wrong local Detroit time, weekend, market holiday, or duplicate report date.
- Stale warning: provider failed or previous data was reused. Check `daily_reports.raw_data.providerErrors` and `report_runs`.
- Premarket `N/A`: FMP did not return extended-hours data for that symbol/plan.
- Supabase save failed: verify schema, service role key, and REST access.
- Raw Vercel URL blocked: expected in production unless `ALLOW_VERCEL_BYPASS=true`.

## Current Limitations

- Futures are not integrated from a dedicated futures feed.
- Premarket and exchange-delay quality depends on FMP subscription and licensing.
- Market holiday handling covers common full-day US market holidays, not every early-close schedule.
- Raw Vercel URL blocking is an app-level guard; Cloudflare Access JWT validation is the stronger authentication control.
