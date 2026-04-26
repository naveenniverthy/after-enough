import Link from "next/link";

export const metadata = {
  title: "Life After Enough",
  description:
    "A quiet reflection on the reality of life after financial independence, and the deeper question of how to live after enough.",
  alternates: {
    canonical: "/after-enough-life",
  },
};

export default function AfterEnoughLifePage() {
  return (
    <main className="essay-page">
      <section className="essay-hero">
        <p className="eyebrow">Life after financial independence</p>
        <h1>Life After Enough</h1>
        <p className="essay-intro">
          Reaching financial independence solves one problem: money. But it
          does not automatically answer a deeper question: how to live when you
          no longer have to work.
        </p>
      </section>

      <section className="essay-card">
        <h2>Independence needs maintenance</h2>
        <p>
          Financial independence is not a one-time achievement. It requires
          quiet discipline: managing expenses, staying aware, and avoiding the
          drift back into dependence.
        </p>
      </section>

      <section className="essay-card">
        <h2>Freedom removes structure</h2>
        <p>
          When work disappears, so does the structure it provided. Days become
          open. That openness can feel like freedom, or emptiness. What you
          build in its place becomes your life.
        </p>
      </section>

      <section className="essay-card">
        <h2>Freedom is not only financial</h2>
        <p>
          You can be financially independent and still feel dependent: on
          validation, on routine, on others. True independence is not only about
          money. It includes how you relate to time, people, and yourself.
        </p>
      </section>

      <section className="essay-card callout">
        <p>
          After enough, the question is no longer &ldquo;How much do I
          need?&rdquo;
        </p>
        <p>It becomes &ldquo;How do I want to live?&rdquo;</p>
        <p>
          <Link className="button-link" href="/start-here">
            Go to Start Here
          </Link>
        </p>
      </section>
    </main>
  );
}
