import ExploreCard from "./ExploreCard";

export default function JourneySection({
  title = "Continue your journey",
  items,
}) {
  if (!items?.length) return null;

  return (
    <section className="journey-section">
      <p className="eyebrow">Next step</p>
      <h2>{title}</h2>
      <div className="explore-grid">
        {items.map((item) => (
          <ExploreCard
            key={item.href}
            href={item.href}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
