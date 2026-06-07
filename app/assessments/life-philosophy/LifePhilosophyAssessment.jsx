"use client";

import { useMemo, useState } from "react";
import { buildPdfSections, createTextPdf, downloadBlob } from "./pdfUtils";

const SECTION_ORDER = ["worldview", "freedom", "afterEnough", "location"];

const SECTIONS = {
  worldview: {
    label: "Section 1",
    title: "How Do You See Life?",
    shortTitle: "How you see life",
    description:
      "Worldview, values, meaning, purpose, success, suffering, duty, ambition, simplicity, spirituality, and relationships.",
  },
  freedom: {
    label: "Section 2",
    title: "What Kind of Freedom Do You Seek?",
    shortTitle: "The freedom you seek",
    description:
      "The deeper form of freedom you may be trying to protect or create.",
  },
  afterEnough: {
    label: "Section 3",
    title: "What Comes After Enough?",
    shortTitle: "After enough",
    description:
      "The ordinary shape of life after financial independence: work, family, learning, contribution, travel, community, and inner growth.",
  },
  location: {
    label: "Section 4",
    title: "Where Does Your Future Life Happen?",
    shortTitle: "Where life happens",
    description:
      "Rootedness, family proximity, multiple home bases, slow travel, international living, community, and flexibility.",
  },
};

