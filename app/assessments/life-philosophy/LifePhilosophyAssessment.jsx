"use client";

import { useMemo, useState } from "react";

const QUESTIONS = [
  {
    id: "meaning",
    text: "When life feels meaningful, what is usually happening?",
    options: [
      {
        label: "I am meeting difficulty with steadiness and character.",
        tags: ["stoicism", "virtue", "resilience"],
      },
      {
        label: "I am serving people or helping something larger than myself.",
        tags: ["service", "humanism", "christianity"],
      },
      {
        label: "I am discovering what is true, even when it unsettles me.",
        tags: ["existentialism", "rationalism", "jungian"],
      },
      {
        label: "I am quiet enough to feel connected to life itself.",
        tags: ["vedanta", "buddhism", "taoism"],
      },
    ],
  },
  {
    id: "happiness",
    text: "What kind of happiness feels most trustworthy to you now?",
    options: [
      {
        label: "Simple pleasures, friendship, health, and enough.",
        tags: ["epicureanism", "minimalism", "taoism"],
      },
      {
        label: "A clear conscience and a life guided by good values.",
        tags: ["virtue", "stoicism", "christianity"],
      },
      {
        label: "Growing, creating, and becoming stronger than I was.",
        tags: ["nietzsche", "transhumanism", "pragmatism"],
      },
      {
        label: "Seeing through the restless search for happiness.",
        tags: ["buddhism", "vedanta", "idealism"],
      },
    ],
  },
  {
    id: "suffering",
    text: "When you suffer, what explanation feels closest to the truth?",
    options: [
      {
        label: "Some pain is unavoidable; my task is how I respond.",
        tags: ["stoicism", "virtue", "existentialism"],
      },
      {
        label: "Suffering often comes from clinging, fear, and wanting life to be different.",
        tags: ["buddhism", "taoism", "minimalism"],
      },
      {
        label: "Suffering can become meaningful when love, faith, or service carries it.",
        tags: ["christianity", "service", "humanism"],
      },
      {
        label: "Suffering is data. It shows what needs to be understood or changed.",
        tags: ["pragmatism", "rationalism", "jungian"],
      },
    ],
  },
  {
    id: "freedom",
    text: "What does freedom mostly mean to you?",
    options: [
      {
        label: "Not being ruled by impulse, status, or fear.",
        tags: ["stoicism", "minimalism", "buddhism"],
      },
      {
        label: "Having the courage to choose my own path.",
        tags: ["existentialism", "nietzsche", "absurdism"],
      },
      {
        label: "Being able to test ideas, revise, and improve my life.",
        tags: ["pragmatism", "rationalism", "transhumanism"],
      },
      {
        label: "Trusting life more, forcing less, and moving with reality.",
        tags: ["taoism", "vedanta", "idealism"],
      },
    ],
  },
  {
    id: "identity",
    text: "Which view of the self feels most natural to you?",
    options: [
      {
        label: "I am a person shaped by choices, habits, and responsibility.",
        tags: ["virtue", "stoicism", "pragmatism"],
      },
      {
        label: "The self is deeper and stranger than the surface personality.",
        tags: ["jungian", "vedanta", "idealism"],
      },
      {
        label: "The self is not fixed; it changes when I observe it clearly.",
        tags: ["buddhism", "existentialism", "taoism"],
      },
      {
        label: "I am an embodied mind in a material universe.",
        tags: ["materialism", "rationalism", "transhumanism"],
      },
    ],
  },
  {
    id: "ambition",
    text: "How do you relate to ambition at this stage of life?",
    options: [
      {
        label: "I still want to grow, but I want the growth to be worthy.",
        tags: ["nietzsche", "virtue", "pragmatism"],
      },
      {
        label: "I want ambition to serve peace, family, and enough.",
        tags: ["minimalism", "epicureanism", "traditionalism"],
      },
      {
        label: "I want my work to reduce suffering or improve society.",
        tags: ["utilitarianism", "service", "humanism"],
      },
      {
        label: "I am less interested in achieving and more interested in awakening.",
        tags: ["vedanta", "buddhism", "taoism"],
      },
    ],
  },
  {
    id: "spirituality",
    text: "Which statement about spirituality feels most honest?",
    options: [
      {
        label: "Devotion, prayer, gratitude, or surrender still matters to me.",
        tags: ["christianity", "traditionalism", "service"],
      },
      {
        label: "I am drawn to awareness, non-duality, or consciousness as primary.",
        tags: ["vedanta", "idealism", "taoism"],
      },
      {
        label: "I value mystery, but I do not want to believe carelessly.",
        tags: ["rationalism", "humanism", "existentialism"],
      },
      {
        label: "I am mostly secular, but I still want depth and reverence.",
        tags: ["materialism", "humanism", "jungian"],
      },
    ],
  },
  {
    id: "death",
    text: "When you think about death, what does it most awaken in you?",
    options: [
      {
        label: "A wish to live with less triviality and more courage.",
        tags: ["existentialism", "stoicism", "absurdism"],
      },
      {
        label: "A desire to love, forgive, and be spiritually ready.",
        tags: ["christianity", "traditionalism", "service"],
      },
      {
        label: "A reminder that clinging to permanence creates pain.",
        tags: ["buddhism", "taoism", "vedanta"],
      },
      {
        label: "A motivation to extend life, knowledge, and human possibility.",
        tags: ["transhumanism", "materialism", "rationalism"],
      },
    ],
  },
  {
    id: "society",
    text: "What do you feel you owe the world around you?",
    options: [
      {
        label: "Practical service and a willingness to help where I can.",
        tags: ["service", "humanism", "christianity"],
      },
      {
        label: "Clear thinking, honest speech, and better institutions.",
        tags: ["rationalism", "utilitarianism", "pragmatism"],
      },
      {
        label: "The preservation of family, culture, duty, and inherited wisdom.",
        tags: ["traditionalism", "virtue", "christianity"],
      },
      {
        label: "The courage to question empty norms and live truthfully.",
        tags: ["existentialism", "nietzsche", "absurdism"],
      },
    ],
  },
  {
    id: "desire",
    text: "What is your current relationship with desire?",
    options: [
      {
        label: "Desire needs discipline, or it starts running my life.",
        tags: ["stoicism", "virtue", "traditionalism"],
      },
      {
        label: "Most desires soften when I stop feeding them.",
        tags: ["buddhism", "minimalism", "taoism"],
      },
      {
        label: "Desire can be creative energy when it is made conscious.",
        tags: ["nietzsche", "jungian", "existentialism"],
      },
      {
        label: "Desire should be tested by whether it improves life in practice.",
        tags: ["pragmatism", "epicureanism", "rationalism"],
      },
    ],
  },
  {
    id: "self-knowledge",
    text: "How do you usually come to know yourself better?",
    options: [
      {
        label: "Reflection, journaling, dreams, patterns, and inner honesty.",
        tags: ["jungian", "existentialism", "vedanta"],
      },
      {
        label: "Meditation, silence, and observing the mind.",
        tags: ["buddhism", "taoism", "vedanta"],
      },
      {
        label: "Feedback, experiments, and seeing what actually works.",
        tags: ["pragmatism", "rationalism", "humanism"],
      },
      {
        label: "Duty, prayer, conscience, and moral examination.",
        tags: ["christianity", "virtue", "traditionalism"],
      },
    ],
  },
  {
    id: "service",
    text: "What form of service feels most real to you?",
    options: [
      {
        label: "Direct care, mentoring, listening, or helping one person at a time.",
        tags: ["service", "humanism", "christianity"],
      },
      {
        label: "Building tools, systems, or ideas that help many people.",
        tags: ["utilitarianism", "pragmatism", "transhumanism"],
      },
      {
        label: "Becoming more whole, so I bring less confusion into the world.",
        tags: ["jungian", "buddhism", "virtue"],
      },
      {
        label: "Living simply enough that my life does less harm.",
        tags: ["minimalism", "epicureanism", "taoism"],
      },
    ],
  },
  {
    id: "success",
    text: "What would make your life feel successful from the inside?",
    options: [
      {
        label: "I became wise, steady, and useful.",
        tags: ["stoicism", "virtue", "service"],
      },
      {
        label: "I lived honestly, even without guarantees.",
        tags: ["existentialism", "absurdism", "nietzsche"],
      },
      {
        label: "I loved well and stayed close to what is sacred.",
        tags: ["christianity", "traditionalism", "humanism"],
      },
      {
        label: "I understood reality more clearly and helped progress continue.",
        tags: ["rationalism", "materialism", "transhumanism"],
      },
    ],
  },
  {
    id: "truth",
    text: "What kind of truth do you trust most?",
    options: [
      {
        label: "Truth that survives careful evidence and criticism.",
        tags: ["rationalism", "materialism", "pragmatism"],
      },
      {
        label: "Truth that transforms character and daily conduct.",
        tags: ["virtue", "stoicism", "christianity"],
      },
      {
        label: "Truth found in direct awareness before labels and concepts.",
        tags: ["vedanta", "buddhism", "idealism"],
      },
      {
        label: "Truth that helps me face life without pretending it is easier than it is.",
        tags: ["existentialism", "absurdism", "jungian"],
      },
    ],
  },
  {
    id: "change",
    text: "When life changes suddenly, what do you reach for first?",
    options: [
      {
        label: "Principles, discipline, and the next right action.",
        tags: ["stoicism", "virtue", "pragmatism"],
      },
      {
        label: "Acceptance, patience, and less resistance.",
        tags: ["taoism", "buddhism", "minimalism"],
      },
      {
        label: "Meaning, prayer, community, or guidance.",
        tags: ["christianity", "traditionalism", "humanism"],
      },
      {
        label: "A new experiment, a better model, or a new tool.",
        tags: ["rationalism", "transhumanism", "materialism"],
      },
    ],
  },
  {
    id: "enough",
    text: "What does enough mean to you now?",
    options: [
      {
        label: "Enough is freedom from needing more than life requires.",
        tags: ["minimalism", "epicureanism", "stoicism"],
      },
      {
        label: "Enough is a base from which to serve and love better.",
        tags: ["service", "christianity", "humanism"],
      },
      {
        label: "Enough is not the end; it gives me room to become.",
        tags: ["nietzsche", "existentialism", "jungian"],
      },
      {
        label: "Enough is space to ask what reality, mind, and consciousness are.",
        tags: ["vedanta", "idealism", "rationalism"],
      },
    ],
  },
];

