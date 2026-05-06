import PageIntro from "../../components/PageIntro";
import SwpCalculator from "../../components/SwpCalculator";

export const metadata = {
  title: "SWP Calculator",
  description:
    "Estimate how long your investment corpus may last when you withdraw monthly income after financial independence.",
  alternates: {
    canonical: "/swp-calculator",
  },
};

export default function SwpCalculatorPage() {
  return (
    <div className="container fire-page swp-page">
      <PageIntro
        eyebrow="Tools"
        title="SWP Calculator"
        intro="See how long your money may last when you withdraw monthly income from your investment corpus."
      />

      <SwpCalculator />
    </div>
  );
}