const QUESTIONS = [
  {
    id: "meaning",
    section: "worldview",
    text: "When life feels meaningful, what is usually happening?",
    options: [
      {
        label: "I am living with integrity, discipline, and steadiness.",
        tags: ["stoic", "virtue", "duty"],
      },
      {
        label: "I am helping people or serving something beyond myself.",
        tags: ["service", "humanist", "relational"],
      },
      {
        label: "I am learning, questioning, and trying to see clearly.",
        tags: ["seeker", "rational", "growth"],
      },
      {
        label: "I am quiet enough to feel connected to what is sacred or alive.",
        tags: ["contemplative", "spiritual", "simple"],
      },
    ],
  },
  {
    id: "success",
    section: "worldview",
    text: "What would make your life feel successful from the inside?",
    options: [
      {
        label: "I became wise, useful, and hard to pull away from my values.",
        tags: ["stoic", "virtue", "duty"],
      },
      {
        label: "I loved well and stayed close to family, friendship, and community.",
        tags: ["relational", "service", "humanist"],
      },
      {
        label: "I created, learned, and kept becoming more honest and alive.",
        tags: ["growth", "creative", "seeker"],
      },
      {
        label: "I wanted less, noticed more, and lived with a lighter footprint.",
        tags: ["simple", "contemplative", "spiritual"],
      },
    ],
  },
  {
    id: "suffering",
    section: "worldview",
    text: "When suffering appears, which response feels closest to your nature?",
    options: [
      {
        label: "Meet it with courage and focus on the next right action.",
        tags: ["stoic", "virtue", "duty"],
      },
      {
        label: "Let it soften me toward other people who are also carrying pain.",
        tags: ["humanist", "service", "relational"],
      },
      {
        label: "Study it until I understand what needs to change.",
        tags: ["rational", "seeker", "growth"],
      },
      {
        label: "Notice how much pain comes from clinging, fear, or resistance.",
        tags: ["contemplative", "spiritual", "simple"],
      },
    ],
  },
  {
    id: "ambition",
    section: "worldview",
    text: "How do you relate to ambition now?",
    options: [
      {
        label: "I still value excellence, but I want it to serve character.",
        tags: ["virtue", "stoic", "growth"],
      },
      {
        label: "I want ambition to protect peace, family, and enough.",
        tags: ["simple", "relational", "duty"],
      },
      {
        label: "I want to build or improve things that matter.",
        tags: ["creative", "service", "rational"],
      },
      {
        label: "I am less interested in proving myself and more interested in awakening.",
        tags: ["contemplative", "spiritual", "seeker"],
      },
    ],
  },
  {
    id: "spirituality",
    section: "worldview",
    text: "Which statement about spirituality feels most honest?",
    options: [
      {
        label: "Prayer, devotion, gratitude, or surrender still matters to me.",
        tags: ["spiritual", "duty", "relational"],
      },
      {
        label: "I am drawn to silence, awareness, mystery, or direct experience.",
        tags: ["contemplative", "spiritual", "seeker"],
      },
      {
        label: "I value depth, but I do not want to believe carelessly.",
        tags: ["rational", "seeker", "humanist"],
      },
      {
        label: "I am mostly practical, but I still want reverence in daily life.",
        tags: ["simple", "virtue", "humanist"],
      },
    ],
  },
  {
    id: "relationships",
    section: "worldview",
    text: "What role do relationships play in a good life?",
    options: [
      {
        label: "They are a training ground for patience, loyalty, and character.",
        tags: ["virtue", "duty", "stoic"],
      },
      {
        label: "They are the center: love is where life becomes real.",
        tags: ["relational", "humanist", "service"],
      },
      {
        label: "They help me grow through honesty, challenge, and repair.",
        tags: ["growth", "seeker", "creative"],
      },
      {
        label: "They are best when there is spaciousness, kindness, and less grasping.",
        tags: ["contemplative", "simple", "spiritual"],
      },
    ],
  },
  {
    id: "duty",
    section: "worldview",
    text: "What does duty mean to you?",
    options: [
      {
        label: "Doing what is mine to do, even when no one applauds.",
        tags: ["duty", "stoic", "virtue"],
      },
      {
        label: "Caring for the people and communities entrusted to me.",
        tags: ["relational", "service", "duty"],
      },
      {
        label: "Using my abilities responsibly instead of wasting them.",
        tags: ["growth", "creative", "service"],
      },
      {
        label: "Living lightly enough that my wants do not harm what I love.",
        tags: ["simple", "contemplative", "humanist"],
      },
    ],
  },
  {
    id: "truth",
    section: "worldview",
    text: "What kind of truth do you trust most?",
    options: [
      {
        label: "Truth proven through conduct, character, and time.",
        tags: ["virtue", "stoic", "duty"],
      },
      {
        label: "Truth that makes people more compassionate and humane.",
        tags: ["humanist", "service", "relational"],
      },
      {
        label: "Truth that survives evidence, criticism, and revision.",
        tags: ["rational", "seeker", "growth"],
      },
      {
        label: "Truth found in direct awareness before too many concepts.",
        tags: ["contemplative", "spiritual", "simple"],
      },
    ],
  },
  {
    id: "enough",
    section: "worldview",
    text: "What does enough mean to you right now?",
    options: [
      {
        label: "Enough is the base that lets me live by my values.",
        tags: ["stoic", "virtue", "duty"],
      },
      {
        label: "Enough is room to love, serve, and be present.",
        tags: ["service", "relational", "humanist"],
      },
      {
        label: "Enough is space to explore, create, and keep learning.",
        tags: ["growth", "creative", "seeker"],
      },
      {
        label: "Enough is freedom from needing more than life requires.",
        tags: ["simple", "contemplative", "spiritual"],
      },
    ],
  },
  {
    id: "control",
    section: "freedom",
    text: "Which kind of relief sounds most valuable?",
    options: [
      {
        label: "Knowing the basics are handled and my family is protected.",
        freedoms: ["security", "family"],
      },
      {
        label: "Owning my days instead of squeezing life around obligations.",
        freedoms: ["time", "creative"],
      },
      {
        label: "Being able to live where my life fits best.",
        freedoms: ["geographic", "family"],
      },
      {
        label: "Having quiet space to think, read, and understand.",
        freedoms: ["intellectual", "spiritual"],
      },
    ],
  },
  {
    id: "constraint",
    section: "freedom",
    text: "What constraint do you most want financial independence to loosen?",
    options: [
      {
        label: "Money anxiety and the feeling that one mistake could undo me.",
        freedoms: ["security"],
      },
      {
        label: "Calendar pressure and the sense that my best hours are rented out.",
        freedoms: ["time"],
      },
      {
        label: "Being tied to one place, commute, climate, or local economy.",
        freedoms: ["geographic"],
      },
      {
        label: "Having too little energy left for art, ideas, or making things.",
        freedoms: ["creative"],
      },
    ],
  },
  {
    id: "choice",
    section: "freedom",
    text: "If you had more choice, where would it go first?",
    options: [
      {
        label: "More ordinary time with my partner, children, parents, or close friends.",
        freedoms: ["family", "time"],
      },
      {
        label: "More contribution through mentoring, volunteering, or useful work.",
        freedoms: ["service", "family"],
      },
      {
        label: "More study, conversation, and intellectual independence.",
        freedoms: ["intellectual", "creative"],
      },
      {
        label: "More silence, prayer, retreat, nature, or inner practice.",
        freedoms: ["spiritual", "time"],
      },
    ],
  },
  {
    id: "work-freedom",
    section: "freedom",
    text: "What would make work feel freer?",
    options: [
      {
        label: "The ability to stop if the work becomes unhealthy.",
        freedoms: ["security", "time"],
      },
      {
        label: "The ability to choose fewer hours and better seasons.",
        freedoms: ["time", "family"],
      },
      {
        label: "The ability to choose projects that are creative and self-directed.",
        freedoms: ["creative", "intellectual"],
      },
      {
        label: "The ability to work only where it genuinely helps.",
        freedoms: ["service", "spiritual"],
      },
    ],
  },
  {
    id: "mobility",
    section: "freedom",
    text: "How do you imagine place in a freer life?",
    options: [
      {
        label: "I mostly want a stable home base that feels safe and paid for.",
        freedoms: ["security", "family"],
      },
      {
        label: "I want the option to spend longer stretches elsewhere.",
        freedoms: ["geographic", "time"],
      },
      {
        label: "I want to live near the people who matter most.",
        freedoms: ["family", "geographic"],
      },
      {
        label: "I want a place that supports solitude, retreat, or spiritual rhythm.",
        freedoms: ["spiritual", "geographic"],
      },
    ],
  },
  {
    id: "mind",
    section: "freedom",
    text: "What would intellectual freedom give you?",
    options: [
      {
        label: "Permission to question inherited scripts about success.",
        freedoms: ["intellectual", "spiritual"],
      },
      {
        label: "Time to read, write, study, and follow curiosity seriously.",
        freedoms: ["intellectual", "time"],
      },
      {
        label: "The ability to build, teach, or publish ideas without asking permission.",
        freedoms: ["intellectual", "creative"],
      },
      {
        label: "Better judgment about how to use money, time, and attention.",
        freedoms: ["intellectual", "security"],
      },
    ],
  },
  {
    id: "family",
    section: "freedom",
    text: "Where does family fit into freedom?",
    options: [
      {
        label: "Freedom means being dependable when people need me.",
        freedoms: ["family", "security"],
      },
      {
        label: "Freedom means being present for ordinary days, not only emergencies.",
        freedoms: ["family", "time"],
      },
      {
        label: "Freedom means choosing a location or rhythm that keeps us close.",
        freedoms: ["family", "geographic"],
      },
      {
        label: "Freedom means healing patterns so I can love with less defensiveness.",
        freedoms: ["family", "spiritual"],
      },
    ],
  },
  {
    id: "usefulness",
    section: "freedom",
    text: "What kind of usefulness do you hope freedom makes possible?",
    options: [
      {
        label: "Quiet generosity without risking my own stability.",
        freedoms: ["service", "security"],
      },
      {
        label: "Showing up with time, attention, and practical help.",
        freedoms: ["service", "time"],
      },
      {
        label: "Creating tools, art, writing, or teaching that can help others.",
        freedoms: ["service", "creative"],
      },
      {
        label: "Being a calmer, wiser presence in the lives around me.",
        freedoms: ["service", "spiritual"],
      },
    ],
  },
  {
    id: "spaciousness",
    section: "freedom",
    text: "What would make freedom feel inwardly real?",
    options: [
      {
        label: "A financial margin large enough that I can sleep well.",
        freedoms: ["security"],
      },
      {
        label: "Open mornings, unhurried meals, and fewer rushed transitions.",
        freedoms: ["time"],
      },
      {
        label: "The ability to make without turning everything into a product.",
        freedoms: ["creative"],
      },
      {
        label: "A daily rhythm that lets me become less reactive and more awake.",
        freedoms: ["spiritual"],
      },
    ],
  },
  {
    id: "ideal-week",
    section: "afterEnough",
    text: "Which ideal week feels most alive?",
    options: [
      {
        label: "Quiet routines, health, home projects, reading, and time with loved ones.",
        vision: ["rooted", "family", "simple"],
      },
      {
        label: "A few focused work blocks, creative projects, and long open afternoons.",
        vision: ["creative", "balanced", "learning"],
      },
      {
        label: "Travel, long walks in new places, flexible work, and light possessions.",
        vision: ["mobile", "simple", "learning"],
      },
      {
        label: "Service, community involvement, mentoring, and contemplative practice.",
        vision: ["service", "community", "inner"],
      },
    ],
  },
  {
    id: "work-after-fi",
    section: "afterEnough",
    text: "What role should work play after financial independence?",
    options: [
      {
        label: "Much smaller, chosen carefully, and never allowed to consume life.",
        vision: ["balanced", "simple", "family"],
      },
      {
        label: "A creative outlet I can shape on my own terms.",
        vision: ["creative", "learning", "balanced"],
      },
      {
        label: "A useful form of contribution, teaching, or mentoring.",
        vision: ["service", "community", "learning"],
      },
      {
        label: "Possibly none for a while; I may need rest and inner rebuilding first.",
        vision: ["inner", "simple", "rooted"],
      },
    ],
  },
  {
    id: "contribution",
    section: "afterEnough",
    text: "How do you picture contribution?",
    options: [
      {
        label: "Being deeply available to my family and closest people.",
        vision: ["family", "rooted", "community"],
      },
      {
        label: "Mentoring, volunteering, giving, or helping locally.",
        vision: ["service", "community", "rooted"],
      },
      {
        label: "Writing, teaching, building, or creating things that travel farther than I do.",
        vision: ["creative", "learning", "service"],
      },
      {
        label: "Living with less grasping, more peace, and a gentler presence.",
        vision: ["inner", "simple", "family"],
      },
    ],
  },
  {
    id: "learning",
    section: "afterEnough",
    text: "What kind of learning belongs in your next chapter?",
    options: [
      {
        label: "Practical skills that make ordinary life richer and more self-reliant.",
        vision: ["rooted", "simple", "learning"],
      },
      {
        label: "Deep study, books, ideas, languages, or long intellectual projects.",
        vision: ["learning", "creative", "inner"],
      },
      {
        label: "Learning through travel, culture, and direct experience.",
        vision: ["mobile", "learning", "community"],
      },
      {
        label: "Inner learning: therapy, meditation, prayer, or spiritual discipline.",
        vision: ["inner", "family", "simple"],
      },
    ],
  },
  {
    id: "travel",
    section: "afterEnough",
    text: "What kind of travel, if any, feels right?",
    options: [
      {
        label: "Occasional meaningful trips, with home remaining the center.",
        vision: ["rooted", "family", "balanced"],
      },
      {
        label: "Slow travel that lets me stay long enough to belong a little.",
        vision: ["mobile", "community", "learning"],
      },
      {
        label: "Travel connected to retreat, pilgrimage, nature, or spiritual reset.",
        vision: ["mobile", "inner", "spiritual"],
      },
      {
        label: "Less travel than people expect; I may want depth more than novelty.",
        vision: ["simple", "rooted", "inner"],
      },
    ],
  },
  {
    id: "community",
    section: "afterEnough",
    text: "What kind of community do you want around you?",
    options: [
      {
        label: "A close circle that shares meals, history, and practical care.",
        vision: ["community", "family", "rooted"],
      },
      {
        label: "A creative or intellectual circle that keeps me awake and honest.",
        vision: ["community", "creative", "learning"],
      },
      {
        label: "A service-oriented circle that makes generosity feel normal.",
        vision: ["community", "service", "rooted"],
      },
      {
        label: "A quieter circle that respects solitude and inner work.",
        vision: ["community", "inner", "simple"],
      },
    ],
  },
  {
    id: "inner-growth",
    section: "afterEnough",
    text: "What inner growth feels most important after enough?",
    options: [
      {
        label: "Becoming less anxious about security and more trusting of sufficiency.",
        vision: ["inner", "simple", "rooted"],
      },
      {
        label: "Becoming less rushed and more able to inhabit the present.",
        vision: ["inner", "balanced", "family"],
      },
      {
        label: "Becoming more courageous in making, speaking, and choosing.",
        vision: ["creative", "inner", "learning"],
      },
      {
        label: "Becoming more loving, forgiving, and available.",
        vision: ["inner", "family", "service"],
      },
    ],
  },
  {
    id: "lifestyle",
    section: "afterEnough",
    text: "Which lifestyle rhythm sounds most sustainable?",
    options: [
      {
        label: "Stable, local, healthful, and intentionally ordinary.",
        vision: ["rooted", "simple", "family"],
      },
      {
        label: "Seasonal: periods of work, rest, travel, and retreat.",
        vision: ["balanced", "mobile", "inner"],
      },
      {
        label: "Creative: flexible days organized around making and learning.",
        vision: ["creative", "learning", "balanced"],
      },
      {
        label: "Civic or relational: service, hospitality, community, and family.",
        vision: ["service", "community", "family"],
      },
    ],
  },
  {
    id: "becoming",
    section: "afterEnough",
    text: "After enough, what do you most hope to become free for?",
    options: [
      {
        label: "Peace, health, and a simpler life I can actually feel.",
        vision: ["simple", "rooted", "inner"],
      },
      {
        label: "Presence with the people I love.",
        vision: ["family", "community", "balanced"],
      },
      {
        label: "Creative courage and a body of work that feels true.",
        vision: ["creative", "learning", "service"],
      },
      {
        label: "Wisdom, service, and a deeper relationship with what matters.",
        vision: ["inner", "service", "spiritual"],
      },
    ],
  },
  {
    id: "future-home-base",
    section: "location",
    text: "When you imagine your future home base, what feels most right?",
    options: [
      {
        label: "One stable place where I can deepen roots over time.",
        freedoms: ["security", "family"],
        location: ["rooted", "community"],
      },
      {
        label: "A primary home with the option to spend long stretches elsewhere.",
        freedoms: ["geographic", "time"],
        location: ["twoWorld", "rooted"],
      },
      {
        label: "Two meaningful places that each hold part of my life.",
        freedoms: ["geographic", "family"],
        location: ["twoWorld", "community"],
      },
      {
        label: "A lighter setup where home can shift with the season.",
        freedoms: ["geographic"],
        location: ["modernNomad", "slowTraveler"],
      },
    ],
  },
  {
    id: "family-proximity",
    section: "location",
    text: "How important is living near family or your closest people?",
    options: [
      {
        label: "Very important; I want ordinary closeness, not only visits.",
        freedoms: ["family"],
        location: ["rooted", "community"],
      },
      {
        label: "Important, but I could split time if the rhythm is reliable.",
        freedoms: ["family", "geographic"],
        location: ["twoWorld", "community"],
      },
      {
        label: "I want connection, but I do not need everyone in one place.",
        freedoms: ["geographic", "time"],
        location: ["slowTraveler", "twoWorld"],
      },
      {
        label: "My people may be spread out, and freedom helps me reach them.",
        freedoms: ["geographic", "family"],
        location: ["purposeExplorer", "modernNomad"],
      },
    ],
  },
  {
    id: "two-locations",
    section: "location",
    text: "How does splitting time between two locations sound?",
    options: [
      {
        label: "Too fragmented; I would rather belong deeply in one place.",
        freedoms: ["family", "security"],
        location: ["rooted", "community"],
      },
      {
        label: "Appealing if both places support real relationships.",
        freedoms: ["geographic", "family"],
        location: ["twoWorld", "community"],
      },
      {
        label: "Appealing seasonally, especially for climate, family, or renewal.",
        freedoms: ["geographic", "time"],
        location: ["twoWorld", "slowTraveler"],
      },
      {
        label: "I would rather keep more than two possibilities open.",
        freedoms: ["geographic"],
        location: ["modernNomad", "purposeExplorer"],
      },
    ],
  },
  {
    id: "months-away",
    section: "location",
    text: "What about spending months at a time in different places?",
    options: [
      {
        label: "Occasionally, but I would want a familiar home waiting.",
        freedoms: ["geographic", "security"],
        location: ["twoWorld", "rooted"],
      },
      {
        label: "Yes, if I can move slowly and create a real daily rhythm.",
        freedoms: ["geographic", "time"],
        location: ["slowTraveler", "twoWorld"],
      },
      {
        label: "Yes, movement itself may become part of the lifestyle.",
        freedoms: ["geographic"],
        location: ["modernNomad", "slowTraveler"],
      },
      {
        label: "Only if the place connects to service, learning, or purpose.",
        freedoms: ["geographic", "service"],
        location: ["purposeExplorer", "community"],
      },
    ],
  },
  {
    id: "international-living",
    section: "location",
    text: "How do you feel about international living?",
    options: [
      {
        label: "Interesting for visits, but I probably want my life based close to home.",
        freedoms: ["security", "family"],
        location: ["rooted", "community"],
      },
      {
        label: "I could imagine part of the year abroad if it feels grounded.",
        freedoms: ["geographic", "time"],
        location: ["twoWorld", "slowTraveler"],
      },
      {
        label: "I am drawn to extended international stays and cultural immersion.",
        freedoms: ["geographic", "intellectual"],
        location: ["slowTraveler", "purposeExplorer"],
      },
      {
        label: "I want the freedom to live internationally when life calls for it.",
        freedoms: ["geographic"],
        location: ["modernNomad", "purposeExplorer"],
      },
    ],
  },
  {
    id: "community-mobility",
    section: "location",
    text: "Which tension feels most true: community or mobility?",
    options: [
      {
        label: "Community matters more; I want to be known somewhere.",
        freedoms: ["family", "service"],
        location: ["community", "rooted"],
      },
      {
        label: "I want both: one or two communities and room to move.",
        freedoms: ["geographic", "family"],
        location: ["twoWorld", "community"],
      },
      {
        label: "Mobility matters, but I still want to build temporary depth.",
        freedoms: ["geographic", "time"],
        location: ["slowTraveler", "purposeExplorer"],
      },
      {
        label: "Mobility matters most; I feel alive when life stays open.",
        freedoms: ["geographic", "creative"],
        location: ["modernNomad", "slowTraveler"],
      },
    ],
  },
  {
    id: "ownership-flexibility",
    section: "location",
    text: "How do you think about home ownership and flexibility?",
    options: [
      {
        label: "Owning a stable home feels like peace and belonging.",
        freedoms: ["security", "family"],
        location: ["rooted", "community"],
      },
      {
        label: "I like a home base, but I do not want it to trap every future choice.",
        freedoms: ["security", "geographic"],
        location: ["twoWorld", "rooted"],
      },
      {
        label: "I prefer flexibility, lighter possessions, and fewer fixed obligations.",
        freedoms: ["geographic", "time"],
        location: ["slowTraveler", "modernNomad"],
      },
      {
        label: "I would choose housing around mission, relationships, or the season of life.",
        freedoms: ["geographic", "service"],
        location: ["purposeExplorer", "community"],
      },
    ],
  },
  {
    id: "travel-meaning",
    section: "location",
    text: "What role should travel play after enough?",
    options: [
      {
        label: "Travel is renewal, but not the center of my life.",
        freedoms: ["time"],
        location: ["rooted", "community"],
      },
      {
        label: "Travel is a seasonal rhythm that complements a rooted life.",
        freedoms: ["geographic", "time"],
        location: ["twoWorld", "slowTraveler"],
      },
      {
        label: "Travel is a lifestyle of slow learning, not a vacation from life.",
        freedoms: ["geographic", "intellectual"],
        location: ["slowTraveler", "modernNomad"],
      },
      {
        label: "Travel is how I follow purpose, service, learning, or calling.",
        freedoms: ["geographic", "service"],
        location: ["purposeExplorer", "modernNomad"],
      },
    ],
  },
];

