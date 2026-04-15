"use client";

import { useEffect, useMemo, useState } from "react";

const QUESTIONS = [
  {
    id: "q1",
    text: "What kind of activity leaves you feeling more alive afterward?",
    options: [
      { label: "Helping or listening to people", tags: ["service", "people"] },
      { label: "Making or building something useful", tags: ["craft", "build"] },
      { label: "Studying, reflecting, or reading deeply", tags: ["wisdom", "solitude"] },
      { label: "Teaching, explaining, or guiding", tags: ["teach", "people"] },
    ],
  },
  {
    id: "q2",
    text: "What do people naturally come to you for?",
    options: [
      { label: "Advice and perspective", tags: ["teach", "wisdom"] },
      { label: "Getting things organized", tags: ["structure", "build"] },
      { label: "Care, support, and empathy", tags: ["service", "healing"] },
      { label: "Ideas and creative direction", tags: ["creative", "freedom"] },
    ],
  },
  {
    id: "q3",
    text: "Which kind of contribution matters most to you now?",
    options: [
      { label: "Helping individuals grow", tags: ["teach", "service"] },
      { label: "Creating something meaningful", tags: ["creative", "build"] },
      { label: "Reducing suffering and bringing care", tags: ["healing", "service"] },
      { label: "Living and sharing wisdom", tags: ["wisdom", "teach"] },
    ],
  },
  {
    id: "q4",
    text: "What kind of rhythm feels most natural to you?",
    options: [
      { label: "Quiet, spacious, and reflective", tags: ["solitude", "wisdom"] },
      { label: "Structured and productive", tags: ["structure", "build"] },
      { label: "Flexible and creative", tags: ["freedom", "creative"] },
      { label: "Relational and service-oriented", tags: ["people", "service"] },
    ],
  },
  {
    id: "q5",
    text: "When you imagine your next chapter, what feels most attractive?",
    options: [
      { label: "Mentoring or teaching", tags: ["teach", "people"] },
      { label: "A simpler and quieter life", tags: ["solitude", "simplicity"] },
      { label: "Meaningful projects on my own terms", tags: ["freedom", "build"] },
      { label: "Care, healing, or support work", tags: ["healing", "service"] },
    ],
  },
  {
    id: "q6",
    text: "How much structure do you want in your days?",
    options: [
      { label: "A lot. I like rhythm and clarity", tags: ["structure"] },
      { label: "Some, but not too much", tags: ["build", "people"] },
      { label: "Very little. I want freedom", tags: ["freedom"] },
      { label: "Enough to support inner life", tags: ["simplicity", "wisdom"] },
    ],
  },
  {
    id: "q7",
    text: "Which setting appeals to you most?",
    options: [
      { label: "Small groups, classes, or mentoring circles", tags: ["teach", "people"] },
      { label: "Home studio, workshop, or independent practice", tags: ["craft", "build"] },
      { label: "Retreats, nature, or contemplative spaces", tags: ["solitude", "nature", "wisdom"] },
      { label: "Community spaces, care settings, or local service", tags: ["service", "healing", "people"] },
    ],
  },
  {
    id: "q8",
    text: "Which statement sounds most like you?",
    options: [
      { label: "I want to pass on what I know", tags: ["teach"] },
      { label: "I want to make life simpler and lighter", tags: ["simplicity"] },
      { label: "I want to create useful things", tags: ["build", "craft"] },
      { label: "I want to support others directly", tags: ["service", "healing"] },
    ],
  },
  {
    id: "q9",
    text: "What kind of challenge are you most willing to take on?",
    options: [
      { label: "Helping people through confusion", tags: ["teach", "service"] },
      { label: "Building something from scratch", tags: ["build", "freedom"] },
      { label: "Doing the inner work of reflection and self-honesty", tags: ["wisdom", "solitude"] },
      { label: "Showing up consistently to care for others", tags: ["healing", "service"] },
    ],
  },
  {
    id: "q10",
    text: "Which kind of satisfaction feels deepest to you?",
    options: [
      { label: "Seeing someone grow because of my help", tags: ["teach", "service"] },
      { label: "Completing a meaningful piece of work", tags: ["build", "craft"] },
      { label: "Feeling inwardly settled and clear", tags: ["wisdom", "simplicity"] },
      { label: "Living with freedom and self-direction", tags: ["freedom", "creative"] },
    ],
  },
  {
    id: "q11",
    text: "How important is income in this next phase?",
    options: [
      { label: "Very important. I still need strong earnings", tags: ["build", "structure"] },
      { label: "Moderately important. I want some paid work", tags: ["portfolio"] },
      { label: "Less important. Meaning matters more now", tags: ["wisdom", "service"] },
      { label: "Minimal. I want freedom over income", tags: ["simplicity", "freedom"] },
    ],
  },
  {
    id: "q12",
    text: "What kind of work feels easiest for you to sustain?",
    options: [
      { label: "Teaching, speaking, or writing", tags: ["teach", "creative"] },
      { label: "Building systems, tools, or projects", tags: ["build", "structure"] },
      { label: "One-to-one support or care", tags: ["healing", "service"] },
      { label: "Study, reflection, and thoughtful living", tags: ["wisdom", "solitude"] },
    ],
  },
  {
    id: "q13",
    text: "What do you want less of?",
    options: [
      { label: "Noise, rush, and constant pressure", tags: ["simplicity", "solitude"] },
      { label: "Pointless work without meaning", tags: ["wisdom", "service"] },
      { label: "Too much dependence on others’ agendas", tags: ["freedom"] },
      { label: "Isolation and lack of human connection", tags: ["people", "service"] },
    ],
  },
  {
    id: "q14",
    text: "What do you want more of?",
    options: [
      { label: "Depth and inner clarity", tags: ["wisdom"] },
      { label: "Contribution and usefulness", tags: ["service", "build"] },
      { label: "Creative expression", tags: ["creative", "freedom"] },
      { label: "Meaningful relationships", tags: ["people", "healing"] },
    ],
  },
  {
    id: "q15",
    text: "Which kind of role sounds most natural?",
    options: [
      { label: "Mentor", tags: ["teach"] },
      { label: "Maker", tags: ["craft", "build"] },
      { label: "Caregiver", tags: ["healing", "service"] },
      { label: "Seeker", tags: ["wisdom", "solitude"] },
    ],
  },
  {
    id: "q16",
    text: "How do you prefer to help?",
    options: [
      { label: "By sharing insight", tags: ["teach", "wisdom"] },
      { label: "By doing practical work", tags: ["build", "service"] },
      { label: "By presence, support, and care", tags: ["healing", "people"] },
      { label: "By creating something thoughtful", tags: ["creative", "craft"] },
    ],
  },
  {
    id: "q17",
    text: "What kind of life experiment would excite you most?",
    options: [
      { label: "Running a small mentoring or teaching offering", tags: ["teach", "portfolio"] },
      { label: "Building a small meaningful business or project", tags: ["build", "freedom", "portfolio"] },
      { label: "Spending more time in study, retreat, or quiet practice", tags: ["wisdom", "solitude", "nature"] },
      { label: "Volunteering or serving locally", tags: ["service", "healing", "people"] },
    ],
  },
  {
    id: "q18",
    text: "Which tension do you feel most strongly now?",
    options: [
      { label: "I have knowledge but need a way to share it", tags: ["teach"] },
      { label: "I want freedom but still want structure", tags: ["freedom", "portfolio"] },
      { label: "I want peace but don’t want to disappear from life", tags: ["simplicity", "people"] },
      { label: "I want to care more deeply without burning out", tags: ["healing", "service"] },
    ],
  },
  {
    id: "q19",
    text: "What kind of environment supports your best self?",
    options: [
      { label: "Thoughtful conversation and learning", tags: ["teach", "wisdom"] },
      { label: "Independent focus and making", tags: ["build", "craft"] },
      { label: "Silence, nature, and reflection", tags: ["solitude", "nature", "simplicity"] },
      { label: "Warm people and shared purpose", tags: ["people", "service"] },
    ],
  },
  {
    id: "q20",
    text: "At this stage of life, what do you most want to become?",
    options: [
      { label: "Wiser and more inwardly free", tags: ["wisdom", "simplicity"] },
      { label: "More useful to others", tags: ["service", "healing"] },
      { label: "More expressive and self-directed", tags: ["creative", "freedom"] },
      { label: "More grounded in meaningful contribution", tags: ["build", "teach"] },
    ],
  },
];

