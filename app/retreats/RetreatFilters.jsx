'use client'

import { useState } from "react";

export default function RetreatFilters({ retreats, categories }) {
  const [orientation, setOrientation] = useState("All");
  const [intensity, setIntensity] = useState("All");
  const [bestFor, setBestFor] = useState("All");

  const orientationOptions = Array.from(
    new Set(retreats.map((retreat) => retreat.orientation))
  ).sort();
  const intensityOptions = Array.from(
    new Set(retreats.map((retreat) => retreat.intensity))
  );
  const bestForOptions = Array.from(
    new Set(retreats.flatMap((retreat) => retreat.bestFor))
  ).sort();
  const categoryCards = Array.isArray(categories)
    ? categories
    : [];

  const filteredRetreats = retreats.filter((retreat) => {
    const matchOrientation =
      orientation === "All" || retreat.orientation === orientation;
    const matchIntensity = intensity === "All" || retreat.intensity === intensity;
    const matchBestFor = bestFor === "All" || retreat.bestFor.includes(bestFor);

    return matchOrientation && matchIntensity && matchBestFor;
  });

  return (
    <div className="stack">
      {categoryCards.length > 0 ? (
        <section className="essay-card">
          <div className="stack-grid retreat-category-grid">
            {categoryCards.map((category) => (
              <article key={category.slug} className="soft-card">
                <h3>{category.label}</h3>
                <p>{category.description}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <section className="panel retreat-filter-panel">
        <div className="retreat-filter-heading">
          <div>
            <p className="retreat-kicker">Repository</p>
            <h2>Find a retreat by fit, not by projection</h2>
          </div>
          <p className="retreat-filter-count">
            {filteredRetreats.length} retreat
            {filteredRetreats.length === 1 ? "" : "s"} found
          </p>
        </div>

        <div className="retreat-filter-grid retreat-filter-grid--three">
          <label className="retreat-field">
            <span>Orientation</span>
            <select
              value={orientation}
              onChange={(event) => setOrientation(event.target.value)}
            >
              <option>All</option>
              {orientationOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="retreat-field">
            <span>Intensity</span>
            <select
              value={intensity}
              onChange={(event) => setIntensity(event.target.value)}
            >
              <option>All</option>
              {intensityOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <label className="retreat-field">
            <span>Best for</span>
            <select
              value={bestFor}
              onChange={(event) => setBestFor(event.target.value)}
            >
              <option>All</option>
              {bestForOptions.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <div className="retreat-card-grid retreat-card-grid--single">
        {filteredRetreats.map((retreat) => (
          <article key={retreat.slug} className="panel retreat-card">
            <div className="retreat-card-top">
              <div>
                <p className="retreat-kicker">{retreat.orientation}</p>
                <h3>{retreat.name}</h3>
                <p className="retreat-location">{retreat.location}</p>
              </div>

              <a href={retreat.website} target="_blank" rel="noreferrer">
                Visit official site
              </a>
            </div>

            <div className="retreat-meta retreat-meta--three">
              <div>
                <dt>Orientation</dt>
                <dd>{retreat.orientation}</dd>
              </div>

              <div>
                <dt>Intensity</dt>
                <dd>{retreat.intensity}</dd>
              </div>

              <div>
                <dt>Duration</dt>
                <dd>{retreat.duration}</dd>
              </div>
            </div>

            <div className="retreat-detail-grid">
              <div className="retreat-copy-block">
                <h4>Why someone may choose it</h4>
                <p>{retreat.whyChoose}</p>
              </div>

              <div className="retreat-copy-block">
                <h4>Why someone may not</h4>
                <p>{retreat.whyNot}</p>
              </div>
            </div>

            <div className="retreat-detail-grid">
              <div className="retreat-copy-block">
                <h4>Good fit for</h4>
                <div className="retreat-tag-list">
                  {retreat.bestFor.map((item) => (
                    <span key={item} className="retreat-tag">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="retreat-copy-block">
                <h4>Notes of caution</h4>
                <ul className="retreat-caution-list">
                  {retreat.cautions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="retreat-note-box">
              <div className="retreat-note-label">Quiet note</div>
              <p>{retreat.notes}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