const FREEDOMS = {
  security: {
    title: "Security Freedom",
    description:
      "You want freedom from financial fragility. Enough means a sturdy base, fewer emergencies of the mind, and the ability to make choices without fear doing all the talking.",
  },
  time: {
    title: "Time Freedom",
    description:
      "You are seeking ownership of your days. Freedom means unhurried attention, open space, and the right to spend your best hours on what matters.",
  },
  geographic: {
    title: "Geographic Freedom",
    description:
      "You want place to become a choice again. Freedom may mean location independence, travel flexibility, living abroad, multiple home bases, or choosing where life happens instead of inheriting it by default.",
  },
  creative: {
    title: "Creative Freedom",
    description:
      "You want room to make, build, write, design, teach, or experiment without everything needing to justify itself as income.",
  },
  intellectual: {
    title: "Intellectual Freedom",
    description:
      "You are seeking freedom to think clearly. Reading, questioning, study, conversation, and independent judgment may be central to your next chapter.",
  },
  family: {
    title: "Family Freedom",
    description:
      "You want freedom to be present for the people closest to you: not only in crisis, but in ordinary days, meals, care, repair, and memory.",
  },
  service: {
    title: "Service Freedom",
    description:
      "You want enough to make generosity practical. Freedom means being able to mentor, give, help, volunteer, or do useful work without being trapped by necessity.",
  },
  spiritual: {
    title: "Spiritual Freedom",
    description:
      "You are seeking freedom from inner noise. Silence, prayer, awareness, retreat, nature, or deeper practice may matter as much as external independence.",
  },
};

