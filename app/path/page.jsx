import PageIntro from "../../components/PageIntro";

export const metadata = {
  title: "A simple path for the second half of life | After Enough",
  description:
    "A practical four-part path for life after financial independence: enough, lightening, turning inward, and living differently.",
};

const sections = [
  {
    title: "Enough",
    paragraphs: [
      "The first step is not endless optimization. It is clarity. You need to know what is sufficient for a stable life, and where lifestyle inflation, fear, or habit still keep you tied to more than you need.",
      "Enough creates room. It reduces dependency on constant earning and makes it possible to ask better questions. Without that base, deeper reflection often remains theoretical.",
    ],
    points: [
      "Define what level of spending is truly enough for your life.",
      "Reduce commitments that lock you into high ongoing dependency.",
      "Separate genuine security from status-based accumulation.",
    ],
  },
  {
    title: "Lightening",
    paragraphs: [
      "Once basic sufficiency is in place, the next move is simplification. Many people carry more noise than they realize: too many inputs, too much stimulation, and too many subtle forms of pressure.",
      "Lightening is not withdrawal for its own sake. It is the deliberate creation of inner and outer space so attention becomes less fragmented and life becomes easier to inhabit.",
    ],
    points: [
      "Reduce unnecessary obligations, possessions, and digital noise.",
      "Notice which forms of busyness are really identity maintenance.",
      "Create regular stretches of quiet, margin, and unstructured time.",
    ],
  },
  {
    title: "Turning Inward",
    paragraphs: [
      "With more space, the question of inward life becomes real. This is where retreats, reflection, silence, study, and time alone begin to matter. Not as exotic extras, but as ways of seeing clearly.",
      "Turning inward does not require adopting a rigid spiritual identity. It begins with honest observation: what still drives me, what I avoid, and what kind of life would be truer now.",
    ],
    points: [
      "Experiment with retreats, reflective travel, silence, and study.",
      "Develop practices that help you sit with yourself more honestly.",
      "Make room for solitude without turning it into isolation.",
    ],
  },
  {
    title: "Living Differently",
    paragraphs: [
      "The aim is not a private inner project disconnected from the world. A mature second half of life often expresses itself through mentoring, service, steadier presence, and work that is less driven by self-importance.",
      "Living differently means relating to action from a quieter center. The outer form may still include projects and responsibility, but the inner posture changes.",
    ],
    points: [
      "Offer experience through mentoring or thoughtful contribution.",
      "Choose meaningful work over compulsive achievement.",
      "Let steadiness matter more than recognition.",
    ],
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
