import Link from "next/link";
import PageIntro from "../../components/PageIntro";

export const metadata = {
  title: "Sitemap",
  description: "A simple map of the main pages on After Enough.",
  alternates: {
    canonical: "/sitemap",
  },
};

const sitemapSections = [
  {
    title: "Start Here",
    links: [
      { href: "/start-here", label: "Start Here" },
      { href: "/path", label: "Path" },
    ],
  },
  {
    title: "FIRE Planning",
    links: [
      { href: "/what-fire-is-really-about", label: "What FIRE Is Really About" },
      { href: "/how-much-is-enough", label: "How Much Is Enough" },
      { href: "/build-enough", label: "Build Enough" },
      { href: "/lean-fire", label: "Lean FIRE" },
      { href: "/coast-fire", label: "Coast FIRE" },
      { href: "/barista-fire", label: "Barista FIRE" },
      { href: "/fat-fire", label: "Fat FIRE" },
    ],
  },
  {
    title: "Life After Financial Independence",
    links: [
      {
        href: "/life-after-financial-independence",
        label: "Life After Financial Independence",
      },
      {
        href: "/financial-independence-is-more-than-income",
        label: "Financial Independence Is More Than Income",
      },
      {
        href: "/why-retirement-is-not-the-real-goal",
        label: "Why Retirement Is Not the Real Goal",
      },
      {
        href: "/what-money-gets-right",
        label: "What Money Gets Right",
      },
      {
        href: "/when-money-becomes-less-important",
        label: "When Money Becomes Less Important",
      },
      {
        href: "/what-freedom-actually-demands",
        label: "What Freedom Actually Demands",
      },
      { href: "/live-differently", label: "Live Differently" },
      { href: "/besides-retire-early", label: "Besides Retire Early" },
      { href: "/the-stages-of-enough", label: "The Stages of Enough" },
    ],
  },
  {
    title: "Retreats & Inner Work",
    links: [
      { href: "/retreats", label: "Retreats" },
      { href: "/lighten-the-mind", label: "Lighten the Mind" },
    ],
  },
  {
    title: "Tools & Assessments",
    links: [
      { href: "/fire-calculator", label: "FIRE Calculator" },
      { href: "/ikigai", label: "Ikigai" },
    ],
  },
  {
    title: "About / Core Pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <div className="container sitemap-page">
      <PageIntro
        eyebrow="Sitemap"
        title="Sitemap"
        intro="A simple map of the main pages on After Enough."
      />

      <div className="sitemap-grid">
        {sitemapSections.map((section) => (
          <section key={section.title} className="sitemap-card">
            <h2>{section.title}</h2>

            <div className="sitemap-links">
              {section.links.map((link) => (
                <Link key={link.href} href={link.href} className="sitemap-link">
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
