import Link from "next/link";
import { stageGroups } from "./home-stage-data";

export const metadata = {
  title: {
    absolute: "After Enough",
  },
  description:
    "A calm, practical guide to life after financial independence: meaning, simplicity, retreats, and the deeper transition after enough.",
  alternates: {
    canonical: "/",
  },
};

function ArrowLink({ href, children }) {
  return (
    <Link href={href} className="hero-link">
      <span>{children}</span>
      <span aria-hidden="true">→</span>
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
          {stageGroups.map((stage) => (
            <Link key={stage.href} href={stage.href} className="stage-card-link">
              <article className="stage-card">
                <p className="stage-label">{stage.label}</p>
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </article>
            </Link>
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
