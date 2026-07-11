import type { NewsItem } from "./types";

const HIGH_RELEVANCE_TERMS = [
  "soxl",
  "soxs",
  "smh",
  "qqq",
  "semiconductor",
  "nvidia",
  "nvda",
  "amd",
  "broadcom",
  "avgo",
  "tsmc",
  "taiwan semiconductor",
  "micron",
  "mu",
  "federal reserve",
  "inflation",
  "cpi",
  "ppi",
  "interest rates",
  "treasury yields",
  "china",
  "taiwan",
  "tariff",
  "export restriction",
  "artificial intelligence",
  "geopolitical",
];

const RELIABLE_SOURCES = [
  "Reuters",
  "Bloomberg",
  "Wall Street Journal",
  "CNBC",
  "MarketWatch",
  "Associated Press",
  "Financial Times",
];

function normalizeHeadline(headline: string) {
  return headline
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .replace(/\b(the|a|an|to|of|and|in|on|for|with|as|at|by|from)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenOverlap(a: string, b: string) {
  const left = new Set(normalizeHeadline(a).split(" ").filter(Boolean));
  const right = new Set(normalizeHeadline(b).split(" ").filter(Boolean));
  if (!left.size || !right.size) {
    return 0;
  }

  const intersection = [...left].filter((token) => right.has(token)).length;
  return intersection / Math.min(left.size, right.size);
}

export function dedupeNews(items: NewsItem[]) {
  const selected: NewsItem[] = [];

  for (const item of items) {
    if (!selected.some((candidate) => tokenOverlap(candidate.headline, item.headline) >= 0.62)) {
      selected.push(item);
    }
  }

  return selected;
}

export function rankNews(items: NewsItem[], now = new Date()) {
  return [...items].sort((a, b) => newsScore(b, now) - newsScore(a, now));
}

export function newsScore(item: NewsItem, now = new Date()) {
  const haystack = `${item.headline} ${item.summary} ${item.whyItMatters} ${item.affectedTickers.join(" ")}`.toLowerCase();
  const relevance = HIGH_RELEVANCE_TERMS.reduce((score, term) => score + (haystack.includes(term) ? 8 : 0), 0);
  const reliability = RELIABLE_SOURCES.some((source) => item.source.toLowerCase().includes(source.toLowerCase())) ? 18 : 6;
  const ageHours = Math.max(0, (now.getTime() - new Date(item.publishedAt).getTime()) / 3_600_000);
  const recency = Math.max(0, 24 - ageHours);
  const impact = item.sentiment === "neutral" ? 6 : 12;

  return relevance + reliability + recency + impact;
}
