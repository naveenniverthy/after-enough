export const retreatAssessmentQuestions = [
  {
    id: "need",
    question: "What do I truly need right now?",
    options: [
      "Rest and inner quiet",
      "Meditation discipline",
      "Self-inquiry and understanding",
      "Devotion and prayerful atmosphere",
      "A simpler way of living",
      "Longer spiritual reorientation",
    ],
  },
  {
    id: "guidance",
    question: "What kind of support am I looking for?",
    options: [
      "Mostly silence and structure",
      "A clear teaching method",
      "Direct access to a teacher",
      "A devotional environment",
      "A balanced mix of practice and reflection",
    ],
  },
  {
    id: "intensity",
    question: "How much structure am I ready for?",
    options: ["Gentle", "Moderate", "Rigorous"],
  },
  {
    id: "orientation",
    question: "What kind of path am I drawn to?",
    options: [
      "Vedanta",
      "Silent meditation",
      "Yoga",
      "Bhakti",
      "Open exploration",
    ],
  },
  {
    id: "stage",
    question: "Where am I in my journey?",
    options: [
      "Beginner",
      "Sincere householder",
      "Serious seeker",
      "Exploring vanaprastha / life simplification",
    ],
  },
];

export const retreatCategories = [
  {
    slug: "stillness-inquiry",
    label: "Stillness & Inquiry",
    description:
      "Ashrams, silence-based retreats, meditation, and teaching-centered spaces for serious inner work.",
  },
  {
    slug: "healing-renewal",
    label: "Healing & Renewal",
    description:
      "Ayurveda, yoga, and restorative environments focused on recovery, health, and steadiness.",
  },
  {
    slug: "nature-reset",
    label: "Nature & Reset",
    description:
      "Hiking, mountain, and outdoor experiences that help people step away, simplify, and regain perspective.",
  },
  {
    slug: "service-devotion",
    label: "Service & Devotion",
    description:
      "Seva-based, devotional, and community-centered stays rooted in practice and shared life.",
  },
];

