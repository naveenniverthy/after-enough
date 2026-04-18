import Link from "next/link";
import ExploreCard from "../components/ExploreCard";
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

const coreJourney = [
  {
    href: "/start-here",
    title: "Start Here",
    description:
      "Why money alone does not prepare us for the freedom we think we want.",
  },
  {
    href: "/what-fire-is-really-about",
    title: "What FIRE Is Really About",
    description:
      "A shift from compulsion to choice, and from pressure to intentional living.",
  },
  {
    href: "/how-much-is-enough",
    title: "Enough",
    description:
      "A quiet reflection on sufficiency, security, and when more stops helping.",
  },
  {
    href: "/life-after-financial-independence",
    title: "Life After FI",
    description:
      "What actually changes after financial independence, and why freedom alone is not enough.",
  },
  {
    href: "/ikigai",
    title: "Ikigai",
    description:
      "A reflective questionnaire to help you sense what kind of contribution and rhythm fit your next chapter.",
  },
];

const exploreMore = [
  {
    href: "/path",
    title: "Path",
    description:
      "A clear framework for moving from financial independence toward inner steadiness.",
  },
  {
    href: "/when-money-becomes-less-important",
    title: "When Money Matters Less",
    description:
      "A reflection on the stage of life where money stops ruling each decision.",
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
    href: "/retreats",
    title: "Retreats",
    description:
      "Choose spiritual retreats in India with more clarity and less confusion.",
  },
  {
    href: "/fire-calculator",
    title: "FIRE Calculator",
    description:
      "A plain-English tool for Lean FIRE, Barista FIRE, Coast FIRE, and more.",
  },
  {
    href: "/about",
    title: "About",
    description:
      "The quiet idea behind this project and the kind of transition it hopes to support.",
  },
];

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
          This site is for people who have achieved enough, or are moving
          toward it, and are quietly asking a deeper question:
        </p>

        <p className="hero-copy">
          What kind of life becomes possible when money matters less?
        </p>

        <div className="hero-actions">
          <ArrowLink href="/start-here">Start here</ArrowLink>
          <ArrowLink href="/ikigai">Explore Ikigai</ArrowLink>
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

      <section className="content-block">
        <p className="eyebrow">Best place to begin</p>
        <h2>Follow the core journey</h2>

        <div className="explore-grid">
          {coreJourney.map((item) => (
            <ExploreCard
              key={item.href}
              href={item.href}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </section>

      <section className="content-block">
        <p className="eyebrow">A simple orientation</p>
        <p className="hero-copy">
          Do not just retire from work. Prepare for a different way of living.
        </p>
      </section>

      <section className="content-block">
        <p className="eyebrow">Explore more</p>
        <h2>Essays, tools, and next-step resources</h2>

        <div className="explore-grid">
          {exploreMore.map((item) => (
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
        <p className="eyebrow">Begin with the larger question</p>
        <p>
          Financial independence can remove one kind of pressure. It does not
          answer what your life is for. That is the question this site is built
          around.
        </p>
        <Link href="/start-here" className="closing-link">
          Begin now
        </Link>
      </section>
    </main>
  );
}
