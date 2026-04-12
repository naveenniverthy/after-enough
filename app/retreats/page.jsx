import HealthRetreats from "./HealthRetreats";
import RetreatAssessment from "./RetreatAssessment";
import RetreatFilters from "./RetreatFilters";
import {
  ayurvedaRetreats,
  retreatAssessmentQuestions,
  retreatCategories,
  retreats,
} from "./data";

export const metadata = {
  title: "Retreats | Choose with Clarity",
  description:
    "A calm framework for choosing retreats in India with more clarity, seriousness, and honesty.",
};

const discernmentPoints = [
  {
    title: "Clarity of purpose",
    text: "A good retreat says clearly what it is for. It does not hide behind vague spiritual language.",
  },
  {
    title: "Teaching depth",
    text: "Look for a real method, real seriousness, and a tradition or discipline that can be understood.",
  },
  {
    title: "Commercial pressure",
    text: "The more a retreat depends on emotional marketing, exclusivity, or upselling, the more carefully it should be examined.",
  },
  {
    title: "Silence or stimulation",
    text: "Some places quiet the mind. Others simply replace one kind of noise with another.",
  },
  {
    title: "Fit for your life stage",
    text: "Not every sincere person needs the same thing. A beginner, a householder, and someone entering vanaprastha may need very different settings.",
  },
  {
    title: "Integration value",
    text: "Ask whether the retreat gives something that can remain with you once you return home.",
  },
];

export default function RetreatsPage() {
  return (
    <main className="container retreats-page">
      <section className="retreats-hero">
        <p className="eyebrow">Retreats</p>
        <h1>India offers many spiritual places. Discernment matters.</h1>
        <p className="retreats-hero-copy">
          A retreat can help. But not every retreat is right for every seeker.
          Some offer silence. Some offer teaching. Some offer devotion. Some
          offer structure. Some offer atmosphere without much depth.
        </p>
        <p className="retreats-hero-copy">
          This page is not meant to create excitement. It is meant to help you
          choose with more seriousness, honesty, and inward clarity.
        </p>
      </section>

      <section className="retreats-discernment-grid">
        {discernmentPoints.map((item) => (
          <article key={item.title} className="panel retreats-discernment-card">
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>

      <section className="panel retreats-section-block retreats-section-block--soft">
        <div className="retreats-section-intro">
          <p className="retreat-kicker">Self-assessment</p>
          <h2>Before choosing a retreat, ask what you really need.</h2>
          <p>
            The real question is not, “Which retreat is famous?” The real
            question is, “What is right for me at this point in life?”
          </p>
        </div>

        <RetreatAssessment questions={retreatAssessmentQuestions} />

        <div className="retreats-key-question">
          <h3>The most important question</h3>
          <p>
            Am I going for truth, quietness, and clarity — or am I going for
            mood, identity, belonging, escape, or spiritual excitement?
          </p>
        </div>
      </section>

      <section className="retreats-section-block">
        <div className="retreats-section-intro">
          <p className="retreat-kicker">Repository</p>
          <h2>A simple retreat repository</h2>
          <p>
            This is not meant to be a spiritual marketplace. It is a quiet
            starting point. Each entry includes not only why someone may choose
            it, but also why someone may not.
          </p>
        </div>

        <div className="retreats-repository">
          <RetreatFilters retreats={retreats} categories={retreatCategories} />
        </div>
      </section>

      <section className="mt-24">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            Ayurveda & Health
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-neutral-900">
            Some retreats are for healing, not inquiry.
          </h2>
          <p className="mt-4 text-neutral-700 leading-8">
            Not every retreat serves the same need. Some help with clarity.
            Others help with recovery, stress, and physical balance.
          </p>
        </div>

        <div className="mt-10">
          <HealthRetreats retreats={ayurvedaRetreats} />
        </div>
      </section>

      <section className="panel retreats-section-block retreats-caution-block">
        <div className="retreats-section-intro">
          <p className="retreat-kicker">A quiet caution</p>
          <h2>A retreat is not a substitute for sincerity.</h2>
          <p>
            A different place can help. Simplicity can help. Silence can help.
            A teacher can help. But no place can remove confusion by itself.
          </p>
          <p>
            The best retreat is not always the most intense or the most
            impressive. Sometimes it is simply the one that meets you honestly,
            steadies the mind, and leaves you more inwardly available for what
            is true.
          </p>
        </div>
      </section>
    </main>
  );
}
