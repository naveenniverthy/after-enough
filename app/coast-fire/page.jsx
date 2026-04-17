import Link from "next/link";

const lifeLooksLike = [
  "Moving from a high-pressure job to a calmer one",
  "Working part-time or taking contract work",
  "Choosing meaning over salary",
  "Taking a lower-paying role with better family time",
  "Starting a small business without maximum pressure",
  "Letting work fit your life instead of the other way around",
];

const attractions = [
  {
    title: "Less pressure",
    text: "You may no longer feel the need to chase every raise, promotion, or bonus.",
  },
  {
    title: "More flexibility",
    text: "You can choose work that better matches your values, energy, and season of life.",
  },
  {
    title: "A softer pace",
    text: "Your future is still being built, but your present no longer has to be driven by urgency.",
  },
  {
    title: "A more human goal",
    text: "Instead of escaping work completely, you can build a life in which work has the right size.",
  },
];

export const metadata = {
  title: "Coast FIRE",
  description:
    "A simple, human explanation of Coast FIRE: what it is, what life can look like, who it fits, and the trade-offs behind it.",
  alternates: {
    canonical: "/coast-fire",
  },
};

export default function CoastFirePage() {
  return (
    <main className="essay-page">
      <section className="essay-hero">
        <p className="eyebrow">Types of Financial Independence</p>
        <h1>Coast FIRE</h1>
        <p className="essay-intro">
          Coast FIRE means you have already invested enough that, if left
          alone, your money may grow to support your future retirement.
        </p>
        <p className="essay-intro">
          You do not need to keep pushing hard toward full financial
          independence. You only need to earn enough to live well now.
        </p>
      </section>

      <section className="essay-card">
        <blockquote className="essay-quote">
          You have done enough for the future. Now you can make gentler choices
          in the present.
        </blockquote>
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
          Coast FIRE is not full retirement. It is not stopping work
          completely. It is a middle ground.
        </p>
        <p>
          The idea is simple: you built enough invested assets early that time
          can do a lot of the remaining work. Because of that, you no longer
          have to save aggressively every year. Your job can become smaller,
          slower, lighter, or more meaningful.
        </p>
        <p>
          In practical terms, Coast FIRE often means this: your long-term
          future is being quietly handled in the background, and your current
          income only needs to support your current life.
        </p>
      </section>

      <section className="essay-card">
        <h2>What life can look like</h2>
        <div className="grid-two">
          {lifeLooksLike.map((item) => (
            <article key={item} className="soft-card">
              <p>{item}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="essay-card">
        <h2>Who this may fit</h2>
        <p>Coast FIRE may appeal to you if:</p>
        <ul className="essay-list">
          <li>You want more freedom, but do not want to fully retire.</li>
          <li>You are tired of optimizing every year for a higher salary.</li>
          <li>
            You want more time for family, health, rest, creativity, or inner
            life.
          </li>
          <li>
            You would gladly earn less if your days felt more like your own.
          </li>
          <li>
            You want security, but not at the cost of your present life.
          </li>
        </ul>
      </section>

      <section className="essay-card">
        <h2>What makes it attractive</h2>
        <div className="grid-two">
          {attractions.map((item) => (
            <article key={item.title} className="soft-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="essay-card">
        <h2>The trade-offs</h2>
        <p>
          Coast FIRE is not a magic shortcut. It asks for trust, patience, and
          clarity.
        </p>
        <p>
          You may build less wealth than someone who keeps pushing hard for
          another fifteen years.
        </p>
        <p>
          You may need to accept a life that is intentionally good rather than
          maximized in every direction.
        </p>
        <p>
          You also need emotional steadiness. If markets fall, or if your life
          becomes more expensive, the plan may feel uncomfortable for a while.
          Coast FIRE works best when your definition of enough is clear.
        </p>
      </section>

      <section className="essay-card">
        <h2>What Coast FIRE quietly asks</h2>
        <blockquote className="essay-quote">
          Not, &ldquo;How can I get rich as fast as possible?&rdquo;
        </blockquote>
        <blockquote className="essay-quote">
          But, &ldquo;How much future security do I truly need before I allow
          myself to live differently now?&rdquo;
        </blockquote>
      </section>

      <section className="essay-card">
        <h2>Questions worth sitting with</h2>
        <ul className="essay-list">
          <li>
            What would change in your life if you no longer had to optimize
            everything for maximum income?
          </li>
          <li>
            What kind of work would you choose if your future was already
            partly funded?
          </li>
          <li>
            Are you trying to retire early, or are you really trying to breathe
            differently?
          </li>
        </ul>
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