const TRADITIONS = {
  stoicism: {
    name: "Stoicism",
    reading: "Marcus Aurelius, Meditations",
    driver: "steadiness, self-command, and doing what is yours to do",
  },
  existentialism: {
    name: "Existentialism",
    reading: "Viktor Frankl, Man's Search for Meaning",
    driver: "honesty, responsibility, and chosen meaning",
  },
  absurdism: {
    name: "Absurdism",
    reading: "Albert Camus, The Myth of Sisyphus",
    driver: "lucid courage when life does not offer easy answers",
  },
  humanism: {
    name: "Humanism",
    reading: "William James, The Varieties of Religious Experience",
    driver: "human dignity, compassion, and lived experience",
  },
  vedanta: {
    name: "Vedanta / non-duality",
    reading: "Bhagavad Gita",
    driver: "awareness, surrender, and the search for what is deeper than personality",
  },
  buddhism: {
    name: "Buddhism",
    reading: "Dhammapada",
    driver: "clear seeing, non-clinging, and relief from unnecessary suffering",
  },
  taoism: {
    name: "Taoism",
    reading: "Tao Te Ching",
    driver: "simplicity, trust, and moving with life rather than forcing it",
  },
  christianity: {
    name: "Christianity / devotional spirituality",
    reading: "The Gospel of Matthew",
    driver: "love, devotion, conscience, and grace",
  },
  rationalism: {
    name: "Secular rationalism",
    reading: "Julia Galef, The Scout Mindset",
    driver: "clarity, intellectual honesty, and better models of reality",
  },
  pragmatism: {
    name: "Pragmatism",
    reading: "William James, Pragmatism",
    driver: "experiment, usefulness, and truth tested in life",
  },
  epicureanism: {
    name: "Epicureanism",
    reading: "Epicurus, Letter to Menoeceus",
    driver: "simple pleasures, friendship, health, and enough",
  },
  minimalism: {
    name: "Minimalism",
    reading: "Thoreau, Walden",
    driver: "lightness, fewer distractions, and a quieter definition of wealth",
  },
  nietzsche: {
    name: "Nietzschean self-overcoming",
    reading: "Nietzsche, Thus Spoke Zarathustra",
    driver: "strength, creative self-honesty, and becoming",
  },
  jungian: {
    name: "Jungian depth psychology",
    reading: "Carl Jung, Modern Man in Search of a Soul",
    driver: "shadow work, symbols, dreams, and becoming more whole",
  },
  utilitarianism: {
    name: "Utilitarianism",
    reading: "Peter Singer, The Life You Can Save",
    driver: "reducing suffering and making choices that help more people",
  },
  virtue: {
    name: "Virtue ethics",
    reading: "Aristotle, Nicomachean Ethics",
    driver: "character, moderation, practical wisdom, and moral growth",
  },
  materialism: {
    name: "Materialism / scientific naturalism",
    reading: "David Deutsch, The Beginning of Infinity",
    driver: "science, embodiment, progress, and the natural world",
  },
  idealism: {
    name: "Analytical idealism / consciousness-first views",
    reading: "Alan Watts, The Wisdom of Insecurity",
    driver: "consciousness, mystery, and the primacy of direct experience",
  },
  transhumanism: {
    name: "Transhumanism",
    reading: "David Deutsch, The Beginning of Infinity",
    driver: "progress, human possibility, and the responsible use of tools",
  },
  traditionalism: {
    name: "Traditionalism",
    reading: "C. S. Lewis, Mere Christianity",
    driver: "duty, family, inherited wisdom, and moral continuity",
  },
  service: {
    name: "Civic / service-oriented philosophy",
    reading: "Viktor Frankl, Man's Search for Meaning",
    driver: "usefulness, responsibility to others, and contribution",
  },
};

