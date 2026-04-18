import Link from "next/link";
import PageIntro from "../../components/PageIntro";
import ExploreCard from "../../components/ExploreCard";
import { stageGroups } from "../home-stage-data";

export const metadata = {
  title: "Live Differently",
  description:
    "This stage is about living with more reflection, contribution, and inward growth, instead of being driven only by achievement.",
  alternates: {
    canonical: "/live-differently",
  },
};

const stage = stageGroups.find((item) => item.href === "/live-differently");
const relatedLinks = stage.links.map((item) =>
  item.href === "/about"
    ? {
        href: "/retreats",
        title: "Explore Retreats",
        description: "Find spaces for reflection, silence, and inner reset.",
      }
    : item
);

export default function LiveDifferentlyPage() {
  return (
    <div className="container">
      <PageIntro
        eyebrow="Stage 3"
        title="Live Differently"
        intro="This stage is about living with more reflection, contribution, and inward growth, instead of being driven only by achievement."
      />

      <div className="stack">
        <section className="panel prose">
          <p>
            Live Differently is the stage where freedom becomes a way of life
            rather than a financial milestone.
          </p>
          <p>
            It is not mainly about leaving work. It is about changing your
            relationship with time, ambition, contribution, and inner growth.
          </p>
        </section>

        <section className="panel prose">
          <h2>What this means</h2>
          <p>
            Life begins to shift from chasing more to living more consciously.
            Success becomes deeper, quieter, and more human.
          </p>

          <h2>What helps</h2>
          <ul>
            <li>Reconnect with contribution</li>
            <li>Make room for contemplation</li>
            <li>Choose rhythm over rush</li>
            <li>Let growth include inner life</li>
          </ul>
        </section>

        <section className="panel prose">
          <h2>What changes here</h2>
          <p>The change is not always visible from the outside.</p>
          <p>
            You may still work, build, or contribute. The difference is that
            action is no longer driven only by pressure. There is less urgency,
            less comparison, and less need to prove anything.
          </p>
          <p>
            What remains is a steadier, more intentional way of living.
          </p>
        </section>

        <section className="panel">
          <h2 className="section-heading">{stage.relatedHeading}</h2>
          <div className="explore-grid">
            {relatedLinks.map((item) => (
              <ExploreCard
                key={item.href}
                href={item.href}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>

        <section className="panel prose">
          <h2>Keep exploring</h2>
          <p>
            From here, you may want to explore Ikigai, retreat options, or the
            practical question of what comes after financial independence.
          </p>
          <p>
            <Link className="button-link button-link--quiet" href="/ikigai">
              Ikigai
            </Link>{" "}
            <Link className="button-link" href="/life-after-financial-independence">
              Life After FI
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
