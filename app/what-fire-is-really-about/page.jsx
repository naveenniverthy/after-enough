import Link from "next/link";

const freedomFrom = [
  {
    title: "Paid work as compulsion",
    text: "Many people are not trying to escape effort. They are trying to escape the feeling that every major life choice must be controlled by a paycheck.",
  },
  {
    title: "Consumer debt",
    text: "Debt can quietly reduce freedom. It narrows your choices and makes your future feel pre-spent.",
  },
  {
    title: "Materialism",
    text: "More consumption does not always create more satisfaction. Sometimes it only creates a bigger appetite.",
  },
  {
    title: "Consumerism",
    text: "Modern life keeps teaching us to want more, upgrade more, and spend more. FIRE pushes back against that script.",
  },
];

const freedomTo = [
  {
    title: "Work by choice",
    text: "The deeper promise of financial independence is not doing nothing. It is being able to work from interest, values, and choice, not pressure alone.",
  },
  {
    title: "More time for family and life",
    text: "Freedom is not only about leaving work. It is also about having more room for people, rest, health, reflection, and community.",
  },
  {
    title: "A more meaningful life",
    text: "Enough money can remove some obstacles. But what matters next is how you use that freedom to live more intentionally.",
  },
  {
    title: "Moderate consumption",
    text: "FIRE can invite a calmer relationship with money: spending with care, wanting less, and finding that less can still be enough.",
  },
  {
    title: "Financial well-being",
    text: "A buffer matters. Peace comes not only from net worth, but from knowing you can absorb surprises and still stand steady.",
  },
];

export const metadata = {
  title: "What FIRE Is Really About",
  description:
    "A simple look at FIRE as freedom from what drains life, and freedom to live with more choice, meaning, and enough.",
  alternates: {
    canonical: "/what-fire-is-really-about",
  },
};

export default function WhatFireIsReallyAboutPage() {
  return (
    <main className="essay-page">
      <section className="essay-hero">
        <p className="eyebrow">A simple lens</p>
        <h1>What FIRE is really about</h1>
        <p className="essay-intro">
          FIRE is often reduced to a math problem: save aggressively, invest
          consistently, and reach the number.
        </p>
        <p className="essay-intro">
          But underneath the math is a deeper longing. Most people are not only
          chasing early retirement. They are chasing freedom.
        </p>
        <p className="essay-intro">
          Not freedom as luxury. Freedom as breathing room. Freedom as choice.
          Freedom as a life that is less forced.
        </p>
      </section>

      <section className="essay-card">
        <p className="eyebrow">A better way to understand FIRE</p>
        <p className="closing-line" style={{ marginTop: "1rem", textAlign: "left" }}>
          FIRE is not only freedom from work. It is freedom from what drains
          life, and freedom to live with more intention.
        </p>
      </section>

      <section className="essay-card">
        <div className="grid-two">
          <div>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>
              Freedom from
            </p>
            <div className="stack">
              {freedomFrom.map((item) => (
                <article key={item.title} className="soft-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>

          <div>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>
              Freedom to
            </p>
            <div className="stack">
              {freedomTo.map((item) => (
                <article key={item.title} className="soft-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="essay-card">
        <h2>Where this connects with After Enough</h2>
        <p>
          This is where After Enough becomes more interesting than a standard
          FIRE blog.
        </p>
        <p>You are not only asking, “How much do I need?”</p>
        <p>
          You are also asking, “What kind of life becomes possible when money
          matters less?”
        </p>
      </section>

      <section className="essay-card">
        <h2>What this page is really saying</h2>
        <p>The point of FIRE is not simply to stop working early.</p>
        <p>
          The point is to reduce fear, reduce compulsion, reduce noise, and
          make room for a life that feels more chosen.
        </p>
        <p>
          In that sense, financial independence is not just about leaving
          something behind.
        </p>
        <blockquote className="essay-quote">
          It is about becoming available for a different way of living.
        </blockquote>
      </section>

      <section className="essay-card">
        <h2>Explore next</h2>
        <p>Pair this with your pages on enough, life after FI, and ikigai.</p>
        <p>
          <Link href="/how-much-is-enough" className="button-link button-link--quiet">
            How Much Is Enough
          </Link>{" "}
          <Link
            href="/life-after-financial-independence"
            className="button-link button-link--quiet"
          >
            Life After FI
          </Link>{" "}
          <Link href="/ikigai" className="button-link">
            Ikigai
          </Link>
        </p>
      </section>

      <section className="essay-card">
        <p>
          <Link href="/" className="button-link button-link--quiet">
            Back to home
          </Link>
        </p>
      </section>
    </main>
  );
}
