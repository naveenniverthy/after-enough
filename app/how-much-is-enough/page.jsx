import Link from "next/link";
import PageIntro from "../../components/PageIntro";

export const metadata = {
  title: "How Much Is Enough? | After Enough",
  description:
    "A quiet reflection on enough, money, sufficiency, and what comes after constant striving.",
};

export default function HowMuchIsEnoughPage() {
  return (
    <div className="container">
      <PageIntro
        eyebrow="A quieter question"
        title="How much is enough?"
        intro="At some point, the question changes. Not “How do I get more?” but “How much is enough?” That question may look financial on the surface, but for many people it is really about freedom, rest, and what life is for once survival and ambition have done their work."
      />

      <div className="stack">
        <section className="panel prose">
          <p>
            For much of life, more feels natural. More income. More security.
            More comfort. More options. There is nothing wrong with that. Money
            matters. Responsibility matters. Stability matters.
          </p>

          <p>
            But if the question never changes, there is no natural end. The
            mind remains tied to the next milestone, the next cushion, the next
            number, the next upgrade. Even when life is already workable, the
            feeling of &ldquo;not yet&rdquo; can continue.
          </p>

          <p>
            So this page is not here to give you a universal target. It is here
            to help you look more honestly at what &ldquo;enough&rdquo; may
            actually mean in a human life.
          </p>
        </section>

        <section className="panel prose">
          <h2>Enough is not just a number</h2>

          <p>
            A number can be useful for planning. But enough is not only a
            financial calculation. It is also a shift in relationship.
          </p>

          <p>
            Enough is the point where life is no longer organized only around
            accumulation. It is the point where money has done its basic job
            well enough that the deeper question can finally appear:
          </p>

          <blockquote>
            <p>What am I still depending on money to solve for me?</p>
          </blockquote>

          <p>
            Sometimes the answer is practical. Sometimes it is psychological.
            Sometimes it is the hope that one more layer of security will
            remove uncertainty from life altogether. But life does not work
            that way.
          </p>
        </section>

        <section className="panel prose">
          <h2>What money should cover</h2>

          <p>
            It helps to be clear and simple here. Enough does not mean luxury.
            It does not mean perfection. It means life is responsibly covered
            without constant financial pressure.
          </p>

          <p>At a minimum, money should take care of:</p>

          <ul>
            <li>a place to live</li>
            <li>food and daily living</li>
            <li>healthcare and basic safety</li>
            <li>a buffer for the unexpected</li>
          </ul>

          <p>For some people, it may also include:</p>

          <ul>
            <li>children&apos;s education</li>
            <li>support for parents or family</li>
            <li>a simple level of comfort and mobility</li>
          </ul>

          <p>
            This is a better question than &ldquo;What number should I
            hit?&rdquo; because it keeps the focus on real life rather than
            comparison.
          </p>
        </section>

        <section className="panel prose">
          <h2>When enough still does not feel like enough</h2>

          <p>
            This is where the deeper part begins. A person may be financially
            fine and still feel unsettled. The habit of insufficiency can
            remain even when actual insufficiency is no longer present.
          </p>

          <p>
            The mind may still ask for more money, more certainty, more
            control, more proof that everything will be fine. So the real issue
            is not only income or assets. It is also dependence.
          </p>

          <p>What am I still leaning on for inner ease?</p>

          <ul>
            <li>more money</li>
            <li>more status</li>
            <li>more control over the future</li>
            <li>more reassurance that life will go my way</li>
          </ul>

          <p>
            If these continue endlessly, no number will fully settle the mind.
          </p>
        </section>

        <section className="panel prose">
          <h2>A simple working definition</h2>

          <p>Enough is when money stops being the center of decision-making.</p>

          <p>
            Not because money has become irrelevant, but because it is no
            longer the main thing around which life revolves.
          </p>

          <p>Enough is when:</p>

          <ul>
            <li>life is workable</li>
            <li>basic responsibilities are covered</li>
            <li>there is some room to breathe</li>
            <li>the constant push for &ldquo;more&rdquo; is seen clearly</li>
          </ul>

          <p>
            From there, a new possibility opens. Not how to earn more from
            life, but how to live it more lightly, deliberately, and freely.
          </p>
        </section>

        <section className="panel prose">
          <h2>Before enough and after enough</h2>

          <p>
            Before enough, money rightly takes a central place. It protects,
            stabilizes, and supports life.
          </p>

          <p>
            After enough, the question changes. Life begins to guide how money
            is used, instead of money quietly dictating the shape of life.
          </p>

          <p>
            This is where simplification, reflection, service, retreat, deeper
            study, or a more intentional second half of life may begin to make
            sense.
          </p>
        </section>

        <section className="panel prose">
          <h2>A question to sit with</h2>

          <p>Sit quietly and ask:</p>

          <blockquote>
            <p>
              If nothing more was added to my life, what is actually missing
              right now?
            </p>
          </blockquote>

          <p>
            The answer may not come immediately. But this is the kind of
            question that gently separates practical need from endless mental
            momentum.
          </p>
        </section>

        <section className="panel prose">
          <h2>Where this leads</h2>

          <p>
            Once the question of enough becomes real, another question appears:
            what is life for after accumulation is no longer the whole story?
          </p>

          <p>
            <Link className="button-link" href="/start-here">
              Start here
            </Link>{" "}
            <Link className="button-link button-link--quiet" href="/path">
              Continue to the path
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
