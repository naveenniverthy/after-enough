import ExploreCard from "../../components/ExploreCard";
import PageIntro from "../../components/PageIntro";
import { assessments } from "./data";

export const metadata = {
  title: "Assessments",
  description:
    "Reflective After Enough assessments for meaning, direction, contribution, and the philosophy shaping your next chapter.",
  alternates: {
    canonical: "/assessments",
  },
};

export default function AssessmentsPage() {
  return (
    <main className="container assessments-page">
      <PageIntro
        eyebrow="Assessments"
        title="Reflective assessments"
        intro="Quiet tools for understanding what is shaping your life after enough: your direction, your philosophy, and the deeper questions beneath both."
      />

      <section className="assessments-section" aria-label="Available assessments">
        <div className="explore-grid assessments-grid">
          {assessments.map((assessment) => (
            <ExploreCard
              key={assessment.href}
              href={assessment.href}
              title={assessment.title}
              description={assessment.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
