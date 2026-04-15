export const metadata = {
  title: "Why Retirement Is Not the Real Goal | After Enough",
  description:
    "A simple reflection on why life after financial independence needs meaning, structure, connection, and direction, not just an escape from work.",
};

const pillars = [
  {
    title: "Social",
    text: "A good life still needs people. Friendship, community, family, shared conversation, and real human warmth matter more than most people expect.",
  },
  {
    title: "Structure",
    text: "Freedom without rhythm can become drift. A healthy day still needs shape, intention, and some reason to get up with clarity.",
  },
  {
    title: "Stimulation",
    text: "The mind does not flourish in endless comfort. It needs learning, challenge, curiosity, and the feeling that life is still unfolding.",
  },
  {
    title: "Story",
    text: "People want to feel part of something larger than private comfort. Service, contribution, devotion, teaching, building, and helping all give life depth.",
  },
];

export default function RetirementIsNotTheGoalPage() {
  return (
    <main className="essay-page">
      <section className="essay-hero">
        <p className="eyebrow">Life after enough</p>
        <h1>Why retirement is not the real goal</h1>
        <p className="essay-intro">
          Many people think financial independence is mainly about one thing:
          finally stopping work.
        </p>
        <p className="essay-intro">
          But for most thoughtful people, that is not the real desire. The
          deeper desire is to live with less pressure, more freedom, and more
          meaning.
        </p>
      </section>

      <section className="essay-card">
        <p>
          Money can remove fear. It can create breathing room. It can give you
          more choice over your time.
        </p>
        <p>
          But money alone cannot tell you what to do with your life once the
          pressure reduces.
        </p>
        <p>
          That is why many people feel confused even after reaching major
          financial milestones. They may have enough to slow down, but they
          have not yet answered a harder question:
        </p>
        <blockquote className="essay-quote">
          What is worth waking up for now?
        </blockquote>
        <p>
          This is where the old retirement idea starts to feel too small. A
          life built only around &ldquo;not working&rdquo; can easily become
          empty. What people usually want is not nothing. They want a better
          way of living.
        </p>
      </section>

      <section className="essay-card">
        <h2>After enough, four things still matter</h2>
        <p>
          Even if you no longer need to earn in the same way, you still need a
          life that feels alive. Four things remain deeply important.
        </p>

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
        <h2>What this means in practice</h2>
        <p>
          Life after enough should not be imagined as endless leisure. Rest has
          its place. Space has its place. Travel has its place.
        </p>
        <p>But beyond a point, a good life still needs direction.</p>
        <p>
          That direction may take the form of quieter work, part-time service,
          study, mentoring, writing, spiritual practice, retreats, family
          presence, health, or community contribution.
        </p>
        <p>
          The form will differ from person to person. But the principle is the
          same: freedom becomes meaningful only when it is joined with
          intelligence, self-understanding, and right use of time.
        </p>
      </section>

      <section className="essay-card">
        <h2>A better question than &ldquo;When can I retire?&rdquo;</h2>
        <p>A more useful question is this:</p>
        <blockquote className="essay-quote">
          If money became less urgent, how would I want to live?
        </blockquote>
        <p>
          That question opens a deeper conversation. It shifts the focus from
          escape to design. From fantasy to reality. From ending work to
          beginning a wiser phase of life.
        </p>
        <p>That is closer to the spirit of this site.</p>
      </section>

      <section className="essay-card">
        <h2>The real work after enough</h2>
        <p>
          The real work after enough is inner and practical at the same time.
        </p>
        <p>
          It is learning how to live with less noise, less compulsion, and less
          dependence on busyness for identity.
        </p>
        <p>
          It is making room for reflection, relationships, simplicity, and a
          more deliberate use of life.
        </p>
        <p>
          Financial independence may create the opening. But it does not finish
          the journey.
        </p>
        <p>
          It only gives you the chance to ask, perhaps for the first time with
          seriousness:
        </p>
        <blockquote className="essay-quote">
          What is enough for money, and what is enough for a life?
        </blockquote>
      </section>
    </main>
  );
}
