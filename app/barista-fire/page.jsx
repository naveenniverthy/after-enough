import Link from "next/link";

export const metadata = {
  title: "Barista FIRE",
  description:
    "A simple, human explanation of Barista FIRE as one possible way of reaching enough through partial freedom and lighter work.",
  alternates: {
    canonical: "/barista-fire",
  },
};

export default function BaristaFirePage() {
  return (
    <main className="essay-page">
      <section className="essay-hero">
        <p className="eyebrow">Types of Financial Independence</p>
        <h1>Barista FIRE</h1>
        <p className="essay-intro">
          Barista FIRE is the idea of stepping away from full-time pressure
          before you are fully financially independent.
        </p>
        <p className="essay-intro">
          Instead of covering all of life through investments alone, you let
          lighter work and savings share the load.
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
          For many people, the real need is not to stop work forever. It is to
          stop carrying work in the same intense way.
        </p>
        <p>
          This path can mean part-time work, seasonal work, contract work, or a
          lower-pressure role that covers part of your spending while giving
          you more room to breathe.
        </p>
      </section>

      <section className="essay-card">
        <h2>A different way to step back</h2>
        <p>
          Barista-style financial independence is not about stopping work
          completely.
        </p>
        <p>
          It is about reaching a point where your investments can support a
          part of your life, so work becomes lighter, more flexible, and more
          intentional.
        </p>
        <p>
          Some people choose part-time roles. Others take lower-pressure jobs,
          or explore work they actually enjoy. The key shift is not the type of
          job, but the reason for doing it.
        </p>
        <p>
          Work is no longer the only way to stay secure. It becomes something
          you choose, not something you depend on.
        </p>
      </section>

      <section className="essay-card">
        <h2>What changes here</h2>
        <ul className="essay-list">
          <li>Income is shared between work and investments</li>
          <li>Financial pressure reduces, but does not disappear completely</li>
          <li>Work becomes more flexible and often more meaningful</li>
          <li>Time opens up, but structure still remains</li>
        </ul>
        <p>This is not full independence. But it is often the first real taste of freedom.</p>
      </section>

      <section className="essay-card">
        <h2>What makes it helpful</h2>
        <ul className="essay-list">
          <li>It can create freedom earlier than a full exit</li>
          <li>It reduces pressure without demanding a perfect finish line</li>
          <li>It lets work become smaller, not necessarily absent</li>
          <li>It can make the transition feel more human and gradual</li>
        </ul>
      </section>

      <section className="essay-card">
        <h2>The trade-off</h2>
        <p>
          This path still depends on some ongoing work, so it is not total
          independence.
        </p>
        <p>
          But for many people, that is not a flaw. It is a better match for a
          life that values flexibility, steadiness, and less strain.
        </p>
      </section>

      <section className="essay-card">
        <h2>Other ways to reach enough</h2>
        <p>
          <Link href="/lean-fire" className="button-link button-link--quiet">
            Lean FIRE
          </Link>{" "}
          <Link href="/fat-fire" className="button-link button-link--quiet">
            Fat FIRE
          </Link>{" "}
          <Link href="/coast-fire" className="button-link button-link--quiet">
            Coast FIRE
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
