import Link from "next/link";

const exploreLinks = [
  {
    href: "/start-here",
    title: "Start Here",
    description:
      "Why money alone does not prepare us for the freedom we think we want.",
  },
  {
    href: "/path",
    title: "Path",
    description:
      "A clear framework for moving from financial independence toward inner steadiness.",
  },
  {
    href: "/how-much-is-enough",
    title: "Enough",
    description:
      "A quiet reflection on sufficiency, security, and when more stops helping.",
  },
  {
    href: "/when-money-becomes-less-important",
    title: "When Money Matters Less",
    description:
      "A reflection on the stage of life where money stops ruling each decision.",
  },
  {
    href: "/life-after-financial-independence",
    title: "Life After FI",
    description:
      "What actually changes after financial independence, and why freedom alone is not enough.",
  },
  {
    href: "/why-retirement-is-not-the-real-goal",
    title: "Retirement Is Not the Goal",
    description:
      "Why meaning, structure, connection, and direction still matter after enough.",
  },
  {
    href: "/the-stages-of-enough",
    title: "The Stages of Enough",
    description:
      "A simple progression from dependence to independence and the deeper question after enough.",
  },
  {
    href: "/besides-retire-early",
    title: "Beyond Early Retirement",
    description:
      "Ways financial independence can be used for slowing down, redesigning work, and living more intentionally.",
  },
  {
    href: "/ikigai",
    title: "Find What to Do Next",
    description:
      "A reflective Ikigai assessment to help you sense the kind of contribution, rhythm, and life shape that fit your next chapter.",
  },
  {
    href: "/retreats",
    title: "Retreats",
    description:
      "Choose spiritual retreats in India with more clarity and less confusion.",
  },
  {
    href: "/about",
    title: "About",
    description:
      "The quiet idea behind this project and the kind of transition it hopes to support.",
  },
  {
    href: "/fire-calculator",
    title: "FIRE Calculator",
    description:
      "A plain-English tool for Lean FIRE, Barista FIRE, Coast FIRE, and more.",
  },
];

export const metadata = {
  title: "After Enough",
  description:
    "A calm, practical guide to life after financial independence: meaning, simplicity, retreats, and the deeper transition after enough.",
};

function ArrowLink({ href, children }) {
  return (
    <Link href={href} className="hero-link">
      <span>{children}</span>
      <span aria-hidden="true">→</span>
    </Link>
  );
}

function ExploreCard({ href, title, description }) {
  return (
    <Link href={href} className="explore-card">
      <div className="explore-card-inner">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <main className="page-shell after-enough-home">
      <section className="hero">
        <p className="eyebrow">Life after financial independence</p>

        <h1>What happens after you have enough?</h1>

        <p className="hero-lead">
          Financial freedom gives you time. It does not automatically give you
          direction.
        </p>

        <p className="hero-lead softer">
          You may have done many things right. You may even be fine on paper.
          But something can still feel unfinished.
        </p>

        <p className="hero-copy">
          This is a space for preparing for the second half of life with more
          clarity, simplicity, and depth.
        </p>

        <p className="hero-copy">
          It is for people who have achieved enough, but are quietly asking:
          what now?
        </p>

        <div className="hero-actions">
          <ArrowLink href="/start-here">Start here</ArrowLink>
          <ArrowLink href="/ikigai">Find what to do next</ArrowLink>
        </div>
      </section>

      <section className="content-block">
        <h2>The missing preparation</h2>
        <p>
          Many people spend years learning how to earn, save, invest, and
          retire. Very few prepare for what comes after.
        </p>
        <p>
          This site is about that missing preparation: how to meet freedom
          well, simplify life, and grow into a more thoughtful way of living.
        </p>
      </section>

      <section className="content-block">
        <h2>A simple three-stage path</h2>
        <p className="section-intro">
          Most people move through this in order, even if the stages overlap.
        </p>

        <div className="stages-grid">
          <article className="stage-card">
            <p className="stage-label">Stage 1</p>
            <h3>Build Enough</h3>
            <p>Create financial stability and reduce dependency.</p>
          </article>

          <article className="stage-card">
            <p className="stage-label">Stage 2</p>
            <h3>Lighten the Mind</h3>
            <p>
              Simplify life, reduce pressure, and understand what still drives
              you.
            </p>
          </article>

          <article className="stage-card">
            <p className="stage-label">Stage 3</p>
            <h3>Live Differently</h3>
            <p>
              Move from achievement toward reflection, contribution, and inward
              growth.
            </p>
          </article>
        </div>
      </section>

      <section className="content-block">
        <h2>Explore the site</h2>
        <p className="section-intro">
          Start with the larger question, then move toward tools, reflections,
          and practical next steps.
        </p>

        <div className="explore-grid">
          {exploreLinks.map((item) => (
            <ExploreCard
              key={item.href}
              href={item.href}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="closing-note">
        <p>
          Do not just retire from work. Prepare for a different way of living.
        </p>
        <Link href="/start-here" className="closing-link">
          Begin with the larger question
        </Link>
      </section>
    </main>
  );
}