const PROFILES = [
  {
    key: "reflective-achiever",
    title: "Reflective Achiever",
    tags: ["stoicism", "virtue", "pragmatism", "nietzsche", "service"],
    narrative:
      "Your current life philosophy appears to be shaped by a wish to keep growing without becoming trapped by achievement. You seem to respect discipline, usefulness, and personal responsibility, but you also want your effort to mean something more than momentum. There is a practical wisdom here: you are not trying to escape life, but to meet it with better values.",
    second:
      "The tender edge in this pattern is that ambition can still carry old pressure. Your next chapter may ask you to keep the part of you that builds, improves, and takes responsibility, while loosening the part that needs every season of life to prove your worth.",
  },
  {
    key: "contemplative-humanist",
    title: "Contemplative Humanist",
    tags: ["humanism", "service", "buddhism", "vedanta", "christianity"],
    narrative:
      "Your current life philosophy appears to be shaped by compassion, inwardness, and a deep concern for how people actually live and suffer. You may be drawn to spiritual or contemplative ideas, but not as decoration. They matter when they make you kinder, clearer, and more available to real life.",
    second:
      "The inner tension is between caring for others and preserving enough quiet to stay whole. You may need a rhythm where service and solitude are not opposites, but two parts of the same mature life.",
  },
  {
    key: "rational-seeker",
    title: "Rational Seeker",
    tags: ["rationalism", "materialism", "pragmatism", "humanism", "transhumanism"],
    narrative:
      "Your current life philosophy appears to be shaped by intellectual honesty, curiosity, and a desire to believe what is actually true. You seem to trust evidence, clear thinking, and revision more than inherited certainty. At the same time, your search is not cold; it is connected to the hope that better understanding can make life more humane.",
    second:
      "Your tension may be between analysis and surrender. The mind can clarify a great deal, but some parts of life also ask to be lived, grieved, loved, or endured before they can be neatly understood.",
  },
  {
    key: "quiet-renunciate",
    title: "Quiet Simplifier",
    tags: ["minimalism", "epicureanism", "taoism", "buddhism", "stoicism"],
    narrative:
      "Your current life philosophy appears to be shaped by simplicity, enoughness, and a growing distrust of unnecessary striving. You seem to sense that a good life may depend less on expansion and more on attention: fewer wants, clearer priorities, better friendships, and a calmer relationship with time.",
    second:
      "The tension is that simplicity can become either freedom or avoidance. Your path may be to release what is excess while still staying awake to love, responsibility, and creative participation in the world.",
  },
  {
    key: "spiritual-integrator",
    title: "Spiritual Integrator",
    tags: ["vedanta", "idealism", "taoism", "buddhism", "jungian"],
    narrative:
      "Your current life philosophy appears to be shaped by a search for the deeper ground of experience. You may feel that ordinary identity is not the whole story, and that awareness, mystery, silence, or inner work point toward something more real than constant self-improvement.",
    second:
      "Your tension is between depth and daily life. The work may be to let spiritual insight make you more grounded, honest, and loving, rather than more detached from ordinary obligations.",
  },
  {
    key: "tragic-creator",
    title: "Lucid Creator",
    tags: ["existentialism", "absurdism", "nietzsche", "jungian", "virtue"],
    narrative:
      "Your current life philosophy appears to be shaped by honesty about difficulty and a refusal to live on autopilot. You may not need life to be easy or fully explained in order to take it seriously. Meaning, for you, seems to come through courage, creative responsibility, and a willingness to face the parts of yourself that are still unfinished.",
    second:
      "The tension is that lucidity can harden into loneliness if it is not joined with tenderness. Your strongest path may include both self-overcoming and a more merciful relationship with your own humanity.",
  },
  {
    key: "devotional-citizen",
    title: "Devotional Citizen",
    tags: ["christianity", "traditionalism", "service", "virtue", "humanism"],
    narrative:
      "Your current life philosophy appears to be shaped by devotion, duty, care, and a wish to live in right relationship with others. You may be drawn to faith, inherited wisdom, family, community, or moral continuity, not because they are fashionable, but because they help hold life together.",
    second:
      "The tension is between loyalty and inner honesty. Your path may ask you to honor what has formed you while still letting conscience, love, and direct experience keep your beliefs alive.",
  },
  {
    key: "future-minded-reformer",
    title: "Future-Minded Reformer",
    tags: ["transhumanism", "utilitarianism", "rationalism", "materialism", "pragmatism"],
    narrative:
      "Your current life philosophy appears to be shaped by a belief that life can be improved through clearer thinking, better tools, and wider moral concern. You may feel responsible not only for your own peace, but for whether your choices help reduce suffering or open better possibilities for others.",
    second:
      "The tension is between progress and presence. A future worth building still has to be inhabited by whole people, including you, so your philosophy may need rest, relationship, and humility alongside ambition for improvement.",
  },
];

