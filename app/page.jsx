export const metadata = {
  title: "After Enough",
  description:
    "Preparing for a slower, clearer, more meaningful second half of life.",
};

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
    href: "/retreats",
    title: "Retreats",
    description:
      "Practical guidance for retreats, ashrams, and intentional pauses from ordinary pace.",
  },
  {
    href: "/about",
    title: "About",
    description:
      "The quiet idea behind this project and the kind of transition it hopes to support.",
  },
];

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="ae-home">
      <section className="ae-hero">
        <p className="ae-eyebrow">Life after financial independence</p>

        <h1 className="ae-title">What happens after you have enough?</h1>

        <p className="ae-intro">
          Financial freedom gives you time. It does not automatically give you
          direction. This is a space for preparing for the second half of life
          with more clarity, simplicity, and depth.
        </p>

        <p className="ae-subtle-line">
          This site is for people who have achieved enough, but are quietly
          asking what now.
        </p>

        <div className="ae-hero-actions">
          <Link href="/start-here" className="ae-button">
            Start here
          </Link>
        </div>
      </section>

      <section className="ae-section">
        <div className="ae-section-inner">
          <h2>The missing preparation</h2>
          <p>
            Many people spend years learning how to earn, save, invest, and
            retire. Very few prepare for what comes after. This site is about
            that missing preparation: how to meet freedom well, simplify life,
            and grow into a more thoughtful way of living.
          </p>
        </div>
      </section>

      <section className="ae-section">
        <div className="ae-section-inner">
          <h2>A simple three-stage path</h2>

          <div className="ae-stage-grid">
            <article className="ae-stage-card">
              <h3>Build Enough</h3>
              <p>Create financial stability and reduce dependency.</p>
            </article>

            <article className="ae-stage-card">
              <h3>Lighten the Mind</h3>
              <p>Simplify life, reduce pressure, and understand what still drives you.</p>
            </article>

            <article className="ae-stage-card">
              <h3>Live Differently</h3>
              <p>Move from achievement toward reflection, contribution, and inward growth.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="ae-section">
        <div className="ae-section-inner">
          <h2>Explore the site</h2>

          <div className="ae-link-grid">
            {exploreLinks.map((item) => (
              <Link key={item.href} href={item.href} className="ae-link-card">
                <span className="ae-link-title">{item.title}</span>
                <span className="ae-link-description">{item.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="ae-closing">
        <p>Do not just retire from work. Prepare for a different way of living.</p>
        <Link href="/start-here" className="ae-text-link">
          Begin with the larger question
        </Link>
      </section>
    </main>
  );
}
