"use client";

import { useMemo, useState } from "react";

const resultLibrary = {
  vedanta: {
    title: "Vedanta retreat",
    summary:
      "You seem to be looking for clarity, guidance, and a teaching-centered environment. A retreat rooted in study, reflection, and a steady vision of life may serve you well right now.",
    alsoConsider: ["Gentle reorientation stay", "Devotional retreat"],
    avoidForNow: "Rigorous silent retreat",
  },
  vipassana: {
    title: "Silent meditation retreat",
    summary:
      "Your answers suggest readiness for structure, inwardness, and disciplined silence. A method-based meditation retreat may be a strong fit at this stage.",
    alsoConsider: ["Yoga ashram retreat", "Longer contemplative stay"],
    avoidForNow: "Highly social retreat format",
  },
  yoga: {
    title: "Yoga ashram retreat",
    summary:
      "You appear to be looking for a balanced retreat with practice, rhythm, simplicity, and inner steadiness. A yoga-ashram setting may help you reset without overwhelming you.",
    alsoConsider: ["Gentle reorientation stay", "Devotional retreat"],
    avoidForNow: "Very austere study-only format",
  },
  bhakti: {
    title: "Devotional retreat",
    summary:
      "You seem drawn to a prayerful and heart-centered environment. A retreat shaped by devotion, chanting, and spiritual atmosphere may nourish you more than a highly analytical format right now.",
    alsoConsider: ["Yoga ashram retreat", "Gentle reorientation stay"],
    avoidForNow: "Strict method-only retreat",
  },
  gentle: {
    title: "Gentle reorientation stay",
    summary:
      "Your answers suggest a need for simplicity, quietness, and spiritual breathing room rather than intensity. A gentle ashram stay or lighter retreat may be the most helpful first step.",
    alsoConsider: ["Devotional retreat", "Yoga ashram retreat"],
    avoidForNow: "Rigorous silent retreat",
  },
  vanaprastha: {
    title: "Longer vanaprastha-style stay",
    summary:
      "You seem to be looking not only for a retreat, but for reorientation. A longer stay in a simple, reflective environment may help you explore a quieter relationship with life.",
    alsoConsider: ["Vedanta retreat", "Gentle reorientation stay"],
    avoidForNow: "Fast, high-energy retreat format",
  },
};

function computeResult(answers) {
  const scores = {
    vedanta: 0,
    vipassana: 0,
    yoga: 0,
    bhakti: 0,
    gentle: 0,
    vanaprastha: 0,
  };

  if (answers.need === "Self-inquiry and understanding") scores.vedanta += 3;
  if (answers.need === "Meditation discipline") scores.vipassana += 3;
  if (answers.need === "Devotion and prayerful atmosphere") scores.bhakti += 3;
  if (answers.need === "Rest and inner quiet") scores.gentle += 3;
  if (answers.need === "A simpler way of living") scores.yoga += 2;
  if (answers.need === "Longer spiritual reorientation") scores.vanaprastha += 4;

  if (answers.guidance === "A clear teaching method") scores.vedanta += 2;
  if (answers.guidance === "Mostly silence and structure") scores.vipassana += 2;
  if (answers.guidance === "Direct access to a teacher") scores.vedanta += 1;
  if (answers.guidance === "A devotional environment") scores.bhakti += 2;
  if (answers.guidance === "A balanced mix of practice and reflection") scores.yoga += 2;

  if (answers.intensity === "Gentle") scores.gentle += 2;
  if (answers.intensity === "Moderate") {
    scores.vedanta += 1;
    scores.yoga += 1;
    scores.bhakti += 1;
  }
  if (answers.intensity === "Rigorous") scores.vipassana += 2;

  if (answers.orientation === "Vedanta") scores.vedanta += 3;
  if (answers.orientation === "Silent meditation") scores.vipassana += 3;
  if (answers.orientation === "Yoga") scores.yoga += 3;
  if (answers.orientation === "Bhakti") scores.bhakti += 3;
  if (answers.orientation === "Open exploration") scores.gentle += 1;

  if (answers.stage === "Beginner") {
    scores.gentle += 1;
    scores.yoga += 1;
  }
  if (answers.stage === "Sincere householder") {
    scores.vedanta += 1;
    scores.bhakti += 1;
  }
  if (answers.stage === "Serious seeker") {
    scores.vedanta += 1;
    scores.vipassana += 1;
  }
  if (answers.stage === "Exploring vanaprastha / life simplification") {
    scores.vanaprastha += 3;
    scores.vedanta += 1;
    scores.gentle += 1;
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  return sorted[0][0];
}

export default function RetreatAssessment({ questions }) {
  const [answers, setAnswers] = useState({});

  const allAnswered = questions.every((q) => answers[q.id]);

  const resultKey = useMemo(() => {
    if (!allAnswered) return null;
    return computeResult(answers);
  }, [answers, allAnswered]);

  const result = resultKey ? resultLibrary[resultKey] : null;

  return (
    <div className="space-y-6">
      {questions.map((item, index) => (
        <article
          key={item.id}
          className="rounded-3xl border border-neutral-200 bg-white p-6"
        >
          <h3 className="text-lg font-semibold text-neutral-900">
            {index + 1}. {item.question}
          </h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {item.options.map((option) => {
              const selected = answers[item.id] === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() =>
                    setAnswers((prev) => ({ ...prev, [item.id]: option }))
                  }
                  className={`rounded-full px-4 py-2 text-sm transition ${
                    selected
                      ? "bg-neutral-900 text-white"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </article>
      ))}

      {allAnswered && result && (
        <section className="rounded-[2rem] border border-neutral-200 bg-neutral-50 p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            Your present fit
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">
            {result.title}
          </h3>
          <p className="mt-4 text-base leading-8 text-neutral-700">
            {result.summary}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-white p-5">
              <h4 className="text-sm font-semibold text-neutral-900">
                Also consider
              </h4>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-neutral-700">
                {result.alsoConsider.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-5">
              <h4 className="text-sm font-semibold text-neutral-900">
                Probably not first choice right now
              </h4>
              <p className="mt-3 text-sm leading-7 text-neutral-700">
                {result.avoidForNow}
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-neutral-200 bg-white p-5">
            <h4 className="text-sm font-semibold text-neutral-900">
              A quiet note
            </h4>
            <p className="mt-3 text-sm leading-7 text-neutral-700">
              This is not a final judgment. It is only a gentle pointer toward
              the kind of retreat that may serve you best at this point in life.
            </p>
          </div>
        </section>
      )}
    </div>
  );
}
