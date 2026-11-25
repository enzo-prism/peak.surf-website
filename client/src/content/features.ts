// The complete feature reference for /features and llms-full.txt.
// Mirrors the current App Store description; keep it to shipped features only.

export type FeatureGroup = {
  id: string;
  title: string;
  summary: string;
  items: string[];
  link?: { href: string; label: string };
};

export const featureGroups: FeatureGroup[] = [
  {
    id: "logging",
    title: "Log a surf session in seconds",
    summary:
      "A session is a spot, a time in the water, and a rating. Everything else is optional, and a repeat surf takes a few taps.",
    items: [
      "Date and spot, with an optional location pin",
      "Time-in-water chips (1h, 1h 30m, 2h, 3h) that count back from now",
      "Gear used: boards, wetsuits, fins, leashes, and more",
      "Who you surfed with",
      "A star rating and optional notes",
      "Optional photos and videos",
      "Or start a timer when you paddle out and stop it when you come in",
      "New sessions start with your last spot and the gear you rode there",
    ],
  },
  {
    id: "history",
    title: "Your surf history at a glance",
    summary:
      "The logbook gives something back: patterns about spots, boards, and how often you actually get in the water.",
    items: [
      "Timeline with search and filters by spot, gear, buddy, rating, and date",
      "Stats for time in the water, week streaks, a consistency heatmap, monthly charts, and top spots and gear",
      "Monthly goals in sessions or hours, with a progress ring",
      "Wave records: most waves in a session, fastest wave, longest ride",
      "On This Day and Year in Review",
      "A map of the breaks you have pinned",
    ],
  },
  {
    id: "conditions",
    title: "Conditions and Best Window Today",
    summary:
      "Record what the ocean was doing, then let your own rated sessions tell you when your spot tends to work.",
    items: [
      "One-tap auto-fill for wind, waves, swell, water temperature, and tide",
      "Best Window Today scores the next 24 hours at your most-logged breaks against the sessions you rated there",
      "It tells you when your logbook does not yet carry enough signal to say",
      "Readings in your local units: ft, mph, and °F or m, km/h, and °C",
    ],
  },
  {
    id: "quiver",
    title: "Quiver and Board Report",
    summary: "Keep every board and wetsuit in one place and learn which one earns its keep.",
    items: [
      "Track boards, wetsuits, fins, leashes, and other gear",
      "See the session history for each piece of gear",
      "Board Report breaks down each board by wave height and swell period",
    ],
  },
  {
    id: "apple-health",
    title: "Apple Watch and Apple Health, entirely optional",
    summary:
      "Bring in surfs recorded on Apple Watch and let Peak estimate the numbers, with you keeping the final word.",
    items: [
      "Save your surf sessions to Apple Health as surfing workouts",
      "Import surfing workouts recorded elsewhere, including on Apple Watch",
      "Estimate wave count, top speed, longest ride, and paddle distance from a workout's GPS route, on your iPhone",
      "Every estimate is labelled and editable, and your correction always wins",
    ],
    link: { href: "/apple-watch-surf-tracking", label: "How Apple Watch surf tracking works" },
  },
  {
    id: "system",
    title: "Widgets, Siri, and the Lock Screen",
    summary: "Start and follow a session without digging through the app.",
    items: [
      "Home Screen and Lock Screen widgets for your week streak and last session",
      "A Control Center button to start a session without opening the app",
      "Siri and Shortcuts: log a session, start or end one, or ask when you last surfed",
      "A Live Activity that counts the session on the Lock Screen and in the Dynamic Island",
    ],
  },
  {
    id: "privacy",
    title: "Private by default",
    summary: "Your surf history is yours. Peak is designed so there is nothing to sign up for and nothing to leak.",
    items: [
      "No accounts and no social features",
      "No analytics, no tracking, and no ads in the app",
      "Your data stays on your device",
      "Export to JSON or CSV, or take a full backup including photos and videos",
    ],
    link: { href: "/privacy", label: "Read the privacy policy" },
  },
  {
    id: "design",
    title: "Designed for iOS",
    summary: "A calm, surf-inspired app that follows the system settings you already use.",
    items: [
      "Full Light and Dark Mode",
      "Dynamic Type, VoiceOver, and Reduce Motion support",
      "On iPhone models that support Apple Intelligence, the monthly recap is phrased on-device; Peak computes every number itself",
    ],
  },
];
