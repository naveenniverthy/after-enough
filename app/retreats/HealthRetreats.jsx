export default function HealthRetreats({ retreats }) {
  return (
    <div className="grid gap-6">
      {retreats.map((retreat) => (
        <article
          key={retreat.slug}
          className="rounded-3xl border border-neutral-200 bg-white p-6"
        >
          <h2 className="text-xl font-semibold text-neutral-900">
            {retreat.name}
          </h2>
          <p className="text-sm text-neutral-600 mt-1">{retreat.location}</p>

          <div className="mt-4 text-sm text-neutral-700">
            {retreat.whyChoose}
          </div>

          <div className="mt-4 text-sm text-neutral-500">
            Note: {retreat.notes}
          </div>

          <a
            href={retreat.website}
            target="_blank"
            className="inline-block mt-4 text-sm underline"
          >
            Visit official site
          </a>
        </article>
      ))}
    </div>
  );
}