const LIFE_PROFILES = [
  {
    title: "The Steady Steward",
    tags: ["stoic", "virtue", "duty"],
    paragraphs: [
      "Your life philosophy seems grounded in character, responsibility, and steadiness. You may not need life to be easy in order to take it seriously. What matters is whether you can meet reality with a clear conscience, keep your word, care for what has been entrusted to you, and become the kind of person you respect.",
      "For you, After Enough is not permission to drift. It is a chance to live with fewer false pressures and more deliberate values. The deeper question is how to keep your strength without letting duty become a cage.",
    ],
  },
  {
    title: "The Relational Humanist",
    tags: ["relational", "humanist", "service"],
    paragraphs: [
      "Your life philosophy seems centered on love, usefulness, and human dignity. You appear to measure a good life less by private achievement and more by the quality of your presence: how you listen, help, forgive, mentor, and stay available to real people.",
      "For you, After Enough may be a more humane way of belonging. Financial independence matters because it can return time and attention to the relationships and causes that make life feel honest. The challenge is to serve without quietly disappearing inside everyone else's needs.",
    ],
  },
  {
    title: "The Curious Builder",
    tags: ["rational", "growth", "creative", "seeker"],
    paragraphs: [
      "Your life philosophy seems shaped by curiosity, improvement, and creative responsibility. You want to understand what is true, test ideas in practice, and keep becoming more capable without turning your life into a scoreboard.",
      "For you, After Enough is not an ending. It is a workshop with better light. You may still want projects, learning, and contribution, but on terms that feel more self-directed and less compulsive.",
    ],
  },
  {
    title: "The Quiet Seeker",
    tags: ["contemplative", "spiritual", "simple"],
    paragraphs: [
      "Your life philosophy seems drawn toward simplicity, awareness, and inner freedom. You may sense that the good life is not mainly about adding more, but about loosening what is unnecessary enough to notice what is already here.",
      "For you, After Enough may look like a calmer relationship with desire, time, and identity. The outer change matters, but the inner change may matter more: less grasping, more silence, more reverence, and a gentler way of moving through ordinary days.",
    ],
  },
];

