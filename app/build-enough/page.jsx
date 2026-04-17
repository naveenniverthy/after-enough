import Link from "next/link";
import PageIntro from "../../components/PageIntro";
import ExploreCard from "../../components/ExploreCard";
import { stageGroups } from "../home-stage-data";

export const metadata = {
  title: "Build Enough",
  description:
    "Build enough so money stops being a daily source of stress. This stage is about creating stability, margin, and a strong base.",
  alternates: {
    canonical: "/build-enough",
  },
};

const stage = stageGroups.find((item) => item.href === "/build-enough");
const firePaths = [
  {
    href: "/lean-fire",
    title: "Lean FIRE",
    description: "Reach enough sooner by needing less.",
  },
  {
    href: "/fat-fire",
    title: "Fat FIRE",
    description: "Keep more comfort and plan for a larger number.",
  },
  {
    href: "/coast-fire",
    title: "Coast FIRE",
    description: "Let your investments keep growing over time.",
  },
  {
    href: "/barista-fire",
    title: "Barista FIRE",
    description: "Step back partially instead of all at once.",
  },
];

export default function BuildEnoughPage() {
  return (
    <div className="container">
      <PageIntro
        eyebrow="Stage 1"
        title="Build Enough"
        intro="Build enough so money stops being a daily source of stress. This stage is about creating stability, margin, and a strong base."
      />

      <div className="stack">
        <section className="panel prose">
          <p>
            Build enough so money stops being a daily source of stress. This
            stage is about creating stability, margin, and a strong base.
          </p>
          <p>
            Most people spend years chasing a number without ever questioning
            what it represents. They assume more income automatically leads to
            more security. But beyond a point, the relationship becomes weaker.
          </p>
          <p>
            Building enough is about understanding that point. It is where your
            basic needs are covered, your future is reasonably secure, and your
            life is not driven by constant financial pressure.
          </p>
          <p>
            The goal is not only to stop working early. It is to reach a point
            where work is no longer the sole condition for security.
          </p>
        </section>

        <section className="panel prose">
          <h2>What this means</h2>
          <p>
            Building enough is not about endless accumulation. It is about
            covering needs, reducing dependency, and gaining breathing room.
          </p>
          <p>
            Budgeting, saving, investing, improving financial literacy, and
            creating extra income are not ends in themselves. They are tools
            that help you build a steadier relationship with money and a more
            workable kind of freedom.
          </p>

          <h2>What helps</h2>
          <ul>
            <li>Define your monthly enough number</li>
            <li>Build emergency savings</li>
            <li>Reduce high fixed expenses</li>
            <li>Start simple long-term investing</li>
          </ul>

          <h2>A practical middle step</h2>
          <p>
            You do not have to wait until you are completely free to change
            your life.
          </p>
          <p>
            Many people reach a point where their savings can support a part of
            their expenses. At that point, it becomes possible to step away
            from full-time pressure, even if you are not fully financially
            independent.
          </p>
          <p>
            This could mean working fewer hours, choosing lower-pressure roles,
            or doing work that covers only part of your needs.
          </p>
          <p>
            This stage creates space earlier than expected. It is not about
            escaping work, but about changing your relationship with it.
          </p>
          <ul>
            <li>Move from full-time intensity to part-time stability</li>
            <li>Let investments and lighter work share the load</li>
            <li>Trade speed of accumulation for quality of life</li>
            <li>Create space before complete independence</li>
          </ul>
          <p>You may already be closer to this than you think.</p>

          <h2>Enough depends on how you live</h2>
          <p>
            The amount you need is not fixed. It depends on the life you choose
            to live.
          </p>
          <p>
            A simpler life requires less money. A more comfortable life
            requires more. This is not about deprivation. It is about clarity.
          </p>
          <p>
            When you see this clearly, you realize that freedom is not only
            about earning more. It is also about needing less.
          </p>
          <p>
            Many people assume they must reach a large number before they can
            step back. But in reality, the number changes when the life
            changes.
          </p>
          <ul>
            <li>A lower cost lifestyle reduces the amount you need</li>
            <li>Simplicity can bring freedom earlier</li>
            <li>Comfort and freedom often move in different directions</li>
            <li>The goal is not minimalism, but conscious choice</li>
          </ul>
          <p>
            The fastest way to enough is not always to earn more, but to need
            less.
          </p>
        </section>

        <section className="panel prose">
          <h2>What often goes unnoticed</h2>
          <p>
            Many people continue to operate from scarcity even after they have
            crossed the point of sufficiency.
          </p>
          <p>
            They keep optimizing, comparing, and pushing for more, not because
            they need it, but because it has become a habit.
          </p>
          <p>
            Seeing this clearly is part of building enough. Otherwise, the
            number keeps moving.
          </p>
        </section>

        <section className="panel prose">
          <h2>Different ways people reach enough</h2>
          <p>
            There is no single way to reach financial independence. What you
            need depends on how you choose to live.
          </p>
          <p>
            Some people reach enough by needing less. Others prefer more
            comfort and take longer. Some step back partially instead of fully.
            These are not different goals. They are different ways of arriving
            at the same place.
          </p>
          <ul>
            <li>A simpler life can bring freedom earlier</li>
            <li>A more comfortable life requires more time and savings</li>
            <li>Some people step back partially instead of fully</li>
            <li>Others let investments grow while continuing to work</li>
          </ul>

          <div className="explore-grid">
            {firePaths.map((item) => (
              <ExploreCard
                key={item.href}
                href={item.href}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
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
            Once you have built enough, the next step is not more accumulation,
            but simplification.
          </p>
          <p>
            <Link className="button-link" href="/lighten-the-mind">
              → Continue to Lighten the Mind
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