export const retreats = [
  {
    slug: "arsha-vidya-rishikesh",
    name: "Swami Dayananda Ashram, Rishikesh",
    location: "Rishikesh, Uttarakhand",
    website: "https://arshavidya.org/rishikesh-ashram/",
    orientation: "Vedanta",
    primaryMode: ["Study", "Reflection", "Satsang"],
    intensity: "Moderate",
    duration: "4–7 days",
    silenceLevel: "Low to moderate",
    teacherAccess: "Structured, course-based",
    costStyle: "Simple / program-based",
    accommodation: "Ashram-style",
    food: "Simple vegetarian",
    bestFor: ["Householders", "Serious seekers", "Vanaprastha exploration"],
    whyChoose:
      "Good for those who are looking for clarity through a traditional teaching environment rather than spiritual novelty.",
    whyNot:
      "Not ideal if you are looking mainly for silent retreat format, luxury comfort, or loosely structured exploration.",
    cautions: [
      "Best approached with genuine interest in teaching, not just atmosphere.",
    ],
    notes:
      "A serious Vedanta setting with a learning orientation and a more traditional ashram feel.",
    featured: true,
  },
  {
    slug: "arsha-vidya-anaikatti",
    name: "Arsha Vidya Gurukulam, Anaikatti",
    location: "Anaikatti, Tamil Nadu",
    website: "https://arshavidya.in/camps-retreats/",
    orientation: "Vedanta",
    primaryMode: ["Study", "Meditation", "Chanting"],
    intensity: "Moderate",
    duration: "4–7 days",
    silenceLevel: "Low to moderate",
    teacherAccess: "Program-based",
    costStyle: "Simple / retreat-based",
    accommodation: "Residential ashram",
    food: "Simple vegetarian",
    bestFor: ["Householders", "Serious seekers", "Vanaprastha exploration"],
    whyChoose:
      "Useful for seekers who value sampradaya, structure, and clarity over emotional intensity.",
    whyNot:
      "Not suitable if you want a casual wellness experience or highly personalized retreat luxury.",
    cautions: [
      "Traditional setting; better for sincere learners than spiritual tourists.",
    ],
    notes:
      "A strong option for those wanting retreat time rooted in Vedanta and a disciplined environment.",
    featured: true,
  },
  {
    slug: "vipassana-india",
    name: "Goenka Vipassana Centres",
    location: "Multiple locations across India",
    website: "https://www.dhamma.org/en-US/locations/directory?country=IN",
    orientation: "Vipassana",
    primaryMode: ["Silence", "Meditation", "Discipline"],
    intensity: "Rigorous",
    duration: "8–14 days",
    silenceLevel: "High",
    teacherAccess: "Method-led, limited personal interaction",
    costStyle: "Donation-based",
    accommodation: "Simple residential",
    food: "Simple vegetarian",
    bestFor: ["Beginners", "Repeat practitioners", "Serious seekers"],
    whyChoose:
      "Very useful for people who need discipline, silence, and a clear meditation container.",
    whyNot:
      "May feel too strict for someone emotionally depleted, physically fragile, or not ready for extended silence.",
    cautions: [
      "Strong discipline. Better entered with seriousness and realistic expectations.",
    ],
    notes:
      "A standardized silent meditation format with strong structure and minimal personalization.",
    featured: true,
  },
  {
    slug: "isha-yoga-center",
    name: "Isha Yoga Center",
    location: "Coimbatore, Tamil Nadu",
    website: "https://isha.sadhguru.org/in/en",
    orientation: "Yoga",
    primaryMode: ["Practice", "Meditation", "Volunteer energy"],
    intensity: "Moderate",
    duration: "2–3 days",
    silenceLevel: "Low to moderate",
    teacherAccess: "Program-led",
    costStyle: "Program-based",
    accommodation: "Retreat center",
    food: "Vegetarian",
    bestFor: ["Beginners", "Householders"],
    whyChoose:
      "Good for those drawn to a structured modern spiritual environment with strong energy and accessible entry points.",
    whyNot:
      "Not ideal if you are specifically looking for quiet Vedantic study or a low-stimulation ashram atmosphere.",
    cautions: [
      "Can be powerful for some, but may feel large-scale and brand-driven to others.",
    ],
    notes:
      "Better seen as a structured modern yoga-spiritual center than as a classic contemplative ashram retreat.",
    featured: false,
  },
  {
    slug: "ramakrishna-math-retreats",
    name: "Ramakrishna Math Retreats",
    location: "Various centers in India",
    website: "https://www.rkmath.org/",
    orientation: "Bhakti",
    primaryMode: ["Prayer", "Study", "Reflection"],
    intensity: "Gentle",
    duration: "2–3 days",
    silenceLevel: "Low to moderate",
    teacherAccess: "Limited but meaningful",
    costStyle: "Simple / center-dependent",
    accommodation: "Simple spiritual institution",
    food: "Simple vegetarian",
    bestFor: ["Beginners", "Householders", "Vanaprastha exploration"],
    whyChoose:
      "A grounded choice for those who value devotion, service, sincerity, and spiritual seriousness without spectacle.",
    whyNot:
      "Not the best fit if you want immersive silence or an explicitly nondual study-intensive format.",
    cautions: [
      "Retreat formats vary by center, so expectations should be checked carefully.",
    ],
    notes: "A quieter, more devotional path with dignity and seriousness.",
    featured: false,
  },
  {
    slug: "dhamma-bodhi-bodhgaya",
    name: "Dhamma Bodhi",
    location: "Bodhgaya, Bihar",
    website: "https://www.dhamma.org/en/schedules/schbodhi",
    orientation: "Vipassana",
    primaryMode: ["Silence", "Meditation", "Discipline"],
    intensity: "Rigorous",
    duration: "8–14 days",
    silenceLevel: "High",
    teacherAccess: "Method-led, limited personal interaction",
    costStyle: "Donation-based",
    accommodation: "Simple residential center",
    food: "Simple vegetarian",
    bestFor: ["Beginners", "Repeat practitioners", "Serious seekers"],
    whyChoose:
      "A good fit for someone looking for a standard Vipassana course in a quieter rural setting with strong structure.",
    whyNot:
      "Not suitable if you want flexibility, devotional atmosphere, or a retreat built around discussion and personal guidance.",
    cautions: [
      "This is a strict method-based silent retreat, not a casual wellness stay.",
    ],
    notes:
      "A serious meditation environment for those ready for silence, discipline, and a stable course structure.",
    featured: true,
  },
  {
    slug: "dhamma-setu-chennai",
    name: "Dhamma Setu",
    location: "Chennai, Tamil Nadu",
    website: "https://www.dhamma.org/en/schedules/schsetu",
    orientation: "Vipassana",
    primaryMode: ["Silence", "Meditation", "Discipline"],
    intensity: "Rigorous",
    duration: "8–14 days",
    silenceLevel: "High",
    teacherAccess: "Method-led, limited personal interaction",
    costStyle: "Donation-based",
    accommodation: "Simple residential center",
    food: "Simple vegetarian",
    bestFor: ["Beginners", "Repeat practitioners", "Serious seekers"],
    whyChoose:
      "Useful for those who want a recognized Vipassana center in South India with a clear and disciplined format.",
    whyNot:
      "Not ideal for someone seeking philosophical study, devotional practice, or a lighter retreat entry point.",
    cautions: [
      "Better entered with seriousness and realistic expectations about silence and structure.",
    ],
    notes:
      "A strong option in South India for those who want silence, method, and disciplined meditation practice.",
    featured: false,
  },
  {
    slug: "chinmaya-vibhooti-kolwan",
    name: "Chinmaya Vibhooti",
    location: "Kolwan, Maharashtra",
    website: "https://www.chinmayamission.com/global/chinmaya-vibhooti-kolwan",
    orientation: "Vedanta",
    primaryMode: ["Study", "Meditation", "Reflection"],
    intensity: "Moderate",
    duration: "2–3 days",
    silenceLevel: "Low to moderate",
    teacherAccess: "Program-based",
    costStyle: "Program-based",
    accommodation: "Retreat center",
    food: "Vegetarian",
    bestFor: ["Beginners", "Householders", "Vanaprastha exploration"],
    whyChoose:
      "A good fit for seekers who want a calm Vedantic setting with retreat infrastructure and a more accessible entry point.",
    whyNot:
      "Not the best fit if you are looking for austere traditional ashram life or deep silent retreat discipline.",
    cautions: [
      "This may suit reflective retreat-seekers more than those looking for intense renunciate-style simplicity.",
    ],
    notes:
      "A serene Vedanta-oriented retreat environment that can work well for thoughtful householders and midlife seekers.",
    featured: false,
  },
  {
    slug: "chinmaya-spiritual-camps",
    name: "Chinmaya Mission Spiritual Camps",
    location: "Various locations in India",
    website: "https://www.chinmayamission.com/global/chinmaya-spiritual-camps",
    orientation: "Vedanta",
    primaryMode: ["Study", "Meditation", "Bhajans"],
    intensity: "Moderate",
    duration: "4–7 days",
    silenceLevel: "Low",
    teacherAccess: "Guided, camp-based",
    costStyle: "Program-based",
    accommodation: "Camp / ashram style",
    food: "Vegetarian",
    bestFor: ["Householders", "Beginners", "Vanaprastha exploration"],
    whyChoose:
      "Useful for those who want a live-in Vedanta camp with study, community, and a structured spiritual atmosphere.",
    whyNot:
      "Not ideal if you want extended silence or a highly individualized retreat.",
    cautions: [
      "Camp formats can vary by event and location, so each listing should still be checked individually.",
    ],
    notes:
      "A good bridge for people who want immersion in Vedanta without needing a highly austere retreat model.",
    featured: false,
  },
  {
    slug: "sivananda-kutir-uttarkashi",
    name: "Sivananda Kutir",
    location: "Netala, near Uttarkashi, Uttarakhand",
    website: "https://sivananda.org.in/uttarkashi/",
    orientation: "Yoga",
    primaryMode: ["Yoga", "Meditation", "Vedanta"],
    intensity: "Moderate",
    duration: "4–7 days",
    silenceLevel: "Low to moderate",
    teacherAccess: "Ashram-led",
    costStyle: "Program-based",
    accommodation: "Ashram-style",
    food: "Vegetarian",
    bestFor: ["Beginners", "Householders", "Repeat practitioners"],
    whyChoose:
      "A strong fit for those who want classical yoga in a Himalayan setting with daily discipline and spiritual teaching.",
    whyNot:
      "Not the best choice if your main goal is scriptural inquiry in a Vedanta-only environment or strict silent retreat.",
    cautions: [
      "This is more of a lived yoga-ashram rhythm than a purely contemplative study retreat.",
    ],
    notes:
      "Good for seekers who want simplicity, yoga practice, and a quieter mountain setting without excess spectacle.",
    featured: true,
  },
  {
    slug: "sivananda-meenakshi-ashram",
    name: "Sivananda Yoga Vedanta Meenakshi Ashram",
    location: "Near Madurai, Tamil Nadu",
    website: "https://sivananda.org.in/madurai/",
    orientation: "Yoga",
    primaryMode: ["Yoga", "Meditation", "Spiritual teachings"],
    intensity: "Gentle",
    duration: "2–3 days",
    silenceLevel: "Low",
    teacherAccess: "Ashram-led",
    costStyle: "Program-based",
    accommodation: "Ashram-style",
    food: "Vegetarian",
    bestFor: ["Beginners", "Householders", "Vanaprastha exploration"],
    whyChoose:
      "A good entry point for someone who wants a peaceful spiritual stay with yoga, simple routine, and room for reflection.",
    whyNot:
      "Not suitable if you are specifically looking for intensive silence or a deep text-study retreat in a traditional Vedanta format.",
    cautions: [
      "This leans toward yoga-ashram living and gentle structure rather than intense inner withdrawal.",
    ],
    notes:
      "A calm and approachable ashram for those who need spiritual atmosphere, simplicity, and steady practice.",
    featured: false,
  },
  {
    slug: "sivananda-dhanwantari-ashram",
    name: "Sivananda Dhanwantari Ashram",
    location: "Neyyar Dam, Kerala",
    website: "https://sivananda.org.in/neyyardam/",
    orientation: "Yoga",
    primaryMode: ["Yoga", "Meditation", "Ashram living"],
    intensity: "Gentle",
    duration: "4–7 days",
    silenceLevel: "Low",
    teacherAccess: "Ashram-led",
    costStyle: "Program-based",
    accommodation: "Ashram-style",
    food: "Vegetarian",
    bestFor: ["Beginners", "Householders"],
    whyChoose:
      "A good choice for those looking for a traditional yoga-ashram environment with retreat and course options for different levels.",
    whyNot:
      "Not the right fit if you want a highly stripped-down austere environment or a strong nondual teaching focus.",
    cautions: [
      "This may attract people looking for healing and yoga immersion more than seekers focused on philosophical inquiry.",
    ],
    notes:
      "A broad-entry yoga ashram environment that can work well for rest, discipline, and gentle reorientation.",
    featured: false,
  },
  {
    slug: "yss-ashrams-centres",
    name: "YSS Ashrams and Retreat Centres",
    location: "Multiple locations across India",
    website: "https://yssi.org/",
    orientation: "Meditation",
    primaryMode: ["Meditation", "Devotion", "Guided spiritual routine"],
    intensity: "Moderate",
    duration: "2–3 days",
    silenceLevel: "Low to moderate",
    teacherAccess: "Center-based",
    costStyle: "Program / center dependent",
    accommodation: "Ashram / retreat center style",
    food: "Vegetarian",
    bestFor: ["Beginners", "Householders", "Repeat practitioners"],
    whyChoose:
      "Useful for those drawn to meditation, devotion, and a more devotional-contemplative spiritual environment.",
    whyNot:
      "Not ideal if you are specifically seeking traditional Vedanta study or a strict silent retreat container.",
    cautions: [
      "Formats vary by center and retreat, so this should be treated as a family of options rather than a single retreat type.",
    ],
    notes:
      "A broad spiritual ecosystem for those who resonate with meditation, inwardness, and devotional discipline.",
    featured: false,
  },
  {
    slug: "indiahikes-himalayan-treks",
    name: "Indiahikes Himalayan Treks",
    location: "India (Himalayas)",
    website: "https://indiahikes.com",
    orientation: "Nature / Hiking",
    primaryMode: ["Hiking", "Nature immersion", "Mental reset"],
    intensity: "Moderate to High",
    duration: "5–10 days",
    silenceLevel: "Low to moderate",
    teacherAccess: "Guide-led, not teaching-centered",
    costStyle: "Moderate",
    accommodation: "Basic to Moderate",
    food: "Vegetarian",
    bestFor: ["Nature immersion", "Physical challenge", "Mental reset"],
    whyChoose:
      "Combines physical effort with silence, perspective, and time in nature.",
    whyNot:
      "Not suitable if you want comfort, teaching, or structured spirituality.",
    cautions: [
      "The value here is simplicity and exposure, not inward guidance or retreat structure.",
    ],
    notes: "The mountain slows you down in a way nothing else does.",
    featured: false,
  },
  {
    slug: "silent-himalayan-walking-retreat",
    name: "Silent Himalayan Walking Retreat",
    location: "India / Nepal",
    website: "#",
    orientation: "Nature / Hiking",
    primaryMode: ["Walking", "Silence", "Nature immersion"],
    intensity: "Moderate",
    duration: "5–8 days",
    silenceLevel: "Moderate",
    teacherAccess: "Lightly guided",
    costStyle: "Moderate to High",
    accommodation: "Basic",
    food: "Vegetarian",
    bestFor: [
      "Silence outside closed settings",
      "Nature immersion",
      "Mental reset",
    ],
    whyChoose:
      "Movement and silence can create a gentler entry into introspection than sitting indoors for long periods.",
    whyNot:
      "Less structure and less guidance than a more traditional retreat format.",
    cautions: [
      "This is better understood as a quiet walking container than as a formal spiritual retreat.",
    ],
    notes: "Walking replaces sitting. The mind settles differently.",
    featured: false,
  },
  {
    slug: "nature-reset-retreats",
    name: "Nature Reset Retreats",
    location: "Global",
    website: "#",
    orientation: "Nature / Hiking",
    primaryMode: ["Rest", "Nature", "Reset"],
    intensity: "Low to Moderate",
    duration: "3–7 days",
    silenceLevel: "Low",
    teacherAccess: "Usually minimal",
    costStyle: "Moderate to High",
    accommodation: "Comfortable",
    food: "Varies",
    bestFor: ["Burnout", "Stress", "First-time retreat seekers"],
    whyChoose:
      "Accessible and often less intimidating than a silent retreat, while still creating room to step back and breathe.",
    whyNot:
      "May not go deeply into self-inquiry or traditional teaching.",
    cautions: [
      "These are often reset experiences rather than serious spiritual containers.",
    ],
    notes: "Sometimes distance from routine is enough to see clearly.",
    featured: false,
  },
];

