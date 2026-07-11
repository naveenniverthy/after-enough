This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

<<<<<<< HEAD
Morning trading dashboard for `dashboard.after-enough.com`.

The app is a Next.js App Router project deployed on Vercel, backed by Supabase, and powered by Financial Modeling Prep (FMP) market/news/calendar data. It can run as a public read-only dashboard now, while keeping Cloudflare Access authentication available behind a feature flag for later.

## Required Environment Variables

Production values:

```bash
PUBLIC_DASHBOARD_ACCESS=true
ADMIN_DASHBOARD_SECRET=<long-random-secret-at-least-24-chars>
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

Generate the admin secret with:

```bash
openssl rand -hex 32
```

Recommended for production Cloudflare Access JWT validation:
=======
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
>>>>>>> parent of cbd7f1e (Trading Dashboard)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

<<<<<<< HEAD
Secrets are only used in server code. Do not create `NEXT_PUBLIC_*` copies of FMP, Supabase service role, cron, or admin secrets.

## Public Read-Only Mode

For the current deployment, set:

```bash
PUBLIC_DASHBOARD_ACCESS=true
ADMIN_DASHBOARD_SECRET=<openssl rand -hex 32>
MOCK_DATA_MODE=false
DASHBOARD_DEV_BYPASS=false
NEXT_PUBLIC_APP_URL=https://dashboard.after-enough.com
```

When public access is enabled, anonymous users can read:

- `/dashboard`
- `/api/latest-report`
- `/api/reports`
- `/api/reports/[date]`
- `/api/health`

These remain protected:

- `/dashboard/system-status`
- `/api/system-status`
- `/api/admin/*`
- `/api/refresh`
- `/api/generate-morning-report`

`/api/refresh` and admin diagnostics require `Authorization: Bearer $ADMIN_DASHBOARD_SECRET`. `/api/generate-morning-report` requires `Authorization: Bearer $CRON_SECRET`.

To return to private Cloudflare Access mode later, set:

```bash
PUBLIC_DASHBOARD_ACCESS=false
AUTHORIZED_EMAIL=approved-user@example.com
```
=======
This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
>>>>>>> parent of cbd7f1e (Trading Dashboard)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

<<<<<<< HEAD
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
11. If using temporary public mode, set `PUBLIC_DASHBOARD_ACCESS=true`.
12. If returning to private mode, configure Cloudflare Access for the full subdomain.
13. Test `/api/health`.
14. Test `/dashboard/system-status`.
15. Test manual refresh.
16. Test cron route with `CRON_SECRET`.
17. Confirm report persistence in Supabase.
18. Confirm stale-data warnings appear when providers fail or old data is reused.
19. Confirm `MOCK_DATA_MODE=false`.
20. Confirm `DASHBOARD_DEV_BYPASS=false`.
=======
## Deploy on Vercel
>>>>>>> parent of cbd7f1e (Trading Dashboard)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

<<<<<<< HEAD
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

Cloudflare Access is optional while `PUBLIC_DASHBOARD_ACCESS=true`, but the code remains ready for it. To re-enable private mode, create a Cloudflare Zero Trust Access application:

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

It reports only safe operational fields: app status, environment, mock mode, public access mode, FMP/Supabase configured, latest report timestamp, latest report status, market status, and next scheduled refresh.

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

Admin API calls use:

```bash
curl -X POST https://dashboard.after-enough.com/api/refresh \
  -H "Authorization: Bearer $ADMIN_DASHBOARD_SECRET"
```

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
MOCK_DATA_MODE=true PUBLIC_DASHBOARD_ACCESS=true DASHBOARD_DEV_BYPASS=false NEXT_PUBLIC_APP_URL=http://localhost:3000 CRON_SECRET=abcdefghijklmnopqrstuvwxyz ADMIN_DASHBOARD_SECRET=adminsecretabcdefghijklmnopqrstuvwxyz npm start
```

Then check:

- `/dashboard`
- `/dashboard/system-status`
- `/api/health`
- `/api/latest-report`
- `/api/refresh`
- `/api/generate-morning-report`

Expected public-mode checks:

- `/dashboard` opens without Cloudflare headers on the custom domain.
- `/api/health` opens publicly and contains no secrets.
- `/dashboard/system-status` remains protected.
- `/api/refresh` remains protected and requires `ADMIN_DASHBOARD_SECRET`.
- `/api/generate-morning-report` remains protected and requires `CRON_SECRET`.
- Raw Vercel deployment URLs are blocked for dashboard/report reads when `NEXT_PUBLIC_APP_URL` is set to the custom domain.

## Troubleshooting

- Redirected to login: Cloudflare Access did not send the expected identity or JWT headers, or the email does not match `AUTHORIZED_EMAIL`.
- Public dashboard still redirects: verify `PUBLIC_DASHBOARD_ACCESS=true` in Vercel and redeploy.
- Refresh button is hidden: expected in public mode. Automatic morning refresh remains enabled.
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
=======
Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> parent of cbd7f1e (Trading Dashboard)