const RESULT_PROFILES = [
  {
    key: "guide-mentor",
    title: "Guide and Mentor",
    description:
      "You seem drawn toward sharing insight, helping others grow, and offering perspective that comes from lived experience. This path fits people who want their next chapter to feel relational, useful, and quietly impactful.",
    looksLike: [
      "Mentoring younger professionals or students",
      "Teaching small groups or workshops",
      "Writing, speaking, or sharing frameworks",
      "Advisory or coaching-style contribution",
    ],
    watchOuts: [
      "Do not slip into over-advising or trying to rescue people",
      "Keep your own learning alive while teaching others",
      "Build structure so your contribution stays sustainable",
    ],
    nextSteps: [
      "Offer one small mentoring conversation each week",
      "Write down three lessons you have earned through experience",
      "Test a small teaching format before making bigger plans",
    ],
    suggestedReads: [
      "Life after financial independence",
      "What kind of work still feels worth doing",
      "How to move from success to contribution",
    ],
  },
  {
    key: "teacher-writer",
    title: "Teacher and Writer",
    description:
      "You seem to have both reflection and expression in you. This path fits people who want to clarify ideas, distill experience, and offer something thoughtful to others through words, teaching, or careful explanation.",
    looksLike: [
      "Writing essays, newsletters, or a book",
      "Teaching online or in small communities",
      "Building a thoughtful body of work over time",
      "Combining learning with sharing",
    ],
    watchOuts: [
      "Avoid endless preparation without publishing",
      "Do not hide behind ideas when real contact is needed",
      "Let your work stay simple and human, not overly polished",
    ],
    nextSteps: [
      "Publish one short piece on a topic you care about",
      "Create a list of themes you keep returning to",
      "Teach one idea in plain language to one real person",
    ],
    suggestedReads: [
      "How to share what you know without becoming preachy",
      "A quieter form of meaningful work",
      "Building a body of work after enough",
    ],
  },
  {
    key: "seeker-simplifier",
    title: "Seeker and Simplifier",
    description:
      "You seem to be drawn less by outward achievement and more by depth, clarity, simplicity, and inward steadiness. This path fits people who want their next phase to include reflection, study, retreat, and a lighter way of living.",
    looksLike: [
      "A slower, quieter daily rhythm",
      "Time for study, silence, retreat, or contemplation",
      "Selective commitments instead of full schedules",
      "A life shaped more by clarity than by status",
    ],
    watchOuts: [
      "Do not romanticize escape or withdrawal",
      "Simplicity still needs discipline and intention",
      "Stay connected to life, not only to solitude",
    ],
    nextSteps: [
      "Reduce one recurring source of noise or excess",
      "Try a one-day or weekend retreat",
      "Create a weekly block for reflection, reading, or silence",
    ],
    suggestedReads: [
      "Why life can feel incomplete even when it is fine",
      "A gentler transition into the next chapter",
      "Retreats and quiet spaces that may fit you",
    ],
  },
  {
    key: "community-contributor",
    title: "Community Contributor",
    description:
      "You seem energized by being useful in a human way. This path fits people who want connection, shared purpose, and practical contribution more than personal status or private success.",
    looksLike: [
      "Local service and community involvement",
      "Small-group facilitation or support roles",
      "Volunteering with skill and consistency",
      "Helping create healthier human spaces",
    ],
    watchOuts: [
      "Do not overcommit out of goodwill",
      "Choose contribution that matches your energy and capacity",
      "Meaning grows with rhythm, not just enthusiasm",
    ],
    nextSteps: [
      "Choose one cause or community to support regularly",
      "Offer one skill you already have in service of others",
      "Start small and keep it sustainable",
    ],
    suggestedReads: [
      "Meaning through contribution",
      "What service can look like after enough",
      "Finding the right scale of involvement",
    ],
  },
  {
    key: "builder-meaning",
    title: "Builder with Meaning",
    description:
      "You still have energy for creating, organizing, and making things happen — but you want it to matter. This path fits people who are not done building, but want their effort to be more aligned, intentional, and worthwhile.",
    looksLike: [
      "A small meaningful business or project",
      "Practical creation with clearer values",
      "Useful systems, tools, or offerings",
      "Purposeful work with more autonomy",
    ],
    watchOuts: [
      "Do not recreate the same treadmill in a nicer form",
      "Pause before saying yes to every opportunity",
      "Build around meaning, not only momentum",
    ],
    nextSteps: [
      "List three things you would still enjoy building",
      "Choose one small pilot instead of a big reinvention",
      "Define what success means beyond money",
    ],
    suggestedReads: [
      "What FIRE gets right — and what it misses",
      "Work you may still want after financial independence",
      "How to build without getting trapped again",
    ],
  },
  {
    key: "healing-care",
    title: "Healing and Care Path",
    description:
      "You seem deeply responsive to human need and drawn toward support, care, steadiness, and presence. This path fits people who want their next phase to be less about status and more about compassionate usefulness.",
    looksLike: [
      "Care-focused service or support work",
      "Listening, accompaniment, or wellbeing roles",
      "Spaces of trust, warmth, and healing",
      "A grounded life of practical compassion",
    ],
    watchOuts: [
      "Care without boundaries can become depletion",
      "You do not have to carry everything",
      "Rest and renewal are part of service",
    ],
    nextSteps: [
      "Choose one caring role that is sustainable for you",
      "Protect recovery time as part of the path",
      "Offer support where you can be steady, not stretched thin",
    ],
    suggestedReads: [
      "Care as meaningful work",
      "How to serve without burning out",
      "Creating a sustainable rhythm of contribution",
    ],
  },
  {
    key: "nature-retreat",
    title: "Nature and Retreat Path",
    description:
      "You seem drawn toward places and rhythms that restore the nervous system, deepen attention, and reconnect life with stillness. This path fits people who feel renewed by simplicity, nature, retreat spaces, and contemplative environments.",
    looksLike: [
      "Retreats, walking, nature-based renewal",
      "Simple living with periodic immersion",
      "Work or contribution connected to place and stillness",
      "A life shaped by depth more than speed",
    ],
    watchOuts: [
      "Do not confuse retreat with avoidance",
      "Beautiful settings still need grounded purpose",
      "Carry the learning back into daily life",
    ],
    nextSteps: [
      "Explore one retreat that matches your comfort and budget",
      "Take regular walks without screens or stimulation",
      "Notice what environments bring you back to yourself",
    ],
    suggestedReads: [
      "How to choose a retreat well",
      "Silence, simplicity, and life after enough",
      "What kind of retreat may fit you",
    ],
  },
  {
    key: "portfolio-life",
    title: "Portfolio Life Path",
    description:
      "You seem suited to a blended life rather than one identity. This path fits people who want meaning, flexibility, and variety — a mix of paid work, learning, service, reflection, and personal projects.",
    looksLike: [
      "Part-time work plus service or creative projects",
      "A flexible mix of income and meaning",
      "Multiple smaller roles instead of one defining role",
      "A life designed around rhythm, not one title",
    ],
    watchOuts: [
      "Too many moving parts can become scattered",
      "Freedom needs boundaries and priorities",
      "Keep the mix simple enough to sustain",
    ],
    nextSteps: [
      "Sketch your ideal week with 3 to 4 meaningful blocks",
      "Keep one paid stream and one meaning stream to start",
      "Review what adds life and what adds clutter",
    ],
    suggestedReads: [
      "Designing a softer second chapter",
      "Part-time work with meaning",
      "How to create a life with room in it",
    ],
  },
];

