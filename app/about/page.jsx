import Link from "next/link";
import PageIntro from "../../components/PageIntro";

export const metadata = {
  title: "About",
  description:
    "The idea behind After Enough: a thoughtful bridge from financial striving toward simplicity, reflection, and a more conscious second half of life.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="container">
      <PageIntro
        eyebrow="About"
        title="About this project"
        intro="This project comes from a simple question: what should life become once financial striving is no longer the central organizing force?"
      />

      <div className="prose">
        <p>
          Many people know how to build a career. Many learn how to save,
          invest, and eventually reach financial independence. Far fewer know
          how to prepare for a deeper second half of life.
        </p>

        <p>
          I created this site as an attempt to think more carefully about that
          transition. Not as a retirement brand, and not as a spiritual
          platform, but as a thoughtful bridge between financial independence,
          inner simplicity, reflection, and a more conscious way of living.
        </p>

        <p>
          The question here is not only how to stop working. It is how to reduce
          dependency, create inner space, and meet greater freedom without
          filling it immediately with new forms of distraction, status, or
          pressure.
        </p>

        <p>
          The idea of a modern Vanaprastha has been especially helpful to me.
          It points toward a gradual turning from outward accumulation toward a
          more reflective, simpler, and more inwardly grounded life, while still
          remaining engaged with the world in a mature way.
        </p>

        <p>
          If a person later wants to continue into deeper inquiry about
          self-knowledge, that exploration may naturally extend into resources
          such as{" "}
          <a href="https://mokshakeys.com" target="_blank" rel="noreferrer">
            MokshaKeys
          </a>
          . But this site stands on its own. Its purpose is to help make the
          transition itself more thoughtful and more real.
        </p>

        <p>
          <Link className="button-link button-link--quiet" href="/start-here">
            Read from the beginning
          </Link>
        </p>
      </div>
    </div>
  );
}
