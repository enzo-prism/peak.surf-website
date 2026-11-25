// Questions and answers shown on /faq, in the home page FAQ, in the FAQPage
// structured data, and in llms-full.txt. Answers are plain strings so the
// structured data always matches the visible text word for word.
//
// Keep every answer true for the version currently on the App Store
// (APP_VERSION in site.ts). Do not describe unreleased features.

import { APP_VERSION, MIN_IOS, SUPPORT_EMAIL } from "../site";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  link?: { href: string; label: string };
  /** Shown in the short FAQ on the home page. */
  featured?: boolean;
};

export type FaqGroup = {
  title: string;
  items: FaqItem[];
};

export const faqGroups: FaqGroup[] = [
  {
    title: "The basics",
    items: [
      {
        id: "what-is-peak",
        question: "What is Peak Surf?",
        answer:
          "Peak (listed as peak.surf on the App Store) is a free, private surf journal for iPhone. You log each surf session with the spot, time in the water, gear, who you surfed with, a star rating, notes, and photos, and Peak turns that logbook into stats, a Board Report, records, and a personal Best Window Today. No account is required.",
        link: { href: "/features", label: "See every feature" },
        featured: true,
      },
      {
        id: "is-peak-free",
        question: "Is Peak free?",
        answer:
          "Yes. Peak is free to download on the App Store, with no ads and no account to create.",
        featured: true,
      },
      {
        id: "requirements",
        question: "What do I need to use Peak?",
        answer: `An iPhone running iOS ${MIN_IOS} or later. An Apple Watch is optional: Peak can import surfing workouts it saves to Apple Health. On iPhone models that support Apple Intelligence, the monthly recap is phrased on-device; every other iPhone shows the same facts as plain stats.`,
      },
      {
        id: "android",
        question: "Is Peak available on Android?",
        answer:
          "No. Peak is built for iPhone and is available on the Apple App Store.",
      },
      {
        id: "latest-version",
        question: "What is the latest version of Peak?",
        answer: `Peak ${APP_VERSION} is the current App Store release. It makes repeat logging faster with spot and gear suggestions from your history, adds time-in-water chips, and fixes several Stats charts.`,
        link: { href: "/changelog", label: "Read the release notes" },
      },
    ],
  },
  {
    title: "Privacy and your data",
    items: [
      {
        id: "account",
        question: "Do I need an account to use Peak?",
        answer:
          "No. Peak has no accounts, no sign-up, and no social features. Open the app and start logging.",
      },
      {
        id: "where-data-lives",
        question: "Where is my surf data stored?",
        answer:
          "On your iPhone. There is no Peak server, and the app has no analytics, tracking, or ads. Your sessions, spots, gear, photos, and videos stay on your device unless you export a backup or share a session yourself.",
        link: { href: "/privacy", label: "Read the privacy policy" },
        featured: true,
      },
      {
        id: "export",
        question: "Can I export my surf log?",
        answer:
          "Yes. You can export your sessions to JSON or CSV, or create a full backup that includes your photos and videos, whenever you want. Peak never sends these files anywhere on its own.",
      },
      {
        id: "conditions-privacy",
        question: "What does Peak send when it fills in surf conditions?",
        answer:
          "Only when you ask it to, Auto-fill Conditions sends the session's time window and the surf break's pinned coordinates to the public Open-Meteo marine and weather service over HTTPS. It never sends your name, notes, gear, buddies, or photos.",
      },
    ],
  },
  {
    title: "Apple Watch and Apple Health",
    items: [
      {
        id: "apple-watch",
        question: "Does Peak work with Apple Watch?",
        answer:
          "Yes, through Apple Health. Peak imports surfing workouts recorded on Apple Watch and, from the workout's GPS route, estimates your wave count, top speed, longest ride, and paddle distance on your iPhone. Peak itself runs on iPhone; it does not need a separate Watch app.",
        link: { href: "/apple-watch-surf-tracking", label: "How Apple Watch surf tracking works" },
        featured: true,
      },
      {
        id: "wave-count",
        question: "How does Peak count waves?",
        answer:
          "Peak estimates waves from the GPS route of a surfing workout imported from Apple Health. The math runs on your iPhone and nothing is sent anywhere. Every figure is labelled as an estimate and can be edited, your correction always wins, and a later import never overwrites it.",
      },
      {
        id: "health-write",
        question: "Can Peak save my surf sessions to Apple Health?",
        answer:
          "Yes, if you turn it on. Peak can save the sessions you log as surfing workouts in Apple Health. Apple Health is entirely optional, and access can be changed at any time in iPhone Settings.",
      },
    ],
  },
  {
    title: "Surf conditions and gear",
    items: [
      {
        id: "forecast",
        question: "Does Peak include a surf forecast?",
        answer:
          "Peak is a surf journal rather than a forecast app. With one tap it records the wind, waves, swell, water temperature, and tide for a session. Best Window Today then scores the next 24 hours at the breaks you log most against the sessions you rated there, and says so when your logbook does not yet carry enough signal.",
        featured: true,
      },
      {
        id: "quiver",
        question: "Can I track my surfboards and wetsuits?",
        answer:
          "Yes. The Quiver keeps your boards, wetsuits, fins, leashes, and other gear, and Board Report shows which board actually earns its keep, broken down by wave height and swell period.",
        featured: true,
      },
      {
        id: "widgets-siri",
        question: "Does Peak work with Siri, widgets, and the Lock Screen?",
        answer:
          "Yes. Peak has Home Screen and Lock Screen widgets for your week streak and last session, a Control Center button to start a session, Siri and Shortcuts actions to log, start, or end a session or ask when you last surfed, and a Live Activity on the Lock Screen and in the Dynamic Island.",
      },
    ],
  },
  {
    title: "About and support",
    items: [
      {
        id: "who-makes-peak",
        question: "Who makes Peak?",
        answer:
          "Peak started in 2022 as a senior project at Cal Poly San Luis Obispo, became a web app in 2025, and launched on the App Store in January 2026. It is built by a surfer and made with Prism.",
        link: { href: "/about", label: "Read the story" },
      },
      {
        id: "support",
        question: "How do I get help with Peak?",
        answer: `Email ${SUPPORT_EMAIL}. Include your app version, iOS version, device model, and the steps that led to the issue so a real person can help quickly.`,
        link: { href: "/support", label: "Visit support" },
      },
    ],
  },
];

export const allFaqItems: FaqItem[] = faqGroups.flatMap((group) => group.items);
export const featuredFaqItems: FaqItem[] = allFaqItems.filter((item) => item.featured);
