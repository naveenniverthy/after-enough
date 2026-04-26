import Link from "next/link";
import PageIntro from "../../components/PageIntro";
import ExploreCard from "../../components/ExploreCard";
import { stageGroups } from "../home-stage-data";

export const metadata = {
  title: "Lighten the Mind",
  description:
    "Once survival pressure reduces, the mind still carries stress, comparison, and restlessness. This stage is about simplifying inwardly.",
  alternates: {
    canonical: "/lighten-the-mind",
  },
};

const stage = stageGroups.find((item) => item.href === "/lighten-the-mind");

export default function LightenTheMindPage() {
  return (
    <div className="container">
      <PageIntro
        eyebrow="Stage 2"
        title="Lighten the Mind"
        intro="Once survival pressure reduces, the mind still carries stress, comparison, and restlessness. This stage is about simplifying inwardly."
      />

      <div className="stack">
        <section className="panel prose">
          <p>
            Lighten the Mind begins after enough starts to take shape. The
            outer pressure may reduce, but the inner machinery often keeps
            running.
          </p>
          <p>
            This stage is about simplifying inwardly: loosening comparison,
            reducing restlessness, and seeing that a quieter life is not the
            same as an empty one.
          </p>
        </section>

        <section className="panel prose">
          <h2>What this means</h2>
          <p>
            A lighter life is not only fewer expenses. It is less inner
            pressure, less noise, and more clarity about what really matters.
          </p>
          <p>
            Simplicity is not deprivation. It is one way of making life more
            inhabitable.
          </p>

          <h2>What helps</h2>
          <ul>
            <li>Reduce unnecessary consumption</li>
            <li>Notice status-driven habits</li>
            <li>Make space for silence and reflection</li>
            <li>Understand what still drives you</li>
          </ul>
        </section>

        <section className="panel prose">
          <h2>Why this stage matters</h2>
          <p>
            Without lightening the mind, more freedom can simply create more
            restlessness.
          </p>
          <p>
            Instead of clarity, there is more distraction. Instead of ease,
            there is more choice without direction.
          </p>
          <p>This stage helps convert outer freedom into inner space.</p>
        </section>

        <section className="panel">
          <h2 className="section-heading">{stage.relatedHeading}</h2>
          <div className="explore-grid">
            {stage.links.map((item) => (
              <ExploreCard
                key={item.href}
                href={item.href}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </section>

        <section className="panel prose">
          <h2>Let Go, Pause, Rechoose</h2>

          <p className="essay-intro-emphasis">Detach → Pause → Rechoose</p>

          <div className="stack-grid stack-grid--three">
            <article className="soft-card">
              <h3>Detach from old roles</h3>
              <p>
                A lighter mind begins by loosening our grip on the roles that
                once defined us: job title, company, network, status, career
                identity, and the need to remain important. These roles may
                have served us well, but they are not who we are. Lightening
                the mind means seeing them clearly, thanking them, and gently
                stepping back.
              </p>
            </article>

            <article className="soft-card">
              <h3>Allow the empty space</h3>
              <p>
                After detachment, there may be a quiet space. This is normal.
                Do not rush to fill it immediately. The pause matters. It
                prevents us from replacing one attachment with another. In this
                space, the mind begins to breathe again.
              </p>
            </article>

            <article className="soft-card">
              <h3>Rechoose consciously</h3>
              <p>
                Once the mind is lighter, we can choose new associations with
                more clarity. This may be a spiritual community, meditation
                circle, fitness group, sports group, learning circle, or ikigai
                group. The point is not to stay busy. The point is to find
                environments aligned with our body, mind, personality, values,
                and stage of life.
              </p>
            </article>
          </div>

          <p>
            Lightening the mind is mostly about releasing old psychological
            weight. Living differently begins when we consciously build new
            rhythms, communities, and practices from that lighter place.
          </p>

          <p>
            <Link className="button-link button-link--quiet" href="/live-differently">
              Explore Living Differently →
            </Link>
          </p>
        </section>

        <section className="panel prose">
          <h2>Next step</h2>
          <p>
            When the mind becomes lighter, life itself can be reorganized
            around a different center.
          </p>
          <p>
            <Link className="button-link" href="/live-differently">
              Go to Live Differently
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