const VISION_PROFILES = {
  rooted:
    "Your After Enough life may be quietly rooted: a stable home base, steady routines, health, local friendships, and a deeper appreciation for ordinary days. Work may become smaller and more carefully chosen, while home, craft, reading, and care become more visible.",
  balanced:
    "Your After Enough life may be seasonal and balanced. You may still want meaningful work, but not a life swallowed by it. The shape could include focused projects, long open afternoons, rest, travel, and enough space to hear yourself again.",
  creative:
    "Your After Enough life may become a creative studio for the soul. You may write, build, teach, make art, start a small project, or explore ideas without forcing every effort to become a business. The point is not productivity as performance, but expression with integrity.",
  mobile:
    "Your After Enough life may include more movement: slow travel, extended stays, time in nature, or living closer to places and people that fit the season you are in. Freedom may mean being less pinned down by habit, commute, climate, or old identity.",
  service:
    "Your After Enough life may turn toward contribution. You may mentor, volunteer, support family, join local work, teach, give, or use your experience to make someone else's path less lonely. Enough becomes a base for generosity.",
  community:
    "Your After Enough life may become more communal. Shared meals, local ties, chosen family, civic life, creative circles, or spiritual community could matter more than private escape. Freedom may be less about being alone and more about belonging well.",
  family:
    "Your After Enough life may center on presence with family and close friends. You may want to be available for school pickups, aging parents, shared meals, slow conversations, repair, and the ordinary moments that are easy to miss while striving.",
  learning:
    "Your After Enough life may be a long apprenticeship to what fascinates you. Books, languages, ideas, practical skills, travel, conversation, and self-education could become part of the weekly rhythm, not something postponed to the margins.",
  inner:
    "Your After Enough life may be an inner rebuilding. Therapy, meditation, prayer, retreat, journaling, forgiveness, or spiritual practice may help you become less reactive and more at home in yourself.",
  simple:
    "Your After Enough life may become simpler on purpose. Fewer possessions, fewer obligations, less status maintenance, and more direct contact with health, nature, friendship, and quiet may give your freedom its real texture.",
};

