import Link from "next/link";

export const metadata = {
  title: "Fat FIRE",
  description:
    "A simple, human explanation of Fat FIRE as one possible way of reaching enough while planning for more comfort.",
  alternates: {
    canonical: "/fat-fire",
  },
};

export default function FatFirePage() {
  return (
    <main className="essay-page">
      <section className="essay-hero">
        <p className="eyebrow">Types of Financial Independence</p>
        <h1>Fat FIRE</h1>
        <p className="essay-intro">
          Fat FIRE is the idea of reaching financial independence while
          planning for a more comfortable, higher-cost lifestyle.
        </p>
        <p className="essay-intro">
          It usually means aiming for a larger number so freedom can include
          more space, spending, or optionality.
        </p>
      </section>

      <section className="essay-card">
        <p>
          This is one way of reaching &ldquo;enough.&rdquo; It reflects a
          particular balance between lifestyle, time, and financial needs.
        </p>
      </section>

      <section className="essay-card">
        <h2>What it is</h2>
        <p>
          Fat FIRE is not a different destination. It is the same basic idea of
          freedom, but with more room built into the lifestyle you want to
          maintain.
        </p>
        <p>
          For some people, that extra room feels wise. For others, it can mean
          spending many more years chasing a number that keeps moving.
        </p>
      </section>

      <section className="essay-card">
        <h2>What makes it appealing</h2>
        <ul className="essay-list">
          <li>More flexibility in how you want to live later</li>
          <li>More room for travel, comfort, or generosity</li>
          <li>Less pressure to keep life tightly optimized</li>
          <li>A greater sense of buffer for the unexpected</li>
        </ul>
      </section>

      <section className="essay-card">
        <h2>The trade-off</h2>
        <p>
          A more comfortable version of independence usually takes longer to
          reach.
        </p>
        <p>
          That is not automatically wrong. But it is worth asking whether the
          added comfort is truly needed, or whether it keeps delaying a life
          that could already become lighter.
        </p>
      </section>

      <section className="essay-card">
        <h2>Other ways to reach enough</h2>
        <p>
          <Link href="/lean-fire" className="button-link button-link--quiet">
            Lean FIRE
          </Link>{" "}
          <Link href="/coast-fire" className="button-link button-link--quiet">
            Coast FIRE
          </Link>{" "}
          <Link href="/barista-fire" className="button-link button-link--quiet">
            Barista FIRE
          </Link>
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
