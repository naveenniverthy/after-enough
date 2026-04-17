import Link from "next/link";

export const metadata = {
  title: "Lean FIRE",
  description:
    "A simple, human explanation of Lean FIRE as one possible way of reaching enough through a lower-cost life.",
  alternates: {
    canonical: "/lean-fire",
  },
};

export default function LeanFirePage() {
  return (
    <main className="essay-page">
      <section className="essay-hero">
        <p className="eyebrow">Types of Financial Independence</p>
        <h1>Lean FIRE</h1>
        <p className="essay-intro">
          Lean FIRE is the idea of reaching financial independence with a
          simpler, lower-cost lifestyle.
        </p>
        <p className="essay-intro">
          The goal is not luxury. It is enough freedom to live with less
          pressure and less dependence on full-time earning.
        </p>
      </section>

      <section className="essay-card">
        <p>
          This is one way of reaching &ldquo;enough.&rdquo; It is not a rule,
          but a variation based on how you choose to live.
        </p>
      </section>

      <section className="essay-card">
        <h2>What it is</h2>
        <p>
          Lean FIRE means building a smaller financial target by keeping your
          needed spending relatively low.
        </p>
        <p>
          It often appeals to people who care more about time, autonomy, and a
          lighter life than about maintaining a high-consumption lifestyle.
        </p>
      </section>

      <section className="essay-card">
        <h2>What makes it possible</h2>
        <ul className="essay-list">
          <li>Choosing a lifestyle that is simple enough to sustain</li>
          <li>Keeping fixed expenses relatively low</li>
          <li>Knowing the difference between comfort and excess</li>
          <li>Being willing to trade consumption for earlier freedom</li>
        </ul>
      </section>

      <section className="essay-card">
        <h2>The trade-off</h2>
        <p>
          The main trade-off is that a smaller target usually asks for a more
          intentional lifestyle.
        </p>
        <p>
          This can feel freeing if simplicity suits you. It can feel tight if
          you are trying to force yourself into a life that does not fit.
        </p>
      </section>

      <section className="essay-card">
        <h2>A simple reflection</h2>
        <p>This is just one path.</p>
        <p>
          The real question is not which model you follow, but what kind of
          life you want and what is enough for you.
        </p>
        <p>
          <Link href="/build-enough" className="button-link">
            → Back to Build Enough
          </Link>{" "}
          <Link href="/path" className="button-link button-link--quiet">
            → View the full path
          </Link>
        </p>
      </section>
    </main>
  );
}
