import Link from "next/link";

const stages = [
  {
    title: "Build Enough",
    description: "Create financial stability and reduce dependency.",
  },
  {
    title: "Lighten the Mind",
    description: "Simplify life, reduce pressure, and understand what still drives you.",
  },
  {
    title: "Live Differently",
    description: "Move from achievement toward reflection, contribution, and inward growth.",
  },
];

const features = [
  {
    href: "/start-here",
    title: "Start Here",
    description: "Why money alone does not prepare us for the freedom we think we want.",
  },
  {
    href: "/path",
    title: "Path",
    description: "A clear framework for moving from financial independence toward inner steadiness.",
  },
  {
    href: "/retreats",
    title: "Retreats",
    description: "Practical guidance for retreats, ashrams, and intentional pauses from ordinary pace.",
  },
  {
    href: "/about",
    title: "About",
    description: "The quiet idea behind this project and the kind of transition it hopes to support.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <p className="eyebrow">Life after financial independence</p>
          <h1>What happens after you have enough?</h1>
          <p>
            Financial freedom gives you time. It does not automatically give you
            direction. This is a space for preparing for the second half of life
            with more clarity, simplicity, and depth.
          </p>
        </div>
      </section>

      <section className="section container">
        <h2 className="section-heading">The missing preparation</h2>
        <p className="section-copy">
          Many people spend years learning how to earn, save, invest, and
          retire. Very few prepare for what comes after. This site is about
          that missing preparation: how to meet freedom well, simplify life,
          and grow into a more thoughtful way of living.
        </p>
      </section>

      <section className="section container">
        <h2 className="section-heading">A simple three-stage path</h2>
        <div className="card-grid card-grid--three">
          {stages.map((stage) => (
            <article key={stage.title} className="card">
              <h3>{stage.title}</h3>
              <p>{stage.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section container">
        <h2 className="section-heading">Explore the site</h2>
        <div className="card-grid card-grid--four">
          {features.map((feature) => (
            <article key={feature.href} className="card">
              <Link className="card-link" href={feature.href}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="panel">
          <p className="closing-line">
            Do not just retire from work. Prepare for a different way of living.
          </p>
          <p style={{ textAlign: "center", marginBottom: 0 }}>
            <Link className="button-link" href="/start-here">
              Begin with the larger question
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
