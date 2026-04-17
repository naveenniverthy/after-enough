import Link from "next/link";

const pillars = [
  {
    title: "Money matters",
    text: "Income, savings, assets, and steady work still matter. Financial independence is not imaginary. It needs a real base.",
  },
  {
    title: "Behavior matters",
    text: "Knowing how to manage money, delay mistakes, and make practical decisions changes how independent a person actually feels.",
  },
  {
    title: "Mindset matters",
    text: "Confidence, self-trust, and problem-solving ability shape whether someone feels capable of standing on their own feet.",
  },
  {
    title: "Dependence can be hidden",
    text: "A person can look successful on paper and still depend too heavily on rescue, support, or borrowed stability from others.",
  },
];

const contrasts = [
  {
    left: "A high income",
    right: "can still come with poor money habits.",
  },
  {
    left: "A good salary",
    right: "does not automatically create confidence.",
  },
  {
    left: "Family support",
    right: "can help, but it can also delay real independence.",
  },
  {
    left: "Financial independence",
    right: "is partly about money and partly about capability.",
  },
];

export const metadata = {
  title: "Financial Independence Is More Than Income",
  description:
    "A simple reflection on why financial independence is not only about income, but also about confidence, judgment, and the ability to manage life well.",
  alternates: {
    canonical: "/financial-independence-is-more-than-income",
  },
};

export default function FinancialIndependenceMoreThanIncomePage() {
  return (
    <main className="essay-page">
      <section className="essay-hero">
        <p className="eyebrow">Research, simplified</p>
        <h1>Financial independence is more than income</h1>
        <p className="essay-intro">
          We often talk as if financial independence is just a number. Earn
          more. Save more. Invest more. Reach the target.
        </p>
        <p className="essay-intro">
          But real independence is deeper than that. It is not only about how
          much money comes in. It is also about whether you can manage money
          wisely, make sound decisions, solve everyday problems, and trust
          yourself to handle life without constant rescue.
        </p>
        <p className="essay-intro">
          In simple terms: money supports independence, but capability
          completes it.
        </p>
      </section>

      <section className="essay-card">
        <p className="eyebrow">The central idea</p>
        <p className="closing-line" style={{ marginTop: "1rem", textAlign: "left" }}>
          Financial independence is not only built through earnings and assets.
          It is also built through self-belief, judgment, and the ability to
          manage life well.
        </p>
      </section>

      <section className="essay-card">
        <div className="grid-two">
          {pillars.map((item) => (
            <article key={item.title} className="soft-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="essay-card">
        <h2>What this means in real life</h2>
        <div className="simple-list" style={{ marginTop: "1.25rem" }}>
          {contrasts.map((item) => (
            <p key={item.left}>
              <strong>{item.left}</strong> {item.right}
            </p>
          ))}
        </div>
      </section>

      <section className="essay-card">
        <h2>A better question than “How much is enough?”</h2>
        <p>A deeper question may be this:</p>
        <blockquote className="essay-quote">
          Am I becoming the kind of person who can stand well in life?
        </blockquote>
        <p>
          That includes money. But it also includes calm judgment, basic
          competence, self-respect, and the ability to live without leaning too
          heavily on fear, approval, or rescue.
        </p>
      </section>

      <section className="essay-card">
        <h2>Why this belongs on After Enough</h2>
        <p>
          After Enough is not only about accumulating money. It is also about
          growing into a steadier, freer way of living.
        </p>
        <p>
          Enough money matters. But enough maturity matters too. Enough
          clarity. Enough inner steadiness. Enough skill to meet life without
          panic.
        </p>
        <p>
          Financial independence, in that sense, is not just a financial
          condition. It is a life condition.
        </p>
      </section>

      <section className="essay-card">
        <h2>Explore next</h2>
        <p>
          Pair this with your pages on “How much is enough?” and “Life after
          financial independence.”
        </p>
        <p>
          <Link href="/how-much-is-enough" className="button-link button-link--quiet">
            How Much Is Enough
          </Link>{" "}
          <Link href="/life-after-financial-independence" className="button-link">
            Life After FI
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
