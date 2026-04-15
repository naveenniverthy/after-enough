export const metadata = {
  title: "The Stages of Enough | After Enough",
  description:
    "A simple way to understand how your relationship with money evolves and why purpose becomes the real question after financial independence.",
};

const stages = [
  {
    title: "Dependence",
    text: "You rely fully on your income to live. Work is not a choice. It is a necessity. Life often feels tight and uncertain.",
  },
  {
    title: "Stability",
    text: "You can handle small disruptions. There is some breathing room. But work is still central to survival.",
  },
  {
    title: "Flexibility",
    text: "You begin to have options. You can make better choices about work, time, and lifestyle. Pressure starts to reduce.",
  },
  {
    title: "Independence",
    text: "Your expenses are covered without active work. The pressure to earn drops significantly. For the first time, you can step back.",
  },
  {
    title: "After Enough",
    text: "Now a deeper question appears. Not how to earn, but how to live. This is where meaning, clarity, and direction become central.",
  },
];

export default function StagesOfEnoughPage() {
  return (
    <main className="essay-page">
      <section className="essay-hero">
        <p className="eyebrow">Understanding the journey</p>
        <h1>The stages of enough</h1>
        <p className="essay-intro">
          Financial independence is not a single moment. It is a gradual shift
          in how money shapes your life.
        </p>
        <p className="essay-intro">
          As dependence reduces, something else quietly becomes more important:
          how you choose to live.
        </p>
      </section>

      <section className="essay-card">
        <p>
          Most people think in two phases: before freedom and after freedom.
        </p>
        <p>
          But real life is more gradual. Stress does not disappear in one
          moment. It reduces step by step.
        </p>
        <p>And as it reduces, a new challenge appears.</p>
        <blockquote className="essay-quote">
          What do you do when money is no longer the main problem?
        </blockquote>
      </section>

      <section className="essay-card">
        <h2>The progression</h2>

        <div className="grid-two">
          {stages.map((stage) => (
            <article key={stage.title} className="soft-card">
              <h3>{stage.title}</h3>
              <p>{stage.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="essay-card">
        <h2>What changes along the way</h2>
        <p>
          In the early stages, money is about survival. It reduces fear and
          gives stability.
        </p>
        <p>
          In the later stages, money does something more subtle. It removes
          pressure.
        </p>
        <p>And when pressure reduces, something deeper becomes visible:</p>
        <blockquote className="essay-quote">
          You now have the space to ask what really matters.
        </blockquote>
        <p>
          This is where many people feel lost. Not because they lack money, but
          because they have not yet explored how to live without constant
          pressure.
        </p>
      </section>

      <section className="essay-card">
        <h2>Where ikigai fits</h2>
        <p>
          Ikigai is often described as a reason to wake up in the morning.
        </p>
        <p>
          It is not something you find only after financial independence. But
          it becomes much harder to ignore once you have it.
        </p>
        <p>
          Before enough, there is always an excuse: lack of time, lack of
          money, lack of security.
        </p>
        <p>After enough, those excuses begin to fall away.</p>
        <blockquote className="essay-quote">
          Freedom does not give you purpose. It makes the absence of purpose
          visible.
        </blockquote>
      </section>

      <section className="essay-card">
        <h2>A simple way to look at it</h2>
        <p>The role of money is not just to increase comfort.</p>
        <p>It is to reduce pressure enough so that you can see clearly.</p>
        <p>What you do with that clarity, that is the real work.</p>
      </section>

      <section className="essay-card">
        <h2>The real transition</h2>
        <p>Financial independence is not the end of the journey.</p>
        <p>
          It is the beginning of a different kind of life, one where external
          pressure reduces, and internal clarity becomes more important.
        </p>
        <blockquote className="essay-quote">
          Financial independence removes the noise. Now you can finally hear
          your life.
        </blockquote>
      </section>
    </main>
  );
}
