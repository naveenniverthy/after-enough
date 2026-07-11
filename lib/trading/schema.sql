create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists daily_reports (
  id uuid primary key default gen_random_uuid(),
  report_date date not null unique,
  generated_at timestamptz not null,
  overall_status text not null,
  overall_score integer not null,
  semiconductor_score integer not null,
  volatility_level text not null,
  economic_risk text not null,
  news_risk text not null,
  recommended_posture text not null,
  morning_summary text not null,
  critical_alert jsonb not null,
  raw_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists market_snapshots (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references daily_reports(id) on delete cascade,
  symbol text not null,
  name text not null,
  value text not null,
  change_percent numeric not null,
  interpretation text not null,
  timestamp timestamptz not null
);

create table if not exists news_items (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references daily_reports(id) on delete cascade,
  headline text not null,
  source text not null,
  published_at timestamptz not null,
  summary text not null,
  why_it_matters text not null,
  sentiment text not null,
  affected_tickers text[] not null default '{}',
  article_url text not null
);

create table if not exists economic_events (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references daily_reports(id) on delete cascade,
  event_time timestamptz not null,
  event_name text not null,
  importance text not null,
  forecast text,
  previous text,
  actual text,
  market_impact text not null
);

create table if not exists earnings_events (
  id uuid primary key default gen_random_uuid(),
  report_id uuid not null references daily_reports(id) on delete cascade,
  ticker text not null,
  company text not null,
  reporting_time text not null,
  eps_estimate text,
  revenue_estimate text,
  importance text not null
);

create table if not exists report_runs (
  id uuid primary key default gen_random_uuid(),
  started_at timestamptz not null,
  completed_at timestamptz,
  trigger_type text not null,
  report_date date,
  status text not null,
  provider_status jsonb not null default '{}'::jsonb,
  fallback_used boolean not null default false,
  stale_sections text[] not null default '{}',
  error_summary text,
  created_at timestamptz not null default now()
);