const LOCATION_PROFILES = [
  {
    key: "rooted",
    title: "The Rooted Life",
    tags: ["rooted"],
    description:
      "Your results suggest a Rooted Life. You seem drawn to a stable home base, familiar routines, and the slow trust that comes from being known somewhere. Travel may still matter, but it is more likely to refresh your life than define it. For you, geographic freedom may mean choosing your place with care and then having enough room to belong there deeply.",
  },
  {
    key: "twoWorld",
    title: "The Two-World Life",
    tags: ["twoWorld"],
    description:
      "Your results suggest a Two-World Life. You value roots, family, and belonging, but also appreciate the freedom to spend extended periods in different locations. Rather than settling permanently in a single place or living as a full-time nomad, you appear drawn toward maintaining meaningful connections in more than one community.",
  },
  {
    key: "slowTraveler",
    title: "The Slow Traveler",
    tags: ["slowTraveler"],
    description:
      "Your results suggest a Slow Traveler. You may not want constant motion, but you do want enough time in a place to develop rhythm, friendship, curiosity, and ordinary life. Travel, for you, is less about checking off destinations and more about letting a different place shape your attention for a while.",
  },
  {
    key: "modernNomad",
    title: "The Modern Nomad",
    tags: ["modernNomad"],
    description:
      "Your results suggest a Modern Nomad. You seem energized by openness, flexibility, and the ability to follow seasons, opportunities, relationships, or curiosity without being overly fixed in one place. The important question may be how to keep mobility connected to health, friendship, and meaning rather than letting it become permanent escape.",
  },
  {
    key: "community",
    title: "The Community Builder",
    tags: ["community"],
    description:
      "Your results suggest a Community Builder. Place matters because people matter. You may be willing to move or split time, but only if your life still has shared meals, familiar faces, local usefulness, and a sense of mutual care. Geographic freedom, for you, works best when it strengthens belonging instead of thinning it out.",
  },
  {
    key: "purposeExplorer",
    title: "The Purpose Explorer",
    tags: ["purposeExplorer"],
    description:
      "Your results suggest a Purpose Explorer. You appear drawn to location freedom when it serves learning, service, calling, or personal growth. You may be less interested in travel as leisure and more interested in going where a season of life asks you to go, while staying thoughtful about the relationships and responsibilities that travel touches.",
  },
];

const READING_LIBRARY = {
  stoic: {
    theme: "Character, steadiness, and enough",
    books: ["Marcus Aurelius, Meditations", "Epictetus, Discourses"],
  },
  virtue: {
    theme: "Practical wisdom and moral growth",
    books: ["Aristotle, Nicomachean Ethics", "Viktor Frankl, Man's Search for Meaning"],
  },
  duty: {
    theme: "Responsibility, family, and moral continuity",
    books: ["C. S. Lewis, The Four Loves", "Wendell Berry, Hannah Coulter"],
  },
  service: {
    theme: "Contribution after independence",
    books: ["Peter Singer, The Life You Can Save", "Viktor Frankl, Man's Search for Meaning"],
  },
  humanist: {
    theme: "Compassion and the human condition",
    books: ["William James, The Varieties of Religious Experience", "Parker Palmer, Let Your Life Speak"],
  },
  relational: {
    theme: "Love, belonging, and repair",
    books: ["bell hooks, All About Love", "David Brooks, The Second Mountain"],
  },
  rational: {
    theme: "Clear thinking and honest revision",
    books: ["Julia Galef, The Scout Mindset", "Daniel Kahneman, Thinking, Fast and Slow"],
  },
  seeker: {
    theme: "Meaning, doubt, and chosen direction",
    books: ["Viktor Frankl, Man's Search for Meaning", "James Hollis, Finding Meaning in the Second Half of Life"],
  },
  growth: {
    theme: "Self-knowledge without endless striving",
    books: ["Carl Jung, Modern Man in Search of a Soul", "James Clear, Atomic Habits"],
  },
  creative: {
    theme: "Creative courage and work after enough",
    books: ["Lewis Hyde, The Gift", "Rick Rubin, The Creative Act"],
  },
  simple: {
    theme: "Simplicity, desire, and enoughness",
    books: ["Thoreau, Walden", "Epicurus, Letter to Menoeceus"],
  },
  contemplative: {
    theme: "Awareness, silence, and non-clinging",
    books: ["Tao Te Ching", "Alan Watts, The Wisdom of Insecurity"],
  },
  spiritual: {
    theme: "Devotion, mystery, and inner freedom",
    books: ["Bhagavad Gita", "Thomas Merton, New Seeds of Contemplation"],
  },
};

const EXPERIMENTS = {
  security:
    "Write a one-page enough plan: the minimum monthly spend, emergency margin, and conditions that would let your nervous system relax.",
  time:
    "Protect one unscheduled half-day each week for a month. Do not optimize it. Notice what your attention reaches for once it is not being managed.",
  geographic:
    "Spend one afternoon designing three possible home bases or slow-travel seasons, including cost, relationships, climate, and daily rhythm.",
  creative:
    "Give yourself five 45-minute making sessions in the next 30 days, with no requirement to publish, sell, or improve the result.",
  intellectual:
    "Choose one question you genuinely care about and keep a 30-day reading note. Let the question, not a productivity system, lead.",
  family:
    "Create one recurring family ritual: a walk, meal, phone call, errand, or shared quiet hour that does not need to be impressive.",
  service:
    "Offer one concrete act of service each week: mentoring, volunteering, helping a neighbor, giving, or making a useful introduction.",
  spiritual:
    "Try 10 minutes of silence, prayer, meditation, or contemplative walking for 20 of the next 30 days. Keep it simple enough to actually do.",
  creativeVision:
    "Make a small body-of-work list: five essays, songs, lessons, tools, or projects you would make if income were not the main filter.",
  community:
    "Invite two people into a real conversation or shared meal. Pay attention to whether your freedom is asking for more belonging, not less.",
  inner:
    "Journal for 15 minutes on this prompt: What part of me does not know how to rest yet?",
};

