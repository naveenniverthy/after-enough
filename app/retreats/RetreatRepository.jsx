'use client'

import { useState } from "react";

const initialFilters = {
  search: "",
  orientation: "",
  intensity: "",
  duration: "",
  bestFor: "",
  featuredOnly: false,
};

export default function RetreatRepository({ retreats, categories }) {
  const [filters, setFilters] = useState(initialFilters);

  const filteredRetreats = retreats.filter((retreat) => {
    const searchNeedle = filters.search.trim().toLowerCase();
    const matchesSearch =
      !searchNeedle ||
      retreat.name.toLowerCase().includes(searchNeedle) ||
      retreat.location.toLowerCase().includes(searchNeedle) ||
      retreat.notes.toLowerCase().includes(searchNeedle);
    const matchesOrientation =
      !filters.orientation || retreat.orientation === filters.orientation;
    const matchesIntensity =
      !filters.intensity || retreat.intensity === filters.intensity;
    const matchesDuration =
      !filters.duration || retreat.duration === filters.duration;
    const matchesBestFor =
      !filters.bestFor || retreat.bestFor.includes(filters.bestFor);
    const matchesFeatured = !filters.featuredOnly || retreat.featured;

    return (
      matchesSearch &&
      matchesOrientation &&
      matchesIntensity &&
      matchesDuration &&
      matchesBestFor &&
      matchesFeatured
    );
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFilters((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function resetFilters() {
    setFilters(initialFilters);
  }

  return (
    <div className="retreat-repository stack">
      <section className="panel retreat-filter-panel">
        <div className="retreat-filter-heading">
          <div>
            <p className="retreat-kicker">Repository</p>
            <h2>Find a retreat by fit, not by mood</h2>
          </div>
          <p className="retreat-filter-count">
            {filteredRetreats.length} retreat
            {filteredRetreats.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="retreat-filter-grid">
          <label className="retreat-field retreat-field--wide">
            <span>Search</span>
            <input
              type="search"
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="Name, location, or notes"
            />
          </label>

          <label className="retreat-field">
            <span>Orientation</span>
            <select
              name="orientation"
              value={filters.orientation}
              onChange={handleChange}
            >
              <option value="">All</option>
              {categories.orientation.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="retreat-field">
            <span>Intensity</span>
            <select
              name="intensity"
              value={filters.intensity}
              onChange={handleChange}
            >
              <option value="">All</option>
              {categories.intensity.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="retreat-field">
            <span>Duration</span>
            <select
              name="duration"
              value={filters.duration}
              onChange={handleChange}
            >
              <option value="">All</option>
              {categories.duration.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="retreat-field">
            <span>Best for</span>
            <select
              name="bestFor"
              value={filters.bestFor}
              onChange={handleChange}
            >
              <option value="">All</option>
              {categories.bestFor.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="retreat-filter-actions">
          <label className="retreat-checkbox">
            <input
              type="checkbox"
              name="featuredOnly"
              checked={filters.featuredOnly}
              onChange={handleChange}
            />
            <span>Featured only</span>
          </label>

          <button
            type="button"
            className="button-link button-link--quiet retreat-reset"
            onClick={resetFilters}
          >
            Clear filters
          </button>
        </div>
      </section>

      <div className="retreat-card-grid">
        {filteredRetreats.map((retreat) => (
          <article key={retreat.slug} className="panel retreat-card">
            <div className="retreat-card-top">
              <div>
                <p className="retreat-kicker">
                  {retreat.orientation}
                  {retreat.featured ? "  •  Featured" : ""}
                </p>
                <h3>{retreat.name}</h3>
              </div>
              <a href={retreat.website} target="_blank" rel="noreferrer">
                Visit site
              </a>
            </div>

            <p className="retreat-location">{retreat.location}</p>
            <p className="retreat-notes">{retreat.notes}</p>

            <dl className="retreat-meta">
              <div>
                <dt>Mode</dt>
                <dd>{retreat.primaryMode.join(", ")}</dd>
              </div>
              <div>
                <dt>Intensity</dt>
                <dd>{retreat.intensity}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{retreat.duration}</dd>
              </div>
              <div>
                <dt>Silence</dt>
                <dd>{retreat.silenceLevel}</dd>
              </div>
              <div>
                <dt>Teacher access</dt>
                <dd>{retreat.teacherAccess}</dd>
              </div>
              <div>
                <dt>Cost style</dt>
                <dd>{retreat.costStyle}</dd>
              </div>
              <div>
                <dt>Stay</dt>
                <dd>{retreat.accommodation}</dd>
              </div>
              <div>
                <dt>Food</dt>
                <dd>{retreat.food}</dd>
              </div>
            </dl>

            <div className="retreat-copy">
              <p>
                <strong>Best for:</strong> {retreat.bestFor.join(", ")}
              </p>
              <p>
                <strong>Why choose:</strong> {retreat.whyChoose}
              </p>
              <p>
                <strong>Why not:</strong> {retreat.whyNot}
              </p>
              <p>
                <strong>Cautions:</strong> {retreat.cautions.join(" ")}
              </p>
            </div>
          </article>
        ))}
      </div>

      {filteredRetreats.length === 0 ? (
        <section className="panel prose">
          <h2>No exact match</h2>
          <p>
            That does not mean the right retreat is absent. It may mean your
            filters are too narrow, or that what you need is not yet a retreat
            at all but rest, study, or a simpler first experiment.
          </p>
        </section>
      ) : null}
    </div>
  );
}
