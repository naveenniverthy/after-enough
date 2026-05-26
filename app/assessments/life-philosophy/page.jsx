import LifePhilosophyAssessment from "./LifePhilosophyAssessment";

export const metadata = {
  title: "Current Life Philosophy Assessment",
  description:
    "A reflective After Enough assessment that helps you understand the life philosophy shaping you now, with suggested readings and questions for deeper reflection.",
  alternates: {
    canonical: "/assessments/life-philosophy",
  },
};

export default function LifePhilosophyAssessmentPage() {
  return <LifePhilosophyAssessment />;
}