function countByKey(answers, key) {
  return answers.reduce((scores, answer) => {
    (answer.option[key] || []).forEach((tag) => {
      scores[tag] = (scores[tag] || 0) + 1;
    });
    return scores;
  }, {});
}

function topEntries(scores, limit) {
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit);
}

function uniqueItems(items) {
  return [...new Set(items.filter(Boolean))];
}

function pickLifeProfile(tagScores) {
  return LIFE_PROFILES.map((profile) => ({
    ...profile,
    score: profile.tags.reduce((sum, tag) => sum + (tagScores[tag] || 0), 0),
  })).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))[0];
}

function pickLocationProfile(locationScores) {
  return LOCATION_PROFILES.map((profile) => ({
    ...profile,
    score: profile.tags.reduce((sum, tag) => sum + (locationScores[tag] || 0), 0),
  })).sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))[0];
}

function buildBlindSpots(tagScores, topFreedomKeys, topVisionKeys) {
  const warnings = [];

  if ((tagScores.duty || 0) + (tagScores.stoic || 0) > 4) {
    warnings.push(
      "Duty can become a hiding place if you never ask what you actually desire.",
    );
  }

  if ((tagScores.service || 0) + (tagScores.relational || 0) > 4 || topFreedomKeys.includes("service")) {
    warnings.push(
      "Caring for others may need clearer boundaries, especially once more people notice your availability.",
    );
  }

  if ((tagScores.growth || 0) + (tagScores.creative || 0) > 4 || topFreedomKeys.includes("creative")) {
    warnings.push(
      "The habit of becoming can quietly recreate the pressure you hoped financial independence would release.",
    );
  }

  if ((tagScores.rational || 0) + (tagScores.seeker || 0) > 4 || topFreedomKeys.includes("intellectual")) {
    warnings.push(
      "Analysis can clarify life, but it can also postpone grief, love, risk, and action.",
    );
  }

  if ((tagScores.simple || 0) + (tagScores.contemplative || 0) > 4 || topVisionKeys.includes("simple")) {
    warnings.push(
      "Simplicity is healthiest when it is chosen from fullness, not from fear of responsibility or disappointment.",
    );
  }

  if (topFreedomKeys.includes("security")) {
    warnings.push(
      "Security can keep asking for one more cushion. Decide what enough means before fear keeps moving the line.",
    );
  }

  if (topFreedomKeys.includes("geographic")) {
    warnings.push(
      "Mobility can refresh your life, but it will not replace the slower work of belonging.",
    );
  }

  if (topFreedomKeys.includes("spiritual") || topVisionKeys.includes("inner")) {
    warnings.push(
      "Inner work should make ordinary relationships more honest and loving, not easier to avoid.",
    );
  }

  return uniqueItems(warnings).slice(0, 5);
}

function buildReadingPath(tagScores, topFreedomKeys, topVisionKeys) {
  const tags = topEntries(tagScores, 5).map(([tag]) => tag);
  const freedomThemes = {
    security: "Financial calm, sufficiency, and nervous-system safety",
    time: "Time, attention, and the art of an unhurried life",
    geographic: "Place, home, travel, and chosen rootedness",
    family: "Family presence, repair, and intergenerational care",
    service: "Service, usefulness, and contribution after FI",
    spiritual: "Silence, surrender, and spiritual freedom",
    creative: "Creativity without performance pressure",
    intellectual: "Independent thinking and lifelong study",
  };

  const path = tags
    .map((tag) => READING_LIBRARY[tag])
    .filter(Boolean)
    .map((entry) => `${entry.theme}: ${entry.books.join("; ")}`);

  topFreedomKeys.slice(0, 2).forEach((key) => {
    path.push(`${freedomThemes[key]}: choose essays or books that help you practice this freedom in ordinary weeks.`);
  });

  if (topVisionKeys.includes("inner")) {
    path.push("Inner growth after enough: James Hollis, Finding Meaning in the Second Half of Life; Thomas Merton, New Seeds of Contemplation");
  }

  return uniqueItems(path).slice(0, 6);
}

function buildExperiments(topFreedomKeys, topVisionKeys) {
  const experiments = [
    ...topFreedomKeys.map((key) => EXPERIMENTS[key]),
    ...(topVisionKeys.includes("creative") ? [EXPERIMENTS.creativeVision] : []),
    ...(topVisionKeys.includes("community") ? [EXPERIMENTS.community] : []),
    ...(topVisionKeys.includes("inner") ? [EXPERIMENTS.inner] : []),
  ];

  return uniqueItems(experiments).slice(0, 5);
}

