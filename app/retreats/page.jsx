import RetreatExplorer from "./RetreatExplorer";
import {
  retreatAssessmentQuestions,
  retreatCategories,
  retreats,
} from "./data";

export const metadata = {
  title: "Retreats",
  description:
    "A quiet guide to choosing retreats with more clarity, honesty, and fit for your stage of life.",
  alternates: {
    canonical: "/retreats",
  },
};

export default function RetreatsPage() {
  return (
    <RetreatExplorer
      retreats={retreats}
      categories={retreatCategories}
      assessmentQuestions={retreatAssessmentQuestions}
    />
  );
}