const DRIVER_TEXT = {
  resilience: "meeting hardship with steadiness",
  stoicism: "choosing your response with care",
  virtue: "becoming the kind of person you respect",
  service: "being useful in a way that feels human",
  humanism: "protecting dignity and compassion",
  christianity: "love, devotion, conscience, and surrender",
  existentialism: "living honestly without easy guarantees",
  rationalism: "clear thinking and intellectual honesty",
  jungian: "becoming more whole through inner work",
  vedanta: "looking beneath the surface self",
  buddhism: "loosening clinging and seeing clearly",
  taoism: "trusting simplicity and natural rhythm",
  epicureanism: "simple pleasures, friendship, and enough",
  minimalism: "less noise and fewer false needs",
  nietzsche: "self-overcoming and creative courage",
  transhumanism: "expanding human possibility wisely",
  pragmatism: "testing ideas in lived experience",
  traditionalism: "continuity, family, duty, and inherited wisdom",
  utilitarianism: "reducing suffering where you can",
  materialism: "respect for nature, science, and embodiment",
  idealism: "taking consciousness and direct experience seriously",
  absurdism: "courage when life remains unresolved",
};

const FALLBACK_READINGS = [
  "Epictetus, Discourses",
  "Thoreau, Walden",
  "Julia Galef, The Scout Mindset",
  "Alan Watts, The Wisdom of Insecurity",
];