export const ayurvedaRetreats = [
  {
    slug: "kairali-healing-village",
    name: "Kairali Ayurvedic Healing Village",
    location: "Palakkad, Kerala",
    website: "https://www.kairali.com/ayurvedic-healing-village.aspx",
    healthFocus: ["Panchakarma", "Rejuvenation", "Medical / therapeutic"],
    intensity: "Moderate",
    duration: "2+ weeks",
    doctorSupervision: "Yes",
    consultation: "Included",
    costStyle: "Premium structured",
    accommodation: "Wellness retreat",
    food: "Therapeutic Ayurveda diet",
    bestFor: ["Stress recovery", "Chronic issues", "Deep reset"],
    whyChoose:
      "A strong option for structured Ayurvedic healing with doctor supervision and personalized treatment.",
    whyNot:
      "Not suitable if you are primarily seeking spiritual inquiry or silence-based retreat.",
    cautions: [
      "Treatment-focused environment, not a contemplative ashram.",
    ],
    notes:
      "Best approached as a healing program rather than a spiritual retreat.",
  },
  {
    slug: "somatheeram-ayurveda",
    name: "Somatheeram Ayurveda Resort",
    location: "Kerala",
    website: "https://www.somatheeram.org/",
    healthFocus: ["Rejuvenation", "Yoga + Ayurveda"],
    intensity: "Gentle",
    duration: "4–7 days",
    doctorSupervision: "Yes",
    consultation: "Included",
    costStyle: "Program-based",
    accommodation: "Resort-style",
    food: "Ayurvedic vegetarian",
    bestFor: ["Relaxation", "Light healing", "Beginners"],
    whyChoose:
      "A softer entry into Ayurveda with a balance of healing and comfort.",
    whyNot:
      "Not suitable for deep detox or intense spiritual discipline.",
    cautions: [
      "Leans toward wellness retreat more than serious therapeutic immersion.",
    ],
    notes: "A bridge between wellness and traditional Ayurveda.",
  },
  {
    slug: "ananda-himalayas",
    name: "Ananda in the Himalayas",
    location: "Rishikesh, Uttarakhand",
    website: "https://www.anandaspa.com/",
    healthFocus: ["Stress recovery", "Rejuvenation", "Yoga + Ayurveda"],
    intensity: "Gentle",
    duration: "4–7 days",
    doctorSupervision: "Yes",
    consultation: "Included",
    costStyle: "Premium",
    accommodation: "Luxury wellness retreat",
    food: "Customized wellness cuisine",
    bestFor: ["Burnout recovery", "High-stress professionals"],
    whyChoose:
      "A highly comfortable environment for recovery and stress reset.",
    whyNot:
      "Not suitable for those seeking simplicity, austerity, or traditional ashram life.",
    cautions: [
      "Luxury environment may not support inward withdrawal for some seekers.",
    ],
    notes: "More about recovery than renunciation or inquiry.",
  },
  {
    slug: "vaidyaratnam-ooty",
    name: "Vaidyaratnam Oushadhasala Retreat",
    location: "Ooty, Tamil Nadu",
    website: "https://www.vaidyaratnammooss.com/",
    healthFocus: ["Medical / therapeutic", "Panchakarma"],
    intensity: "Moderate",
    duration: "2+ weeks",
    doctorSupervision: "Yes",
    consultation: "Included",
    costStyle: "Medical program",
    accommodation: "Clinical retreat setting",
    food: "Strict Ayurvedic diet",
    bestFor: ["Chronic conditions", "Serious healing"],
    whyChoose:
      "A more traditional and medically grounded Ayurvedic treatment center.",
    whyNot:
      "Not suitable for casual retreat experience or comfort-focused stays.",
    cautions: ["Clinical environment, not a retreat atmosphere."],
    notes: "Best seen as treatment, not retreat.",
  },
];
