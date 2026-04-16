import RetreatFilters from "./RetreatFilters";
import { retreatCategories, retreats } from "./data";

export const metadata = {
  title: "Retreats",
  description:
    "A quiet guide to choosing retreats with more clarity, honesty, and fit for your stage of life.",
  alternates: {
    canonical: "/retreats",
  },
};

const retreatTypes = [
  {
    title: "Light",
    text: "Short stays, simple quiet, basic reflection, and gentle exposure. Good when you need space but are not ready for deep structure.",
  },
  {
    title: "Moderate",
    text: "Structured retreats with teaching, routine, and some discipline. Useful for thoughtful householders and sincere seekers who want support without overload.",
  },
  {
    title: "Deep",
    text: "Silent retreats or traditional ashram settings built around disciplined practice, inquiry, or inner reorientation. Better entered with seriousness.",
  },
];

const choosePoints = [
  "Clarity of purpose — is the retreat clear about what it offers?",
  "Depth — is it mainly rest, or real inquiry?",
  "Structure — is there a meaningful rhythm to the day?",
  "Teacher quality — is there authenticity, seriousness, or lineage?",
  "Environment — does the place support quiet and simplicity?",
  "Integration value — will something remain with you after you return home?",
];

const startHere = [
  {
    title: "I feel tired and need rest",
    text: "Look first at quiet, simple, lower-pressure retreats that give you space without demanding too much.",
  },
  {
    title: "I want to improve my health",
    text: "Yoga, Ayurveda, and body-mind oriented retreats may be a better fit than more inward or silent settings.",
  },
  {
    title: "I am curious about meditation",
    text: "Begin with guided retreat formats rather than choosing the most intense option too early.",
  },
  {
    title: "I am seriously seeking clarity",
    text: "Traditional ashrams and teaching-centered retreats may be more meaningful than experience-led programs.",
  },
];

const selfQuestions = [
  "What do I truly need right now: rest, discipline, inquiry, devotion, simplicity, or reorientation?",
  "What kind of support am I looking for: silence, teaching, access to a teacher, or a devotional atmosphere?",
  "How much structure am I honestly ready for: gentle, moderate, or rigorous?",
  "What kind of path am I drawn to: Vedanta, meditation, yoga, bhakti, or open exploration?",
  "Where am I in my journey: beginner, householder, serious seeker, or someone entering a simpler stage of life?",
];

export default function RetreatsPage() {
  return (
    <main className="page">
      <section className="hero retreats-essay-hero">
        <p className="eyebrow">Retreats</p>
        <h1>Choose with clarity</h1>
        <p className="lead">
          A retreat can help. But not every retreat is right for every person.
        </p>
      </section>

      <section className="essay-card">
        <p>
          Some retreats offer silence. Some offer teaching. Some offer devotion.
          Some offer structure. Some offer atmosphere without much depth.
        </p>

        <p>
          This page is not meant to create excitement. It is meant to help you
          choose with more seriousness, honesty, and inward clarity.
        </p>

        <p>
          Not all retreats are the same. And not every retreat is right for you
          at every stage.
        </p>

        <p>
          Some are for rest. Some are for healing. Some are for deep inquiry.
        </p>

        <p>
          Before choosing a retreat, it helps to first understand what you are
          really looking for.
        </p>
      </section>

      <section className="essay-card">
        <h2>Start here</h2>
        <div className="stack-grid">
          {startHere.map((item) => (
            <div key={item.title} className="soft-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="essay-card">
        <h2>How to choose a retreat</h2>
        <div className="simple-list">
          {choosePoints.map((point) => (
            <p key={point}>{point}</p>
          ))}
        </div>
      </section>

      <section className="essay-card">
        <h2>Types of retreats</h2>
        <div className="stack-grid">
          {retreatTypes.map((item) => (
            <div key={item.title} className="soft-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="essay-card">
        <h2>Self-assessment</h2>
        <p>Before choosing a retreat, ask what you really need.</p>
        <p>
          The real question is not, “Which retreat is famous?” The real question
          is, “What is right for me at this point in life?”
        </p>

        <div className="simple-list">
          {selfQuestions.map((question) => (
            <p key={question}>{question}</p>
          ))}
        </div>

        <div className="callout">
          <h3>The most important question</h3>
          <p>
            Am I going for truth, quietness, and clarity — or am I going for
            mood, identity, belonging, escape, or spiritual excitement?
          </p>
        </div>
      </section>

      <section className="essay-card">
        <h2>Expectation reset</h2>
        <p>A retreat will not fix your life.</p>
        <p>
          At best, it can give you space to step back, observe, and see more
          clearly.
        </p>
        <p>
          What you do with that clarity matters more than the retreat itself.
        </p>
      </section>

      <section className="essay-card">
        <h2>Retreat repository</h2>
        <p>
          This is the practical part of the page.
        </p>
        <p>
          Use the repository below to browse retreats by fit, not by hype.
        </p>
        <p>
          Start with honesty. Then narrow by tradition, depth, structure,
          location, cost, and the kind of support you are actually seeking.
        </p>
      </section>

      <section className="essay-card">
        <p className="repository-intro">
          Browse quietly. Start with fit, not excitement.
        </p>
        <RetreatFilters retreats={retreats} categories={retreatCategories} />
      </section>

      <section className="essay-card">
        <h2>How to use the repository well</h2>
        <div className="simple-list">
          <p>Do not begin with branding. Begin with fit.</p>
          <p>Do not assume the most intense retreat is the most useful.</p>
          <p>Do not confuse atmosphere with depth.</p>
          <p>Do not go beyond what your body, mind, and life stage can hold.</p>
          <p>
            When in doubt, choose honesty over ambition and seriousness over
            projection.
          </p>
        </div>
      </section>

      <section className="essay-card">
        <h2>Nature, trekking, and other reset experiences</h2>

        <p>Not every meaningful step away begins with a traditional retreat.</p>

        <p>
          For some people, time in nature is the first doorway. Mountains,
          walking, physical effort, and distance from routine can create space,
          quiet, and perspective.
        </p>

        <p>
          We treat these as reset experiences rather than as spiritual retreats
          in the traditional sense.
        </p>
      </section>

      <section className="essay-card">
        <h2>A quiet closing note</h2>
        <p>You do not need to rush into a deep retreat.</p>
        <p>Start where you are.</p>
        <p>
          Even a few days of real quiet can begin to show you something
          important.
        </p>
      </section>
    </main>
  );
}