function countTags(answers) {
  const scores = {};

  answers.forEach((answer) => {
    answer.option.tags.forEach((tag) => {
      scores[tag] = (scores[tag] || 0) + 1;
    });
  });

  return scores;
}

function topEntries(scores, limit) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit);
}

function scoreProfiles(scores) {
  return PROFILES.map((profile) => ({
    ...profile,
    value: profile.tags.reduce((sum, tag) => sum + (scores[tag] || 0), 0),
  })).sort((a, b) => b.value - a.value);
}

function uniqueItems(items) {
  return [...new Set(items)];
}

function buildResult(answers) {
  const scores = countTags(answers);
  const topProfile = scoreProfiles(scores)[0] || PROFILES[0];
  const topTraditions = topEntries(scores, 6)
    .filter(([tag]) => TRADITIONS[tag])
    .map(([tag]) => TRADITIONS[tag]);
  const topDrivers = topEntries(scores, 5)
    .map(([tag]) => DRIVER_TEXT[tag] || TRADITIONS[tag]?.driver)
    .filter(Boolean);

  const readings = uniqueItems([
    ...topTraditions.map((tradition) => tradition.reading),
    ...FALLBACK_READINGS,
  ]).slice(0, 7);

  const tensions = buildTensions(scores);

  return {
    title: topProfile.title,
    narrative: [topProfile.narrative, topProfile.second],
    drivers: uniqueItems(topDrivers).slice(0, 5),
    tensions,
    traditions: topTraditions.slice(0, 5).map((tradition) => tradition.name),
    readings,
    questions: buildReflectionQuestions(scores),
  };
}

function buildTensions(scores) {
  const tensions = [];

  if ((scores.rationalism || 0) + (scores.materialism || 0) > 2 && (scores.vedanta || 0) + (scores.idealism || 0) + (scores.christianity || 0) > 1) {
    tensions.push("You may be balancing the need for clear evidence with a real hunger for mystery, reverence, or direct inner experience.");
  }

  if ((scores.nietzsche || 0) + (scores.transhumanism || 0) + (scores.pragmatism || 0) > 2 && (scores.minimalism || 0) + (scores.buddhism || 0) + (scores.taoism || 0) > 1) {
    tensions.push("Part of you wants growth and forward movement, while another part is tired of striving and wants a simpler relationship with desire.");
  }

  if ((scores.service || 0) + (scores.humanism || 0) + (scores.utilitarianism || 0) > 2 && (scores.stoicism || 0) + (scores.minimalism || 0) + (scores.buddhism || 0) > 1) {
    tensions.push("You may feel called to help, but you also know that service without boundaries can quietly become self-neglect.");
  }

  if ((scores.traditionalism || 0) + (scores.christianity || 0) > 1 && (scores.existentialism || 0) + (scores.absurdism || 0) + (scores.nietzsche || 0) > 1) {
    tensions.push("You may be trying to honor inherited wisdom while still needing a life that feels personally chosen and honest.");
  }

  if ((scores.jungian || 0) + (scores.vedanta || 0) + (scores.buddhism || 0) > 2 && (scores.service || 0) + (scores.virtue || 0) + (scores.pragmatism || 0) > 1) {
    tensions.push("Your inner life matters deeply, yet the insight has to become visible in conduct, relationships, and ordinary choices.");
  }

  return tensions.slice(0, 3).length
    ? tensions.slice(0, 3)
    : [
        "You may be trying to live with both clarity and tenderness: to see life plainly without becoming hard.",
        "You may be learning how to want less without becoming passive, and how to care more without becoming overburdened.",
      ];
}

