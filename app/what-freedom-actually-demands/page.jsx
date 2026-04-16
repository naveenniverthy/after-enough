export const metadata = {
  title: {
    absolute: "What Freedom Actually Demands | After Enough",
  },
  description:
    "A simple reflection on the hidden trade-offs of financial freedom: identity, structure, certainty, and the challenge of learning how to live well after enough.",
  alternates: {
    canonical: "/what-freedom-actually-demands",
  },
};

const sacrifices = [
  "More money",
  "Career status",
  "Feeling needed",
  "A clear scoreboard",
  "Built-in structure",
  "Social approval",
  "Certainty",
  "Lifestyle upgrades",
  "Achievement as identity",
  "The future you were supposed to want",
];

const realities = [
  "Freedom does not automatically tell you how to live.",
  "Retirement is not a permanent vacation. Many days are ordinary Tuesdays.",
  "Hobbies alone do not always create meaning.",
  "A blank calendar can feel exciting at first, then disorienting.",
  "Slowing down takes time. Many people need months to adjust.",
  "Without work, deeper questions become harder to avoid.",
];

const hiddenChallenges = [
  "Loss of identity",
  "Relationship friction",
  "Loneliness",
  "Fear of spending",
  "The temptation to work one more year",
  "Feeling less relevant",
  "Trying to stay busy instead of becoming inwardly settled",
];

const whatMatters = [
  {
    title: "Rhythm",
    text: "Not a rigid schedule, but a humane structure for your days.",
  },
  {
    title: "Relationships",
    text: "Time with people without hurry, performance, or agenda.",
  },
  {
    title: "Usefulness",
    text: "Not necessarily through a title, but through service, presence, and contribution.",
  },
  {
    title: "Inner steadiness",
    text: "The ability to be at ease even when no one is measuring you.",
  },
];

export default function WhatFreedomActuallyDemandsPage() {
  return (
    <main className="essay-page">
      <section className="essay-hero">
        <p className="eyebrow">Life after enough</p>
        <h1>What freedom actually demands</h1>
        <p className="essay-intro">
          Many people imagine financial freedom as pure gain: more time, more
          ease, more choice. That is partly true. But freedom is not only a
          gain. It is also a loss.
        </p>
        <p className="essay-intro">
          When work stops being the center of life, you do not just walk away
          from a paycheck. You also walk away from structure, status, rhythm,
          and a familiar way of measuring yourself.
        </p>
      </section>

      <section className="essay-card">
        <p>
          This is the part many people do not prepare for. They prepare the
          spreadsheet. They prepare the investment plan. They prepare the
          withdrawal rate. But they do not always prepare for the inner
          transition.
        </p>
        <p>And that transition may be the more important one.</p>
        <blockquote className="essay-quote">
          When money stops being the problem, something deeper becomes the
          question.
        </blockquote>
        <p>
          The deeper question is simple, but not easy:{" "}
          <strong>
            How will you live when you no longer have to prove yourself through
            work?
          </strong>
        </p>
      </section>

      <section className="essay-card">
        <h2>The hidden trade-offs of freedom</h2>
        <p>
          Freedom sounds like release. And it is. But it also asks you to let
          go of things that once gave shape to your life. Some are obvious.
          Some are surprisingly hard to leave behind.
        </p>

        <div className="grid-two">
          {sacrifices.map((item) => (
            <article className="soft-card" key={item}>
              <p>{item}</p>
            </article>
          ))}
        </div>

        <p>
          None of these are necessarily bad in themselves. Money, achievement,
          structure, and recognition all have their place. The difficulty is
          that many people discover, only after stepping away, how much of
          their inner stability depended on them.
        </p>
      </section>

      <section className="essay-card">
        <h2>Freedom creates space, and space can feel uncomfortable</h2>
        <p>
          People often say they want more freedom, but what they really want is
          a more pleasant version of the life they already understand. True
          freedom is different. It removes familiar pressures, but it also
          removes familiar scaffolding.
        </p>
        <p>
          Suddenly, nobody is setting the goals. Nobody is waiting for the next
          report. Nobody is giving you a title, a promotion, or a scoreboard.
        </p>
        <p>That can feel peaceful. It can also feel strangely empty.</p>

        <ul className="essay-list">
          {realities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p>
          This is why so many people say the transition takes longer than they
          expected. It is not only about stopping work. It is about learning
          how to inhabit open time without anxiety, guilt, or the constant need
          to optimize every hour.
        </p>
      </section>

      <section className="essay-card">
        <h2>What often shows up after the noise goes away</h2>
        <p>
          Once the professional structure falls away, deeper human issues
          become more visible. Work had been covering them, distracting from
          them, or giving them a temporary shape.
        </p>

        <div className="simple-list">
          {hiddenChallenges.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>

        <p>
          This does not mean retirement or financial freedom is a mistake. It
          means the transition is human. It exposes things that were already
          there.
        </p>
        <p>
          A person who does not know how to rest will carry that restlessness
          into retirement. A person who only felt valuable when producing will
          need time to discover another basis for worth.
        </p>
      </section>

      <section className="essay-card">
        <h2>The deeper shift</h2>
        <p>
          The real transition is not from work to leisure. It is from
          <strong> achievement to presence</strong>.
        </p>
        <p>
          This may be the most meaningful invitation hidden inside financial
          freedom. You begin to ask different questions.
        </p>
        <p>
          Not &ldquo;What is the next milestone?&rdquo; but &ldquo;What is a
          good day?&rdquo; Not &ldquo;How do I stay impressive?&rdquo; but
          &ldquo;How do I become more present, more alive, more available to
          the people around me?&rdquo;
        </p>
        <p>
          In that sense, life after enough is not mainly about leaving work. It
          is about learning to live without making work your main source of
          identity.
        </p>
      </section>

      <section className="essay-card">
        <h2>What seems to matter more on the other side</h2>
        <div className="grid-two">
          {whatMatters.map((item) => (
            <article className="soft-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="essay-card">
        <h2>Before you chase freedom</h2>
        <p>
          It helps to ask a more honest question. Not only,{" "}
          <em>&ldquo;Can I afford to stop?&rdquo;</em> but also,{" "}
          <em>&ldquo;Do I know how to live when I stop?&rdquo;</em>
        </p>
        <p>
          If the answer is not fully clear yet, that is not failure. It is the
          beginning of the real work. Freedom does not remove the need for
          self-understanding. It increases it.
        </p>
        <p>
          And perhaps that is the quiet truth: after enough, the next task is
          not accumulation. It is orientation.
        </p>
      </section>
    </main>
  );
}
