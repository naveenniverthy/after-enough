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
            This stage is about living with more reflection, contribution, and
            inward growth, instead of being driven only by achievement.
          </p>
          <p>
            When both financial pressure and mental noise reduce, something
            quieter becomes possible.
          </p>
          <p>
            Life is no longer only about achieving or optimizing. It begins to
            open into reflection, contribution, and a more natural way of
            living.
          </p>
          <p>
            Financial independence does not have to end in retirement. It can
            also create the possibility of a different relationship to work,
            time, and contribution.
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
          <h2>The Path</h2>
          <p>This is not a final stage, but an ongoing way of living.</p>
          <p>
            <Link className="button-link" href="/path">
              → View the full path
            </Link>{" "}
            <Link className="button-link button-link--quiet" href="/build-enough">
              → Start again
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