function buildReflectionQuestions(scores) {
  const questions = [
    "What belief about a good life are you quietly outgrowing?",
    "Where does your current life ask for more courage, not more information?",
    "What kind of suffering are you still trying to solve with achievement?",
  ];

  if ((scores.service || 0) + (scores.humanism || 0) > 2) {
    questions.push("How can you serve in a way that keeps your heart open without draining your life?");
  }

  if ((scores.buddhism || 0) + (scores.minimalism || 0) + (scores.taoism || 0) > 2) {
    questions.push("What desire would lose power if you stopped arguing with it and simply watched it?");
  }

  if ((scores.rationalism || 0) + (scores.materialism || 0) > 2) {
    questions.push("Where might analysis be protecting you from grief, love, or uncertainty?");
  }

  if ((scores.vedanta || 0) + (scores.idealism || 0) + (scores.jungian || 0) > 2) {
    questions.push("What changes in daily life if awareness is not just something you have, but something you are learning to trust?");
  }

  if ((scores.nietzsche || 0) + (scores.existentialism || 0) > 2) {
    questions.push("What would you create or choose if you stopped asking life to guarantee the outcome first?");
  }

  return uniqueItems(questions).slice(0, 6);
}

function formatDate() {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

export default function LifePhilosophyAssessment() {
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [generatedDate, setGeneratedDate] = useState("");

  const currentQuestion = QUESTIONS[currentIndex];
  const isComplete = currentIndex >= QUESTIONS.length;
  const result = useMemo(() => (isComplete ? buildResult(answers) : null), [answers, isComplete]);
  const progressWidth = `${Math.round((currentIndex / QUESTIONS.length) * 100)}%`;

  function goNext() {
    if (selectedIndex === null) return;

    setAnswers((current) => [
      ...current,
      {
        question: currentQuestion.text,
        option: currentQuestion.options[selectedIndex],
      },
    ]);
    setSelectedIndex(null);
    setCurrentIndex((current) => current + 1);
  }

  function goBack() {
    if (currentIndex === 0) return;

    const previousQuestion = QUESTIONS[currentIndex - 1];
    const previousAnswer = answers[answers.length - 1];
    const previousIndex = previousQuestion.options.findIndex(
      (option) => option.label === previousAnswer.option.label,
    );

    setAnswers((current) => current.slice(0, -1));
    setCurrentIndex((current) => current - 1);
    setSelectedIndex(previousIndex >= 0 ? previousIndex : null);
  }

  function restart() {
    setStarted(false);
    setCurrentIndex(0);
    setAnswers([]);
    setSelectedIndex(null);
    setGeneratedDate("");
  }

  function downloadPdf() {
    setGeneratedDate(formatDate());
    window.setTimeout(() => window.print(), 0);
  }

  return (
    <main className="life-philosophy-page">
      <section className="life-philosophy-shell">
        <header className="life-philosophy-hero">
          <p className="life-philosophy-eyebrow">After Enough assessment</p>
          <h1>Current Life Philosophy</h1>
          <p className="life-philosophy-intro">
            A reflective assessment for noticing the beliefs already shaping how you
            meet meaning, freedom, suffering, ambition, spirituality, service, and
            enough.
          </p>
        </header>

        {!started && (
          <section className="life-card intro-card">
            <h2>Not a label. A mirror.</h2>
            <p>
              This assessment does not try to tell you who you are. It listens for the
              philosophical instincts that seem active in your life right now, then
              offers a human interpretation and a reading path.
            </p>
            <p>
              Choose the answer that feels most alive or honest today. You can retake it
              later; a life philosophy changes as a life changes.
            </p>

            <div className="life-actions">
              <button className="life-button" type="button" onClick={() => setStarted(true)}>
                Start assessment
              </button>
            </div>
          </section>
        )}

        {started && !isComplete && currentQuestion && (
          <section className="life-card">
            <div className="life-progress-wrap">
              <div className="life-progress-meta">
                <span>
                  Question {currentIndex + 1} of {QUESTIONS.length}
                </span>
                <span>{QUESTIONS.length - currentIndex} remaining</span>
              </div>
              <div className="life-progress" aria-hidden="true">
                <div className="life-progress-bar" style={{ width: progressWidth }} />
              </div>
            </div>

            <h2 className="life-question">{currentQuestion.text}</h2>
            <p className="life-helper">Choose the response that feels most true right now.</p>

            <div className="life-options">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={option.label}
                  type="button"
                  className={`life-option ${selectedIndex === index ? "selected" : ""}`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <span>{option.label}</span>
                </button>
              ))}
            </div>

            <div className="life-actions split">
              <button
                className="life-button secondary"
                type="button"
                onClick={goBack}
                disabled={currentIndex === 0}
              >
                Back
              </button>
              <div className="life-actions-inline">
                <button className="life-button ghost" type="button" onClick={restart}>
                  Start over
                </button>
                <button
                  className="life-button"
                  type="button"
                  onClick={goNext}
                  disabled={selectedIndex === null}
                >
                  Next
                </button>
              </div>
            </div>
          </section>
        )}

        {isComplete && result && (
          <>
            <section className="life-card result-card">
              <p className="life-result-label">Your current life philosophy</p>
              <h2>{result.title}</h2>
              <div className="life-narrative">
                {result.narrative.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="life-actions wrap">
                <button className="life-button" type="button" onClick={downloadPdf}>
                  Download PDF
                </button>
                <button className="life-button secondary" type="button" onClick={restart}>
                  Retake assessment
                </button>
              </div>
            </section>

            <section className="life-result-grid">
              <ResultList title="Core drivers" items={result.drivers} />
              <ResultList title="Inner tensions" items={result.tensions} />
              <ResultList title="Traditions you may resonate with" items={result.traditions} />
              <ResultList title="Suggested reading path" items={result.readings} />
            </section>

            <section className="life-card">
              <h3>Reflection questions</h3>
              <ul className="life-list">
                {result.questions.map((question) => (
                  <li key={question}>{question}</li>
                ))}
              </ul>
            </section>

            <section className="print-report" aria-hidden="true">
              <div className="print-brand">After Enough</div>
              <h1>Your Current Life Philosophy</h1>
              <p className="print-date">Generated {generatedDate || formatDate()}</p>
              <h2>{result.title}</h2>
              {result.narrative.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <PrintList title="Core drivers" items={result.drivers} />
              <PrintList title="Inner tensions" items={result.tensions} />
              <PrintList title="Philosophical traditions you may resonate with" items={result.traditions} />
              <PrintList title="Suggested reading path" items={result.readings} />
              <PrintList title="Reflection questions" items={result.questions} />
            </section>
          </>
        )}
      </section>

      <style jsx global>{`
        .life-philosophy-page {
          min-height: 100vh;
          background: #f8f6f1;
          color: #1f1d19;
          padding: 48px 20px 82px;
        }

        .life-philosophy-shell {
          max-width: 900px;
          margin: 0 auto;
        }

        .life-philosophy-hero {
          text-align: center;
          margin-bottom: 28px;
        }

        .life-philosophy-eyebrow,
        .life-result-label {
          margin: 0 0 10px;
          color: #746852;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.13em;
          text-transform: uppercase;
        }

        .life-philosophy-hero h1 {
          margin: 0 0 14px;
          font-size: clamp(2.35rem, 5vw, 4rem);
          line-height: 1.06;
          font-weight: 500;
          letter-spacing: -0.02em;
        }

        .life-philosophy-intro {
          max-width: 720px;
          margin: 0 auto;
          color: #575046;
          font-size: 1.08rem;
          line-height: 1.75;
        }

        .life-card {
          margin-bottom: 20px;
          padding: 28px;
          background: #fffdf9;
          border: 1px solid #e8e0d2;
          border-radius: 24px;
          box-shadow: 0 10px 30px rgba(39, 30, 20, 0.04);
        }

        .life-card h2,
        .life-card h3 {
          margin: 0 0 14px;
          line-height: 1.22;
          font-weight: 500;
        }

        .life-card p {
          color: #433e36;
          line-height: 1.75;
        }

        .intro-card p:last-of-type {
          margin-bottom: 0;
        }

        .life-progress-wrap {
          margin-bottom: 28px;
        }

        .life-progress-meta {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
          color: #6a6256;
          font-size: 0.95rem;
        }

        .life-progress {
          height: 10px;
          overflow: hidden;
          background: #ece5d9;
          border-radius: 999px;
        }

        .life-progress-bar {
          height: 100%;
          background: #837457;
          border-radius: 999px;
          transition: width 0.22s ease;
        }

        .life-question {
          font-size: 1.5rem;
        }

        .life-helper {
          margin-bottom: 20px;
          color: #6a6258;
          font-size: 0.96rem;
        }

        .life-options {
          display: grid;
          gap: 12px;
        }

        .life-option {
          width: 100%;
          padding: 16px 18px;
          text-align: left;
          color: #25221d;
          background: #ffffff;
          border: 1px solid #ddd2bf;
          border-radius: 16px;
          cursor: pointer;
          line-height: 1.5;
          transition: transform 140ms ease, border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease;
        }

        .life-option:hover,
        .life-option:focus-visible {
          transform: translateY(-1px);
          border-color: #b8a88a;
          box-shadow: 0 8px 18px rgba(39, 30, 20, 0.05);
          outline: none;
        }

        .life-option.selected {
          background: #f7f1e6;
          border-color: #837457;
          box-shadow: 0 8px 18px rgba(39, 30, 20, 0.05);
        }

        .life-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
        }

        .life-actions.split {
          align-items: center;
          justify-content: space-between;
        }

        .life-actions.wrap {
          flex-wrap: wrap;
        }

        .life-actions-inline {
          display: flex;
          gap: 12px;
        }

        .life-button {
          border: 1px solid #2f3a2e;
          background: #2f3a2e;
          color: #ffffff;
          padding: 12px 18px;
          border-radius: 999px;
          cursor: pointer;
          font-size: 0.95rem;
          transition: transform 140ms ease, background-color 140ms ease, border-color 140ms ease;
        }

        .life-button:hover,
        .life-button:focus-visible {
          transform: translateY(-1px);
          background: #253024;
          border-color: #253024;
          outline: none;
        }

        .life-button.secondary {
          background: #e9e1d3;
          border-color: #e9e1d3;
          color: #2b2925;
        }

        .life-button.ghost {
          background: transparent;
          border-color: #ddd2bf;
          color: #5f574d;
        }

        .life-button:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
        }

        .result-card h2 {
          font-size: clamp(1.8rem, 4vw, 2.5rem);
        }

        .life-narrative p {
          font-size: 1.05rem;
        }

        .life-result-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 20px;
          margin-bottom: 20px;
        }

        .life-list {
          display: grid;
          gap: 0.72rem;
          margin: 0;
          padding-left: 1.2rem;
          color: #433e36;
          line-height: 1.7;
        }

        .print-report {
          display: none;
        }

        @media (max-width: 760px) {
          .life-result-grid {
            grid-template-columns: 1fr;
          }

          .life-actions,
          .life-actions.split,
          .life-actions-inline {
            align-items: stretch;
            flex-direction: column;
          }

          .life-button {
            width: 100%;
          }
        }

        @media (max-width: 560px) {
          .life-philosophy-page {
            padding: 28px 14px 56px;
          }

          .life-card {
            padding: 22px 18px;
            border-radius: 20px;
          }

          .life-progress-meta {
            flex-direction: column;
            gap: 4px;
          }
        }

        @media print {
          .life-philosophy-page {
            background: #ffffff;
            padding: 0;
          }

          .life-philosophy-hero,
          .life-card,
          .life-result-grid {
            display: none !important;
          }

          .life-philosophy-shell {
            max-width: none;
          }

          .print-report {
            display: block;
            color: #1f1d19;
            padding: 0;
            font-family: Georgia, "Times New Roman", Times, serif;
          }

          .print-brand {
            margin-bottom: 24px;
            color: #6d5b3e;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
          }

          .print-report h1 {
            margin: 0 0 6px;
            font-size: 30px;
            line-height: 1.15;
            font-weight: 500;
          }

          .print-date {
            margin: 0 0 26px;
            color: #6a6258;
            font-size: 12px;
          }

          .print-report h2 {
            margin: 0 0 12px;
            font-size: 22px;
            line-height: 1.2;
          }

          .print-report h3 {
            margin: 22px 0 8px;
            font-size: 15px;
            line-height: 1.25;
          }

          .print-report p,
          .print-report li {
            color: #2d2923;
            font-size: 12.5px;
            line-height: 1.55;
          }

          .print-report ul {
            margin: 0;
            padding-left: 18px;
          }
        }
      `}</style>
    </main>
  );
}

function ResultList({ title, items }) {
  return (
    <article className="life-card">
      <h3>{title}</h3>
      <ul className="life-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

function PrintList({ title, items }) {
  return (
    <>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}