function buildResult(answers) {
  const tagScores = countByKey(answers, "tags");
  const freedomScores = countByKey(answers, "freedoms");
  const visionScores = countByKey(answers, "vision");
  const locationScores = countByKey(answers, "location");
  const lifeProfile = pickLifeProfile(tagScores);
  const locationProfile = pickLocationProfile(locationScores);
  const topFreedomKeys = topEntries(freedomScores, 3).map(([key]) => key);
  const topVisionKeys = topEntries(visionScores, 3).map(([key]) => key);
  const dominantVision = topVisionKeys[0] || "balanced";
  const locationAndFreedomAnswers = answers.filter((answer) =>
    ["freedom", "location"].includes(answer.section),
  );
  const geographicFreedomScore = Math.round(
    ((freedomScores.geographic || 0) / Math.max(locationAndFreedomAnswers.length, 1)) * 100,
  );

  return {
    lifeTitle: lifeProfile.title,
    lifePhilosophy: lifeProfile.paragraphs,
    freedomProfile: topFreedomKeys.map((key) => FREEDOMS[key]),
    geographicFreedomScore,
    afterEnoughVision: VISION_PROFILES[dominantVision],
    locationLifestyle: {
      title: locationProfile.title,
      description: locationProfile.description,
    },
    blindSpots: buildBlindSpots(tagScores, topFreedomKeys, topVisionKeys),
    readingPath: buildReadingPath(tagScores, topFreedomKeys, topVisionKeys),
    experiments: buildExperiments(topFreedomKeys, topVisionKeys),
  };
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

  const currentQuestion = QUESTIONS[currentIndex];
  const isComplete = currentIndex >= QUESTIONS.length;
  const result = useMemo(() => (isComplete ? buildResult(answers) : null), [answers, isComplete]);
  const currentSection = currentQuestion ? SECTIONS[currentQuestion.section] : null;
  const progressWidth = `${Math.round((currentIndex / QUESTIONS.length) * 100)}%`;

  function goNext() {
    if (selectedIndex === null) return;

    setAnswers((current) => [
      ...current,
      {
        section: currentQuestion.section,
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
  }

  function downloadPdf() {
    if (!result) return;

    const date = formatDate();
    const pdf = createTextPdf("Life Philosophy Assessment", buildPdfSections(result, date));

    downloadBlob(pdf, "life-philosophy-assessment.pdf");
  }

  return (
    <main className="life-philosophy-page">
      <section className="life-philosophy-shell">
        <header className="life-philosophy-hero">
          <p className="life-philosophy-eyebrow">After Enough flagship assessment</p>
          <h1>Life Philosophy Assessment</h1>
          <p className="life-philosophy-intro">
            A reflective assessment for understanding your life philosophy, the kind
            of freedom you are seeking, and what After Enough may look like for you.
          </p>
        </header>

        {!started && (
          <section className="life-card intro-card">
            <h2>Not a personality quiz. A thoughtful mirror.</h2>
            <p>
              This assessment asks four questions: What is my life philosophy? What
              kind of freedom am I seeking? What does After Enough look like for me?
              And where might that future life happen?
            </p>
            <p>
              Move slowly. Choose the answer that feels most honest today, not the one
              that sounds most impressive. Your result is meant to be useful, warm,
              and revisable.
            </p>

            <div className="life-section-preview" aria-label="Assessment sections">
              {SECTION_ORDER.map((key) => (
                <article key={key}>
                  <span>{SECTIONS[key].label}</span>
                  <h3>{SECTIONS[key].title}</h3>
                  <p>{SECTIONS[key].description}</p>
                </article>
              ))}
            </div>

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

            <div className="life-section-kicker">
              <span>{currentSection.label}</span>
              <strong>{currentSection.shortTitle}</strong>
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
              <p className="life-result-label">Your Life Philosophy</p>
              <h2>{result.lifeTitle}</h2>
              <div className="life-narrative">
                {result.lifePhilosophy.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="life-actions wrap">
                <button
                  className="life-button"
                  type="button"
                  onClick={downloadPdf}
                  disabled={!result}
                >
                  Download My Full Assessment
                </button>
                <button className="life-button secondary" type="button" onClick={restart}>
                  Retake assessment
                </button>
              </div>
            </section>

            <section className="life-card">
              <p className="life-result-label">Your Freedom Profile</p>
              <div className="freedom-profile-grid">
                {result.freedomProfile.map((freedom) => (
                  <article className="freedom-profile-card" key={freedom.title}>
                    <h3>{freedom.title}</h3>
                    <p>{freedom.description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="life-card">
              <p className="life-result-label">Your After Enough Vision</p>
              <p className="life-statement">{result.afterEnoughVision}</p>
            </section>

            <section className="life-card">
              <p className="life-result-label">Your Location Lifestyle</p>
              <h3>{result.locationLifestyle.title}</h3>
              <p className="life-statement">{result.locationLifestyle.description}</p>
              <p className="geo-score">
                Geographic Freedom score: <strong>{result.geographicFreedomScore}/100</strong>
              </p>
            </section>

            <section className="life-result-grid">
              <ResultList title="Your Possible Blind Spots" items={result.blindSpots} />
              <ResultList title="Recommended Reading Path" items={result.readingPath} />
            </section>

            <section className="life-card">
              <h3>Suggested Experiments</h3>
              <ul className="life-list">
                {result.experiments.map((experiment) => (
                  <li key={experiment}>{experiment}</li>
                ))}
              </ul>
            </section>

            <p className="life-closing-line">
              Financial independence is not only about leaving work. It is about
              knowing what you are becoming free for.
            </p>
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
          max-width: 940px;
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
          letter-spacing: 0;
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
          border-radius: 8px;
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

        .life-section-preview {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-top: 24px;
        }

        .life-section-preview article {
          padding: 18px;
          background: #f7f1e6;
          border: 1px solid #e4d8c5;
          border-radius: 8px;
        }

        .life-section-preview span,
        .life-section-kicker span {
          display: block;
          margin-bottom: 8px;
          color: #746852;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .life-section-preview h3 {
          margin-bottom: 8px;
          font-size: 1.02rem;
        }

        .life-section-preview p {
          margin: 0;
          font-size: 0.92rem;
          line-height: 1.55;
        }

        .life-progress-wrap {
          margin-bottom: 24px;
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

        .life-section-kicker {
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px solid #eee5d8;
        }

        .life-section-kicker strong {
          color: #2f3a2e;
          font-size: 1rem;
          font-weight: 600;
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
          border-radius: 8px;
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

        .life-narrative p,
        .life-statement {
          font-size: 1.05rem;
        }

        .geo-score {
          display: inline-block;
          margin: 10px 0 0;
          padding: 8px 12px;
          color: #4a4339;
          background: #f7f1e6;
          border: 1px solid #e4d8c5;
          border-radius: 8px;
          font-size: 0.95rem;
          line-height: 1.45;
        }

        .freedom-profile-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        .freedom-profile-card {
          padding: 18px;
          background: #f7f1e6;
          border: 1px solid #e4d8c5;
          border-radius: 8px;
        }

        .freedom-profile-card h3 {
          font-size: 1.05rem;
        }

        .freedom-profile-card p {
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.62;
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

        .life-closing-line {
          max-width: 720px;
          margin: 26px auto 0;
          color: #3c352d;
          text-align: center;
          font-size: 1.2rem;
          line-height: 1.65;
        }

        @media (max-width: 820px) {
          .life-section-preview,
          .freedom-profile-grid,
          .life-result-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 760px) {
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
          }

          .life-progress-meta {
            flex-direction: column;
            gap: 4px;
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
