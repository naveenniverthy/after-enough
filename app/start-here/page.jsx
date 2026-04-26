import Link from "next/link";
import PageIntro from "../../components/PageIntro";
import ExploreCard from "../../components/ExploreCard";

export const metadata = {
  title: "Why Financial Freedom Is Not Enough",
  description:
    "A practical reflection on why money solves some problems but does not prepare us for freedom, stillness, or the second half of life.",
  alternates: {
    canonical: "/start-here",
  },
};

const startHereCards = [
  {
    href: "/life-after-fi-stages",
    title: "The stages after enough",
    description:
      "What actually happens after you reach financial independence.",
  },
];

export default function StartHerePage() {
  return (
    <div className="container">
      <PageIntro
        eyebrow="Start here"
        title="Why financial freedom is not enough"
        intro="Financial independence can remove pressure, but it does not answer the deeper question of how to live once pressure is gone."
      />

      <div className="prose">
        <p>
          Money matters. It can reduce strain, widen choice, and create room to
          breathe. It can solve real problems. But even when those problems are
          handled, many people discover that a quieter question remains: now
          what should life become?
        </p>

        <p>
          We are taught how to build careers, manage portfolios, and reach
          milestones. We are rarely taught how to use freedom well. When the
          structure of deadlines, goals, and external rewards begins to loosen,
          a person can feel unexpectedly unsettled.
        </p>

        <p>
          Time without direction does not always feel peaceful. It can become a
          new form of restlessness. The habit of doing can continue long after
          the need has passed, and the mind may keep searching for urgency even
          when life no longer requires it.
        </p>

        <p>
          This is one reason retirement is not the same as inward readiness. A
          calendar can clear. An inbox can shrink. A balance sheet can improve.
          None of that guarantees simplicity, steadiness, or a meaningful inner
          life.
        </p>

        <p>
          The second half of life asks for a different kind of preparation. It
          asks us to look at dependency, identity, pace, and purpose. It asks
          whether we want to keep repeating the same patterns with more leisure,
          or whether we want to grow into a different mode of living.
        </p>

        <p>
          A helpful traditional idea for this transition is Vanaprastha, often
          described as a stage of gradually stepping back from constant worldly
          involvement and turning toward reflection. In a modern context, this
          does not mean abandoning family or disappearing into a forest. It
          means loosening excess, reducing inner noise, and making space for a
          more conscious life.
        </p>

        <p>
          That transition can include simplifying commitments, spending time in
          retreat, learning how to be alone without feeling empty, studying
          deeply, and discovering forms of contribution that are less driven by
          status. The shift is both practical and inward.
        </p>

        <p>
          After Enough exists to support that preparation. It is a bridge for
          people who sense that life after financial striving needs more than a
          withdrawal plan. It needs attention, honesty, and a new relationship
          with time.
        </p>

        <div className="explore-grid">
          {startHereCards.map((item) => (
            <ExploreCard
              key={item.href}
              href={item.href}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>

        <p>
          <Link className="button-link" href="/path">
            Continue to the path
          </Link>
        </p>
      </div>
    </div>
  );
}
