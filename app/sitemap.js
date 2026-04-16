const siteUrl = "https://www.after-enough.com";

const routePriorities = [
  { path: "/", priority: 1.0 },
  { path: "/about", priority: 0.8 },
  { path: "/start-here", priority: 0.9 },
  { path: "/retreats", priority: 0.8 },
  { path: "/fire-calculator", priority: 0.8 },
  { path: "/life-after-financial-independence", priority: 0.8 },
  { path: "/path", priority: 0.8 },
  { path: "/what-money-gets-right", priority: 0.75 },
  { path: "/what-freedom-actually-demands", priority: 0.75 },
  { path: "/the-stages-of-enough", priority: 0.75 },
  { path: "/ikigai", priority: 0.85 },
];

export default function sitemap() {
  const lastModified = new Date();

  return routePriorities.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    priority,
  }));
}
