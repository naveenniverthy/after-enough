import Link from "next/link";

export const metadata = {
  title: "The Stages After Enough",
  description:
    "A simple reflection on the stages people may move through after reaching financial independence.",
  alternates: {
    canonical: "/life-after-fi-stages",
  },
};

const stages = [
  {
    title: "Relief",
    text: "For the first time, money is no longer the main concern. There is space. There is breathing room.",
  },
  {
    title: "Disorientation",
    text: "Without work, structure fades. Days feel open. What once gave direction is no longer there.",
  },
  {
    title: "Exploration",
    text: "You begin trying different ways of living: new routines, interests, and rhythms.",
  },
  {
    title: "Meaning",
    text: "The question shifts from “what can I do?” to “what actually matters?”",
  },
  {
    title: "Freedom",
    text: "Life becomes simpler. Lighter. More intentional. Not driven by pressure, but guided by clarity.",
  },
];

export default function LifeAfterFiStagesPage() {
  return (
    <main className="essay-page">
      <section className="essay-hero">
        <p className="eyebrow">Life after enough</p>
        <h1>The Stages After Enough</h1>
        <p className="essay-intro">
          Reaching financial independence solves one problem: money. But it
          does not immediately answer a deeper question: how to live when you no
          longer have to work. What follows is not a single moment of freedom,
          but a gradual transition.
        </p>
      </section>

      <section className="stage-flow" aria-label="Stages after enough">
        {stages.map((stage, index) => (
          <article className="stage-flow-item" key={stage.title}>
            <div className="stage-flow-marker" aria-hidden="true">
              {index + 1}
            </div>
            <div className="essay-card stage-flow-card">
              <h2>{stage.title}</h2>
              <p>{stage.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="essay-card callout">
        <p>
          After enough, the journey continues.
          <br />
          Not toward more money, but toward a way of living that feels right.
        </p>
        <p>
          <Link className="button-link" href="/start-here">
            Start Here
          </Link>
        </p>
      </section>
    </main>
  );
}
