import Link from "next/link";
import PageIntro from "../../components/PageIntro";

export const metadata = {
  title: "The path",
  description:
    "A practical three-stage path for life after financial independence: build enough, lighten the mind, and live differently.",
};

const sections = [
  {
    title: "Build Enough",
    paragraphs: [
      "The first step is not endless optimization. It is clarity. You need to know what is sufficient for a stable life, and where lifestyle inflation, fear, or habit still keep you tied to more than you need.",
      "Build enough creates room. It reduces dependency on constant earning and makes it possible to ask better questions. Without that base, deeper reflection often remains theoretical.",
    ],
    points: [
      "Define what level of spending is truly enough for your life.",
      "Reduce commitments that lock you into high ongoing dependency.",
      "Separate genuine security from status-based accumulation.",
    ],
    href: "/build-enough",
    cta: "Explore Build Enough",
  },
  {
    title: "Lighten the Mind",
    paragraphs: [
      "Once basic sufficiency is in place, the next move is simplification. Many people carry more noise than they realize: too many inputs, too much stimulation, and too many subtle forms of pressure.",
      "Lightening the mind is not withdrawal for its own sake. It is the deliberate creation of inner and outer space so attention becomes less fragmented and life becomes easier to inhabit. This is also where silence, reflection, retreats, and honest self-observation begin to matter in a more real way.",
    ],
    points: [
      "Reduce unnecessary obligations, possessions, and digital noise.",
      "Notice which forms of busyness are really identity maintenance.",
      "Create regular stretches of quiet, margin, and unstructured time.",
      "Experiment with reflection, silence, retreats, or study.",
    ],
    href: "/lighten-the-mind",
    cta: "Explore Lighten the Mind",
  },
  {
    title: "Live Differently",
    paragraphs: [
      "The aim is not a private inner project disconnected from the world. A mature second half of life often expresses itself through mentoring, service, steadier presence, meaningful work, and action that comes from a quieter center.",
      "Living differently means relating to action with less compulsion and more depth. The outer form may still include responsibility, projects, and contribution, but the inner posture changes.",
    ],
    points: [
      "Offer experience through mentoring or thoughtful contribution.",
      "Choose meaningful work over compulsive achievement.",
      "Let steadiness matter more than recognition.",
      "Make room for inward growth as part of a well-lived life.",
    ],
    href: "/live-differently",
    cta: "Explore Live Differently",
  },
];

export default function PathPage() {
  return (
    <div className="container">
      <PageIntro
        eyebrow="The path"
        title="A simple path for the second half of life"
        intro="This path is not rigid, but it offers a practical sequence for moving from financial freedom toward a deeper and more intentional way of living."
      />

      <div className="stack">
        {sections.map((section) => (
          <section key={section.title} className="panel prose">
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <ul>
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p>
              <Link className="button-link button-link--quiet" href={section.href}>
                {section.cta}
              </Link>
            </p>
          </section>
        ))}
      </div>

      <div className="prose" style={{ marginTop: "2rem" }}>
        <p>
          This is not about escaping life. It is about relating to it
          differently: with less compulsion, more simplicity, and a steadier
          inner center from which to live.
        </p>
      </div>
    </div>
  );
}
