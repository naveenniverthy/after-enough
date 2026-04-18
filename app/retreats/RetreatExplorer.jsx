"use client";

import { useState } from "react";
import RetreatAssessment from "./RetreatAssessment";
import RetreatFilters from "./RetreatFilters";
import { defaultFilters, normalizeFilters } from "./filterState";

const choosePoints = [
  "Clarity of purpose. Is the retreat honest about whether it offers rest, teaching, silence, or a more devotional atmosphere?",
  "Depth and structure. Ask whether the daily rhythm will genuinely support your present need, not simply give you a change of scenery.",
  "Teacher quality and lineage. Seriousness often matters more than style, especially if you are looking for understanding rather than mood.",
  "Environment and fit. A calm place helps, but the right level of intensity matters just as much as beautiful surroundings.",
];

const orientationGuide = [
  {
    label: "Silence",
    value: "Vipassana",
    text: "If what you need is clear method, inwardness, and silence, a Vipassana-style container may be the clearest place to begin.",
  },
  {
    label: "Teaching and clarity",
    value: "Vedanta / Ashram",
    text: "If you want understanding more than atmosphere, choose a teaching-centered ashram or Vedanta retreat.",
  },
  {
    label: "Health and recovery",
    value: "Yoga / Ayurveda",
    text: "If your system is tired, body-mind healing and gentler structure may serve you better than a more austere format.",
  },
  {
    label: "Simplicity and perspective",
    value: "Nature / hiking retreats",
    text: "If you want nature and perspective, choose a hiking or reset-oriented retreat that creates space without pretending to be something else.",
  },
  {
    label: "Devotion and shared practice",
    value: "Bhakti / service retreats",
    text: "If your heart responds to prayer, chanting, and shared discipline, a devotional retreat may be more natural than a purely analytical one.",
  },
];

const startHerePaths = [
  {
    id: "rest",
    title: "I need rest",
    text: "Start with gentler stays that give you quiet and steadiness without asking for too much too quickly.",
    filters: {
      orientation: "",
      intensity: "Gentle",
      bestFor: "",
    },
  },
  {
    id: "healing",
    title: "I want healing",
    text: "Begin with yoga-oriented places where recovery, rhythm, and embodied care are part of the container.",
    filters: {
      orientation: "Yoga",
      intensity: "Gentle",
      bestFor: "",
    },
  },
  {
    id: "meditation",
    title: "I am curious about meditation",
    text: "A beginner-friendly entry point is often wiser than choosing the most demanding silent format immediately.",
    filters: {
      orientation: "",
      intensity: "",
      bestFor: "Beginners",
    },
  },
  {
    id: "clarity",
    title: "I want serious spiritual clarity",
    text: "If understanding matters more than novelty, look first at teaching-centered retreats with real structure.",
    filters: {
      orientation: "Vedanta",
      intensity: "Moderate",
      bestFor: "",
    },
  },
  {
    id: "nature",
    title: "I want nature and reset",
    text: "Choose lower-pressure options that leave room for perspective, simplicity, and a slower pace.",
    filters: {
      orientation: "Nature / Hiking",
      intensity: "",
      bestFor: "",
    },
  },
];

const commonMistakes = [
  {
    title: "Choosing intensity too early",
    text: "A more demanding retreat is not automatically a better retreat. It may simply be more than you can truly receive right now.",
  },
  {
    title: "Mistaking atmosphere for depth",
    text: "A beautiful setting, language, or reputation can feel meaningful while offering little actual clarity or transformation.",
  },
  {
    title: "Going for identity or escape",
    text: "If the deeper movement is toward image, belonging, or avoidance, the retreat may become another form of distraction.",
  },
];

export default function RetreatExplorer({
  retreats,
  categories,
  assessmentQuestions,
}) {
  const [filters, setFilters] = useState(defaultFilters);
  const [activePath, setActivePath] = useState("");

  function handleGuideSelect(path) {
    setFilters(normalizeFilters(path.filters));
    setActivePath(path.id);

    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        document
          .getElementById("retreat-repository")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }

  function handleFiltersChange(nextFilters) {
    const safeFilters = normalizeFilters(nextFilters);

    setFilters(safeFilters);

    const matchingPath = startHerePaths.find(
      (path) =>
        path.filters.orientation === safeFilters.orientation &&
        path.filters.intensity === safeFilters.intensity &&
        path.filters.bestFor === safeFilters.bestFor
    );

    setActivePath(matchingPath ? matchingPath.id : "");
  }

  return (
    <main className="page">
      <section className="hero retreats-essay-hero">
        <p className="eyebrow">Retreats</p>
        <h1>Choose with clarity</h1>
        <p className="lead">
          A retreat can help. The quieter question is whether it fits what you
          actually need now.
        </p>
      </section>

      <section className="essay-card">
        <p>
          Some retreats offer silence. Some offer teaching. Some offer healing,
          devotion, or simple distance from routine.
        </p>
        <p>
          This page is not meant to create excitement. It is meant to help you
          choose with more honesty, seriousness, and inward fit.
        </p>
        <p>
          Not all retreats are spiritual in the traditional sense. Some simply
          create space and that can be enough.
        </p>
      </section>

      <section className="essay-card">
        <div className="retreat-section-heading">
          <div>
            <h2>Start here</h2>
            <p className="retreat-section-intro">
              If the choice still feels wide, begin with the kind of help you
              seem to need most.
            </p>
          </div>
        </div>

        <div className="guided-path-grid">
          {startHerePaths.map((path) => {
            const isActive = activePath === path.id;

            return (
              <button
                key={path.id}
                type="button"
                className={`guided-path-card${isActive ? " is-active" : ""}`}
                onClick={() => handleGuideSelect(path)}
                aria-pressed={isActive}
              >
                <span className="guided-path-label">{path.title}</span>
                <span className="guided-path-text">{path.text}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="essay-card">
        <h2>How to choose</h2>
        <div className="simple-list">
          {choosePoints.map((point) => (
            <p key={point}>{point}</p>
          ))}
        </div>
      </section>

      <section className="essay-card">
        <h2>Types of retreats</h2>
        <div className="stack-grid">
          {categories.map((category) => (
            <article key={category.slug} className="soft-card">
              <h3>{category.label}</h3>
              <p>{category.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="essay-card">
        <h2>Self-assessment</h2>
        <p>
          Before choosing a retreat, ask what you truly need rather than what
          merely sounds meaningful.
        </p>
        <p>
          The real question is not, “Which retreat is most impressive?” It is,
          “What is actually right for me at this point in life?”
        </p>

        <RetreatAssessment questions={assessmentQuestions} />
      </section>

      <section className="essay-card">
        <h2>Not sure where to begin?</h2>
        <div className="stack-grid">
          {orientationGuide.map((item) => (
            <article key={item.label} className="soft-card">
              <p className="retreat-mini-label">{item.label}</p>
              <h3>{item.value}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="essay-card">
        <h2>What people often get wrong</h2>
        <div className="stack-grid">
          {commonMistakes.map((item) => (
            <article key={item.title} className="soft-card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="essay-card">
        <h2>A retreat can help, but it cannot do your seeing for you.</h2>
        <p>
          At best, it gives space, perspective, and a more honest mirror. What
          matters is whether you meet that space sincerely.
        </p>
      </section>

      <section className="essay-card" id="retreat-repository">
        <p className="repository-intro">
          Browse quietly. Start with fit, not projection.
        </p>
        <RetreatFilters
          retreats={retreats}
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
      </section>
    </main>
  );
}
