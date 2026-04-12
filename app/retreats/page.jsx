import PageIntro from "../../components/PageIntro";

export const metadata = {
  title: "Retreats, Ashrams, and intentional pauses | After Enough",
  description:
    "A grounded guide to retreats, ashrams, and intentional pauses for people exploring a more reflective second half of life.",
};

const sections = [
  {
    title: "Why retreats matter",
    body: [
      "Most people live inside momentum. A retreat interrupts that momentum long enough for you to notice your habits, your fatigue, and the forces that usually keep you moving. That pause can be clarifying in ways that ordinary vacation often is not.",
      "For someone preparing for a more reflective second half of life, retreats offer a practical bridge. They let you test what more space, less noise, and a different daily rhythm actually feel like.",
    ],
  },
  {
    title: "What kinds of retreats exist",
    body: [
      "A 3-day silence retreat can help you see how active the mind remains when devices, conversation, and ordinary work patterns are removed. A weekend reflection retreat may be gentler and more accessible for a first experience.",
      "There are also more specific formats: a Vedanta study retreat centered on teaching and inquiry, or a seva-oriented ashram stay where daily work, simplicity, and community are part of the learning. Each has a different emphasis, so the right fit depends on what you need.",
    ],
  },
  {
    title: "What to expect",
    body: [
      "Do not expect instant peace. Many first-time participants feel restless, uncomfortable, sleepy, emotionally exposed, or surprisingly relieved. A good retreat does not necessarily feel pleasant at every moment. It creates conditions in which you can notice yourself more clearly.",
      "The schedule may be simpler than normal life, but it is still structured. Expect quiet time, early mornings in some settings, modest food, limited phone use, and less personal control than a hotel stay.",
    ],
  },
  {
    title: "How to prepare",
    body: [
      "Start with a format that matches your readiness. If you have never done anything like this, a short guided retreat is often wiser than immediately choosing a long silent program. Read the schedule, understand the norms, and be honest about your current energy and expectations.",
      "Prepare practically: clear your work obligations, reduce incoming communication, sleep well beforehand, and arrive without turning the retreat into a performance project. The point is not to impress anyone with seriousness. It is to become available to the experience.",
    ],
  },
  {
    title: "Common mistakes",
    body: [
      "One mistake is treating a retreat like a luxury escape and resisting any discomfort. Another is treating it like a self-improvement competition and trying to extract maximum insight on a schedule. Both approaches keep the old mindset intact.",
      "Another common error is romanticizing ashrams or spiritual spaces without understanding their culture, discipline, or limits. Respect matters. So does discernment. A retreat is a support for reflection, not a substitute for steady change in ordinary life.",
    ],
  },
];

export default function RetreatsPage() {
  return (
    <div className="container">
      <PageIntro
        eyebrow="Intentional pauses"
        title="Retreats, Ashrams, and intentional pauses"
        intro="Retreats can be a practical way to step out of ordinary momentum and see what a quieter, less driven rhythm of life might actually ask of you."
      />

      <div className="stack">
        {sections.map((section) => (
          <section key={section.title} className="panel prose">
            <h2>{section.title}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
