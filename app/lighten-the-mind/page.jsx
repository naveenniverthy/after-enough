import Link from "next/link";
import PageIntro from "../../components/PageIntro";
import ExploreCard from "../../components/ExploreCard";
import { stageGroups } from "../home-stage-data";

export const metadata = {
  title: "Lighten the Mind",
  description:
    "Once survival pressure reduces, the mind still carries stress, comparison, and restlessness. This stage is about simplifying inwardly.",
  alternates: {
    canonical: "/lighten-the-mind",
  },
};

const stage = stageGroups.find((item) => item.href === "/lighten-the-mind");

export default function LightenTheMindPage() {
  return (
    <div className="container">
      <PageIntro
        eyebrow="Stage 2"
        title="Lighten the Mind"
        intro="Once survival pressure reduces, the mind still carries stress, comparison, and restlessness. This stage is about simplifying inwardly."
      />

      <div className="stack">
        <section className="panel prose">
          <p>
            Once survival pressure reduces, the mind still carries stress,
            comparison, and restlessness. This stage is about simplifying
            inwardly.
          </p>
          <p>
            Even when money pressure reduces, the mind does not automatically
            become quiet. It continues to seek stimulation, validation, and
            movement.
          </p>
          <p>
            This stage is about recognizing that the weight we carry is not
            only external. Much of it comes from habits of thinking, reacting,
            and constantly engaging with more than we need.
          </p>
        </section>

        <section className="panel prose">
          <h2>What this means</h2>
          <p>
            A lighter life is not only fewer expenses. It is less inner
            pressure, less noise, and more clarity about what really matters.
          </p>

          <h2>What helps</h2>
          <ul>
            <li>Reduce unnecessary consumption</li>
            <li>Notice status-driven habits</li>
            <li>Make space for silence and reflection</li>
            <li>Understand what still drives you</li>
          </ul>
        </section>

        <section className="panel prose">
          <h2>Why this stage matters</h2>
          <p>
            Without lightening the mind, more freedom can simply create more
            restlessness.
          </p>
          <p>
            Instead of clarity, there is more distraction. Instead of ease,
            there is more choice without direction.
          </p>
          <p>This stage helps convert outer freedom into inner space.</p>
        </section>

        <section className="panel">
          <h2 className="section-heading">{stage.relatedHeading}</h2>
          <div className="explore-grid">
            {stage.links.map((item) => (
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
          <h2>Next</h2>
          <p>
            As the mind becomes lighter, life can begin to move in a different
            direction.
          </p>
          <p>
            <Link className="button-link" href="/live-differently">
              → Continue to Live Differently
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