const PROFILE_RULES = [
  { key: "guide-mentor", tags: ["teach", "people", "service"] },
  { key: "teacher-writer", tags: ["teach", "creative", "wisdom"] },
  { key: "seeker-simplifier", tags: ["wisdom", "solitude", "simplicity"] },
  { key: "community-contributor", tags: ["service", "people", "healing"] },
  { key: "builder-meaning", tags: ["build", "structure", "craft"] },
  { key: "healing-care", tags: ["healing", "service", "people"] },
  { key: "nature-retreat", tags: ["nature", "solitude", "simplicity"] },
  { key: "portfolio-life", tags: ["portfolio", "freedom", "creative"] },
];

function scoreAnswers(answers) {
  const tagScores = {};

  answers.forEach((answer) => {
    answer.tags.forEach((tag) => {
      tagScores[tag] = (tagScores[tag] || 0) + 1;
    });
  });

  const profileScores = PROFILE_RULES.map((rule) => {
    const score = rule.tags.reduce((sum, tag) => sum + (tagScores[tag] || 0), 0);
    return { key: rule.key, score };
  }).sort((a, b) => b.score - a.score);

  return { tagScores, profileScores };
}

function getProfileByKey(key) {
  return RESULT_PROFILES.find((profile) => profile.key === key);
}

