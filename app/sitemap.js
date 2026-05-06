const siteUrl = "https://www.after-enough.com";

const routes = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/start-here", priority: 0.9, changeFrequency: "monthly" },
  { path: "/path", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/retreats", priority: 0.85, changeFrequency: "weekly" },
  { path: "/ikigai", priority: 0.85, changeFrequency: "monthly" },
  { path: "/fire-calculator", priority: 0.85, changeFrequency: "monthly" },
  { path: "/swp-calculator", priority: 0.85, changeFrequency: "monthly" },
  {
    path: "/life-after-financial-independence",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/financial-independence-is-more-than-income",
    priority: 0.75,
    changeFrequency: "monthly",
  },
  { path: "/how-much-is-enough", priority: 0.75, changeFrequency: "monthly" },
  { path: "/build-enough", priority: 0.75, changeFrequency: "monthly" },
  {
    path: "/when-money-becomes-less-important",
    priority: 0.75,
    changeFrequency: "monthly",
  },
  {
    path: "/why-retirement-is-not-the-real-goal",
    priority: 0.75,
    changeFrequency: "monthly",
  },
  { path: "/besides-retire-early", priority: 0.75, changeFrequency: "monthly" },
  { path: "/live-differently", priority: 0.75, changeFrequency: "monthly" },
  { path: "/lighten-the-mind", priority: 0.75, changeFrequency: "monthly" },
  {
    path: "/what-money-gets-right",
    priority: 0.75,
    changeFrequency: "monthly",
  },
  {
    path: "/what-freedom-actually-demands",
    priority: 0.75,
    changeFrequency: "monthly",
  },
  {
    path: "/the-stages-of-enough",
    priority: 0.75,
    changeFrequency: "monthly",
  },
  {
    path: "/what-fire-is-really-about",
    priority: 0.7,
    changeFrequency: "monthly",
  },
  { path: "/lean-fire", priority: 0.7, changeFrequency: "monthly" },
  { path: "/barista-fire", priority: 0.7, changeFrequency: "monthly" },
  { path: "/coast-fire", priority: 0.7, changeFrequency: "monthly" },
  { path: "/fat-fire", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap() {
  const lastModified = new Date();

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
