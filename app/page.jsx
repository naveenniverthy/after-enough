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
    href: "/how-much-is-enough",
    title: "How Much Is Enough",
    description:
      "A quieter way to think about sufficiency, security, and the point where more stops helping.",
  },
  {
    href: "/life-after-financial-independence",
    title: "Life After FI",
    description:
      "What changes after financial independence, and why freedom alone does not answer the question of how to live.",
  },
  {
    href: "/ikigai",
    title: "Ikigai",
    description:
      "A practical next step for sensing what kind of contribution, rhythm, and work may fit your next chapter.",
  },
  {
    href: "/retreats",
    title: "Retreats",
    description:
      "A thoughtful guide to choosing retreats in India with more clarity and less noise.",
  },
  {
    href: "/fire-calculator",
    title: "FIRE Calculator",
    description:
      "A simple way to understand Lean FIRE, Coast FIRE, Barista FIRE, and other paths without heavy jargon.",
  },
  {
    href: "/about",
    title: "About",
    description:
      "Why this project exists, and why life after enough deserves its own conversation.",
  },
];

const fiFlow = [
  "Dependence",
  "Stability",
  "Growth",
  "Independence",
  "Meaning",
  "Inner Freedom",
];

const enoughCards = [
  {
    title: "Before Enough",
    text: "The focus is earning, saving, investing, and building security.",
  },
  {
    title: "At Enough",
    text: "The focus shifts from survival to choice. You can work because you want to, not only because you must.",
  },
  {
    title: "After Enough",
    text: "The deeper work begins: meaning, contribution, simplicity, retreat, relationships, and inner freedom.",
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

      <section className="content-block fi-life-section">
        <p className="eyebrow">After financial independence</p>
        <h2>FI is the final stage of money. But not the final stage of life.</h2>
        <p>
          Money management has a natural journey: getting out of dependence,
          becoming stable, building wealth, and finally reaching financial
          independence. At that point, money is no longer the main problem. But
          a new question appears: now that I have enough, how should I live?
        </p>

        <ol className="fi-flow" aria-label="The journey from money management to inner freedom">
          {fiFlow.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        <p className="fi-helper-line">
          Most financial advice helps you reach independence. After Enough helps
          you live it.
        </p>

        <div className="enough-card-grid">
          {enoughCards.map((card) => (
            <article className="enough-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>

        <Link href="/start-here" className="hero-link fi-cta">
          <span>Start the After Enough journey</span>
          <span aria-hidden="true">→</span>
        </Link>

        <p className="fi-source">
          Inspired by J.D. Roth’s framing of financial independence as the final
          stage of money management.
        </p>
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
        <h2>Go a little deeper</h2>
        <p className="section-intro">
          Start with the path if you are new here. Then explore the pages that
          help you think about enough, life after FI, and what to do with
          freedom.
        </p>

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
