"use client";

import { useMemo, useState } from "react";
import { defaultFilters, normalizeFilters } from "./filterState";

const filterConfig = [
  {
    key: "orientation",
    label: "Orientation",
    allLabel: "All",
  },
  {
    key: "intensity",
    label: "Intensity",
    allLabel: "All",
  },
  {
    key: "bestFor",
    label: "Best for",
    allLabel: "All",
  },
];

function joinPhrases(parts) {
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]} and ${parts[1]}`;
  return `${parts.slice(0, -1).join(", ")}, and ${parts.at(-1)}`;
}

function buildReflectiveSummary(filters) {
  const phrases = [];

  if (filters.orientation === "Vedanta") {
    phrases.push("a clearer teaching container");
  }
  if (filters.orientation === "Vipassana") {
    phrases.push("silence with method and discipline");
  }
  if (filters.orientation === "Yoga") {
    phrases.push("healing, steadiness, and embodied practice");
  }
  if (filters.orientation === "Bhakti") {
    phrases.push("shared practice, devotion, and sincerity");
  }
  if (filters.orientation === "Meditation") {
    phrases.push("meditation with a guided and devotional tone");
  }
  if (filters.orientation === "Nature / Hiking") {
    phrases.push("space, perspective, and time in nature");
  }

  if (filters.intensity === "Gentle") {
    phrases.push("a gentler level of demand");
  }
  if (filters.intensity === "Moderate") {
    phrases.push("some structure without overload");
  }
  if (filters.intensity === "Rigorous") {
    phrases.push("a more serious and disciplined container");
  }

  if (filters.bestFor === "Beginners") {
    phrases.push("an approachable first step");
  }
  if (filters.bestFor === "Householders") {
    phrases.push("something that respects ordinary responsibilities");
  }
  if (filters.bestFor === "Serious seekers") {
    phrases.push("a retreat with more inward seriousness");
  }
  if (filters.bestFor === "Repeat practitioners") {
    phrases.push("a setting that can hold some prior practice");
  }
  if (filters.bestFor === "Vanaprastha exploration") {
    phrases.push("simplicity, perspective, and a quieter stage of life");
  }

  if (phrases.length === 0) return "";

  return `You seem to be looking for ${joinPhrases(
    phrases
  )}, rather than a retreat chosen mainly for atmosphere or novelty.`;
}

function buildCardFit(filters, retreat) {
  const phrases = [];

  if (filters.orientation) {
    if (retreat.orientation === "Vedanta") {
      phrases.push("structure and teaching");
    }
    if (retreat.orientation === "Vipassana") {
      phrases.push("silence and clear method");
    }
    if (retreat.orientation === "Yoga") {
      phrases.push("healing rhythm and steady practice");
    }
    if (retreat.orientation === "Bhakti") {
      phrases.push("devotion and shared spiritual life");
    }
    if (retreat.orientation === "Meditation") {
      phrases.push("meditation in a guided spiritual setting");
    }
    if (retreat.orientation === "Nature / Hiking") {
      phrases.push("nature, perspective, and a quieter reset");
    }
  }

  if (filters.intensity === "Gentle") {
    phrases.push("a lower-pressure pace");
  }
  if (filters.intensity === "Moderate") {
    phrases.push("a moderate level of seriousness");
  }
  if (filters.intensity === "Rigorous") {
    phrases.push("a more demanding container");
  }

  if (filters.bestFor === "Beginners") {
    phrases.push("an accessible entry point");
  }
  if (filters.bestFor === "Householders") {
    phrases.push("a fit for everyday life responsibilities");
  }
  if (filters.bestFor === "Serious seekers") {
    phrases.push("inward seriousness");
  }
  if (filters.bestFor === "Repeat practitioners") {
    phrases.push("some prior familiarity with practice");
  }
  if (filters.bestFor === "Vanaprastha exploration") {
    phrases.push("simplicity and reorientation");
  }

  if (phrases.length === 0) return "";

  return `Why this may fit you: You seem to be looking for ${joinPhrases(
    phrases
  )}.`;
}

function getFilterOptions(retreats, key) {
  if (key === "bestFor") {
    return Array.from(new Set(retreats.flatMap((retreat) => retreat.bestFor))).sort();
  }

  return Array.from(new Set(retreats.map((retreat) => retreat[key]))).sort();
}

function getCompareLabel(count) {
  if (count === 0) return "Compare";
  return `Compare (${count}/2)`;
}

export default function RetreatFilters({ retreats, filters, onFiltersChange }) {
  const [compareSlugs, setCompareSlugs] = useState([]);
  const safeFilters = useMemo(() => normalizeFilters(filters), [filters]);

  const filterOptions = useMemo(
    () =>
      filterConfig.reduce((accumulator, item) => {
        accumulator[item.key] = getFilterOptions(retreats, item.key);
        return accumulator;
      }, {}),
    [retreats]
  );

  const filteredRetreats = useMemo(
    () =>
      retreats.filter((retreat) => {
        const matchesOrientation =
          !safeFilters.orientation ||
          retreat.orientation === safeFilters.orientation;
        const matchesIntensity =
          !safeFilters.intensity || retreat.intensity === safeFilters.intensity;
        const matchesBestFor =
          !safeFilters.bestFor || retreat.bestFor.includes(safeFilters.bestFor);

        return matchesOrientation && matchesIntensity && matchesBestFor;
      }),
    [retreats, safeFilters]
  );

  const compareRetreats = useMemo(
    () => retreats.filter((retreat) => compareSlugs.includes(retreat.slug)),
    [compareSlugs, retreats]
  );

  const hasActiveFilters = Object.values(safeFilters).some(Boolean);
  const reflectiveSummary = buildReflectiveSummary(safeFilters);

  function updateFilter(key, value) {
    onFiltersChange({
      ...safeFilters,
      [key]: value,
    });
  }

  function clearFilters() {
    onFiltersChange(defaultFilters);
  }

  function toggleCompare(slug) {
    setCompareSlugs((current) => {
      if (current.includes(slug)) {
        return current.filter((item) => item !== slug);
      }

      if (current.length >= 2) {
        return current;
      }

      return [...current, slug];
    });
  }

  return (
    <div className="stack">
      <section className="panel retreat-filter-panel">
        <div className="retreat-filter-heading">
          <div>
            <p className="retreat-kicker">Repository</p>
            <h2>Find a retreat by fit, not by mood</h2>
          </div>
          <p className="retreat-filter-count">
            {filteredRetreats.length}{" "}
            {filteredRetreats.length === 1 ? "retreat" : "retreats"} found
          </p>
        </div>

        <div className="retreat-filter-stack">
          {filterConfig.map((item) => (
            <div key={item.key} className="retreat-filter-group">
              <p className="retreat-filter-label">{item.label}</p>
              <div className="retreat-filter-chip-row">
                <button
                  type="button"
                  className={`retreat-filter-chip${
                    (safeFilters?.[item.key] ?? "") === "" ? " is-active" : ""
                  }`}
                  onClick={() => updateFilter(item.key, "")}
                  aria-pressed={(safeFilters?.[item.key] ?? "") === ""}
                >
                  {item.allLabel}
                </button>

                {filterOptions[item.key].map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`retreat-filter-chip${
                      safeFilters?.[item.key] === option ? " is-active" : ""
                    }`}
                    onClick={() => updateFilter(item.key, option)}
                    aria-pressed={safeFilters?.[item.key] === option}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="retreat-filter-actions">
          <div className="retreat-active-filter-list" aria-live="polite">
            {hasActiveFilters ? (
              <>
                {safeFilters.orientation ? (
                  <span className="retreat-active-filter">
                    Orientation: {safeFilters.orientation}
                  </span>
                ) : null}
                {safeFilters.intensity ? (
                  <span className="retreat-active-filter">
                    Intensity: {safeFilters.intensity}
                  </span>
                ) : null}
                {safeFilters.bestFor ? (
                  <span className="retreat-active-filter">
                    Best for: {safeFilters.bestFor}
                  </span>
                ) : null}
              </>
            ) : (
              <span className="retreat-filter-hint">
                Start broad, then narrow quietly.
              </span>
            )}
          </div>

          <button
            type="button"
            className="button-link button-link--quiet retreat-reset"
            onClick={clearFilters}
          >
            Clear filters
          </button>
        </div>
      </section>

      {reflectiveSummary ? (
        <section className="panel retreat-summary-panel">
          <p className="retreat-summary-kicker">A quiet reading of your filters</p>
          <p className="retreat-summary-copy">{reflectiveSummary}</p>
        </section>
      ) : null}

      <div className="retreat-card-grid retreat-card-grid--single">
        {filteredRetreats.map((retreat) => {
          const compareSelected = compareSlugs.includes(retreat.slug);
          const compareDisabled =
            !compareSelected && compareSlugs.length >= 2;
          const fitLine = hasActiveFilters
            ? buildCardFit(safeFilters, retreat)
            : "";

          return (
            <article key={retreat.slug} className="panel retreat-card">
              <div className="retreat-card-top">
                <div>
                  <p className="retreat-kicker">
                    {retreat.orientation}
                    {retreat.featured ? "  •  Featured" : ""}
                  </p>
                  <h3>{retreat.name}</h3>
                  <p className="retreat-location">{retreat.location}</p>
                </div>

                <div className="retreat-card-actions-row">
                  <button
                    type="button"
                    className={`button-link button-link--quiet retreat-compare-toggle${
                      compareSelected ? " is-active" : ""
                    }`}
                    onClick={() => toggleCompare(retreat.slug)}
                    aria-pressed={compareSelected}
                    disabled={compareDisabled}
                  >
                    {compareSelected ? "Selected" : getCompareLabel(compareSlugs.length)}
                  </button>

                  <a
                    href={retreat.website}
                    target="_blank"
                    rel="noreferrer"
                    className="button-link"
                  >
                    Official site
                  </a>
                </div>
              </div>

              {fitLine ? <p className="retreat-fit-line">{fitLine}</p> : null}

              <dl className="retreat-meta retreat-meta--expanded">
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
                <div>
                  <dt>Best for</dt>
                  <dd>{retreat.bestFor.join(", ")}</dd>
                </div>
              </dl>

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
                  <h4>Good fit tags</h4>
                  <div className="retreat-tag-list">
                    {retreat.bestFor.map((item) => (
                      <span key={item} className="retreat-tag">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="retreat-copy-block">
                  <h4>Quiet note</h4>
                  <p>{retreat.notes}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {filteredRetreats.length === 0 ? (
        <section className="panel prose">
          <h2>No exact match</h2>
          <p>
            That does not mean the right retreat is absent. It may only mean
            your filters are narrower than your present need.
          </p>
        </section>
      ) : null}

      {compareRetreats.length > 0 ? (
        <section className="panel retreat-compare-panel">
          <div className="retreat-filter-heading">
            <div>
              <p className="retreat-kicker">Compare</p>
              <h2>Look at two options side by side</h2>
            </div>
            <button
              type="button"
              className="button-link button-link--quiet retreat-reset"
              onClick={() => setCompareSlugs([])}
            >
              Clear compare
            </button>
          </div>

          {compareRetreats.length === 1 ? (
            <p className="retreat-compare-note">
              Select one more retreat if you want a quieter side-by-side view.
            </p>
          ) : null}

          <div className="retreat-compare-grid">
            {compareRetreats.map((retreat) => (
              <article key={retreat.slug} className="retreat-compare-card">
                <h3>{retreat.name}</h3>
                <p className="retreat-location">{retreat.location}</p>

                <dl className="retreat-compare-list">
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
                  <div>
                    <dt>Best for</dt>
                    <dd>{retreat.bestFor.join(", ")}</dd>
                  </div>
                  <div>
                    <dt>Why choose</dt>
                    <dd>{retreat.whyChoose}</dd>
                  </div>
                  <div>
                    <dt>Why not</dt>
                    <dd>{retreat.whyNot}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
