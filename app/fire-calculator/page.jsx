import PageIntro from "../../components/PageIntro";
import FireCalculator from "../../components/FireCalculator";

export const metadata = {
  title: "Simple FIRE Calculator | After Enough",
  description:
    "A plain-English FIRE calculator for Lean FIRE, FIRE, Fat FIRE, Barista FIRE, and Coast FIRE.",
};

export default function FireCalculatorPage() {
  return (
    <div className="container fire-page">
      <PageIntro
        eyebrow="Tools"
        title="Simple FIRE Calculator"
        intro="A plain-English calculator for Lean FIRE, FIRE, Fat FIRE, Barista FIRE, and Coast FIRE. No jargon. No complicated charts. Just simple numbers to help you see where you stand."
      />

      <FireCalculator />
    </div>
  );
}