function getInitialAnswersFromUrl() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("answers");
  if (!raw) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(raw));
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export default function IkigaiAssessmentPage() {
  const [answers, setAnswers] = useState([]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const urlAnswers = getInitialAnswersFromUrl();
    if (urlAnswers && urlAnswers.length > 0) {
      setAnswers(urlAnswers);
      setStarted(true);
    }
  }, []);

  const currentIndex = answers.length;
  const currentQuestion = QUESTIONS[currentIndex];
  const isComplete = answers.length === QUESTIONS.length;

  const results = useMemo(() => {
    if (!isComplete) return null;
    const scored = scoreAnswers(answers);
    const primary = getProfileByKey(scored.profileScores[0]?.key);
    const secondary = getProfileByKey(scored.profileScores[1]?.key);
    return {
      ...scored,
      primary,
      secondary,
    };
  }, [answers, isComplete]);

  const progress = Math.round((answers.length / QUESTIONS.length) * 100);

  const handleSelect = (option) => {
    const nextAnswers = [
      ...answers,
      {
        questionId: currentQuestion.id,
        text: currentQuestion.text,
        label: option.label,
        tags: option.tags,
      },
    ];
    setAnswers(nextAnswers);
  };

  const handleBack = () => {
    setAnswers((prev) => prev.slice(0, -1));
  };

  const handleRestart = () => {
    setAnswers([]);
    setStarted(false);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("answers");
      window.history.replaceState({}, "", url.toString());
    }
  };

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("answers", encodeURIComponent(JSON.stringify(answers)));
    const shareUrl = url.toString();

    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Shareable result link copied.");
    } catch {
      alert("Could not copy the link automatically. Please copy it from the address bar.");
    }
  };

  return (
    <main className="ikigai-page">
      <section className="ikigai-shell">
        <header className="ikigai-hero">
          <p className="ikigai-eyebrow">After Enough</p>
          <h1>Ikigai assessment</h1>
          <p className="ikigai-intro">
            This is not a test of your worth. It is a reflective assessment to help you
            see what kind of meaningful life direction may fit you now.
          </p>
        </header>

        {!started && (
          <section className="ikigai-card">
            <h2>A calmer way to think about what comes next</h2>
            <p>
              Many people do not need another career quiz. They need a clearer sense of
              what kind of life, rhythm, and contribution fits the stage they are in.
            </p>
            <p>
              This assessment looks at energy, strengths, meaning, lifestyle fit, and
              inner direction. It takes about 5 minutes.
            </p>

            <div className="ikigai-actions">
              <button className="ikigai-button" onClick={() => setStarted(true)}>
                Start assessment
              </button>
            </div>
          </section>
        )}

        {started && !isComplete && currentQuestion && (
          <section className="ikigai-card">
            <div className="ikigai-progress-wrap">
              <div className="ikigai-progress-meta">
                <span>
                  Question {currentIndex + 1} of {QUESTIONS.length}
                </span>
                <span>{progress}% complete</span>
              </div>
              <div className="ikigai-progress">
                <div className="ikigai-progress-bar" style={{ width: `${progress}%` }} />
              </div>
            </div>

            <h2 className="ikigai-question">{currentQuestion.text}</h2>

            <div className="ikigai-options">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.label}
                  className="ikigai-option"
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="ikigai-actions split">
              <button
                className="ikigai-button secondary"
                onClick={handleBack}
                disabled={answers.length === 0}
              >
                Back
              </button>
              <button className="ikigai-button ghost" onClick={handleRestart}>
                Start over
              </button>
            </div>
          </section>
        )}

        {isComplete && results?.primary && (
          <>
            <section className="ikigai-card result">
              <p className="ikigai-result-label">Your likely direction</p>
              <h2>{results.primary.title}</h2>
              <p className="ikigai-result-description">{results.primary.description}</p>

              {results.secondary && (
                <p className="ikigai-secondary">
                  You also show signs of: <strong>{results.secondary.title}</strong>
                </p>
              )}

              <div className="ikigai-actions wrap">
                <button className="ikigai-button" onClick={handleShare}>
                  Copy shareable result link
                </button>
                <button className="ikigai-button secondary" onClick={handleRestart}>
                  Retake assessment
                </button>
              </div>
            </section>

            <section className="ikigai-grid">
              <article className="ikigai-card">
                <h3>Why this may fit you</h3>
                <p>{results.primary.description}</p>
              </article>

              <article className="ikigai-card">
                <h3>What this path may look like</h3>
                <ul className="ikigai-list">
                  {results.primary.looksLike.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="ikigai-card">
                <h3>Watch-outs</h3>
                <ul className="ikigai-list">
                  {results.primary.watchOuts.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>

              <article className="ikigai-card">
                <h3>Gentle next steps</h3>
                <ul className="ikigai-list">
                  {results.primary.nextSteps.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </section>

            <section className="ikigai-card">
              <h3>Suggestions for you</h3>
              <div className="ikigai-suggestions">
                {results.primary.suggestedReads.map((item) => (
                  <div className="ikigai-suggestion" key={item}>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="ikigai-card">
              <h3>Your answer snapshot</h3>
              <div className="ikigai-answer-list">
                {answers.map((answer, index) => (
                  <div className="ikigai-answer-row" key={answer.questionId}>
                    <div>
                      <p className="ikigai-answer-number">Question {index + 1}</p>
                      <p className="ikigai-answer-text">{answer.text}</p>
                    </div>
                    <p className="ikigai-answer-choice">{answer.label}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </section>

      <style jsx>{`
        .ikigai-page {
          min-height: 100vh;
          background: #f8f6f1;
          color: #1e1e1a;
          padding: 48px 20px 80px;
        }

        .ikigai-shell {
          max-width: 860px;
          margin: 0 auto;
        }

        .ikigai-hero {
          text-align: center;
          margin-bottom: 28px;
        }

        .ikigai-eyebrow {
          font-size: 0.82rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #6b675f;
          margin-bottom: 10px;
        }

        .ikigai-hero h1 {
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          line-height: 1.05;
          margin: 0 0 14px;
          font-weight: 600;
        }

        .ikigai-intro {
          max-width: 700px;
          margin: 0 auto;
          font-size: 1.04rem;
          line-height: 1.75;
          color: #4f4b44;
        }

        .ikigai-card {
          background: #fffdf9;
          border: 1px solid #e8e0d2;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.04);
          margin-bottom: 20px;
        }

        .ikigai-card h2,
        .ikigai-card h3 {
          margin-top: 0;
          margin-bottom: 14px;
          line-height: 1.2;
        }

        .ikigai-card p {
          line-height: 1.75;
          color: #403c36;
        }

        .ikigai-progress-wrap {
          margin-bottom: 28px;
        }

        .ikigai-progress-meta {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          font-size: 0.95rem;
          color: #665f55;
          margin-bottom: 10px;
        }

        .ikigai-progress {
          width: 100%;
          height: 10px;
          background: #ece5d9;
          border-radius: 999px;
          overflow: hidden;
        }

        .ikigai-progress-bar {
          height: 100%;
          background: #8d7f61;
          border-radius: 999px;
          transition: width 0.25s ease;
        }

        .ikigai-question {
          font-size: 1.5rem;
          line-height: 1.4;
          margin-bottom: 20px;
        }

        .ikigai-options {
          display: grid;
          gap: 12px;
        }

        .ikigai-option {
          text-align: left;
          width: 100%;
          border: 1px solid #ddd2bf;
          background: #fff;
          padding: 16px 18px;
          border-radius: 16px;
          font-size: 1rem;
          line-height: 1.5;
          cursor: pointer;
          transition: transform 0.12s ease, border-color 0.12s ease, box-shadow 0.12s ease;
        }

        .ikigai-option:hover {
          transform: translateY(-1px);
          border-color: #b8a88a;
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.05);
        }

        .ikigai-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .ikigai-actions.split {
          justify-content: space-between;
          align-items: center;
        }

        .ikigai-actions.wrap {
          flex-wrap: wrap;
        }

        .ikigai-button {
          border: none;
          background: #2f3a2e;
          color: #fff;
          padding: 12px 18px;
          border-radius: 999px;
          font-size: 0.95rem;
          cursor: pointer;
        }

        .ikigai-button.secondary {
          background: #e9e1d3;
          color: #2b2925;
        }

        .ikigai-button.ghost {
          background: transparent;
          color: #5f574d;
          border: 1px solid #ddd2bf;
        }

        .ikigai-button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .ikigai-result-label {
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 0.78rem;
          color: #7b735f;
          margin-bottom: 8px;
        }

        .ikigai-result-description {
          font-size: 1.04rem;
        }

        .ikigai-secondary {
          margin-top: 10px;
          color: #5b554c;
        }

        .ikigai-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .ikigai-list {
          margin: 0;
          padding-left: 18px;
          color: #403c36;
          line-height: 1.8;
        }

        .ikigai-suggestions {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .ikigai-suggestion {
          border: 1px solid #e4dac8;
          border-radius: 18px;
          padding: 16px;
          background: #fff;
        }

        .ikigai-suggestion p {
          margin: 0;
        }

        .ikigai-answer-list {
          display: grid;
          gap: 14px;
        }

        .ikigai-answer-row {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          padding: 16px 0;
          border-top: 1px solid #ece3d3;
        }

        .ikigai-answer-row:first-child {
          border-top: none;
          padding-top: 0;
        }

        .ikigai-answer-number {
          margin: 0 0 4px;
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #7c7468;
        }

        .ikigai-answer-text {
          margin: 0;
        }

        .ikigai-answer-choice {
          margin: 0;
          font-weight: 500;
          color: #24211d;
          max-width: 280px;
          text-align: right;
        }

        @media (max-width: 800px) {
          .ikigai-grid,
          .ikigai-suggestions {
            grid-template-columns: 1fr;
          }

          .ikigai-answer-row {
            flex-direction: column;
          }

          .ikigai-answer-choice {
            text-align: left;
            max-width: none;
          }
        }

        @media (max-width: 640px) {
          .ikigai-page {
            padding: 28px 14px 56px;
          }

          .ikigai-card {
            padding: 22px 18px;
            border-radius: 20px;
          }

          .ikigai-actions,
          .ikigai-actions.split {
            flex-direction: column;
            align-items: stretch;
          }

          .ikigai-button {
            width: 100%;
          }

          .ikigai-question {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </main>
  );
}