// Page registry: the one place that lists every page on the site.
//
// vite.config.ts uses it to write each page's <head> (title, description,
// canonical, Open Graph, structured data). scripts/prerender.mjs uses it to
// prerender each page and to generate sitemap.xml, llms.txt, and llms-full.txt.
// scripts/check-seo.mjs validates the built output against it.
//
// To add a page: add an entry here, create client/<file> with the
// `<!--peak:head-->` placeholder and one module script, add the file to
// build.rollupOptions.input in vite.config.ts, and link to it from the shared
// footer in components/SiteChrome.tsx.
//
// Imported by vite.config.ts, so keep imports relative.

import { allFaqItems } from "../content/faq";
import { hrefFor, routes, type PageKey } from "./routes";

export type { PageKey };
import {
  APP_FIRST_RELEASED,
  APP_NAME,
  APP_STORE_ID,
  APP_STORE_NAME,
  APP_STORE_URL,
  APP_VERSION,
  APP_VERSION_RELEASED,
  MAKER_NAME,
  MAKER_URL,
  MIN_IOS,
  OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  SUPPORT_EMAIL,
  absoluteUrl,
} from "../site";


export type SitePage = {
  key: PageKey;
  /** Public, extensionless URL path. Vercel cleanUrls serves `file` here. */
  path: string;
  /** HTML entry under client/ and output under dist/. */
  file: string;
  /** Page component module, relative to client/, for prerendering. */
  module: string;
  title: string;
  description: string;
  /** Shorter description for social cards; defaults to description. */
  socialDescription?: string;
  /** Name in breadcrumbs, llms.txt, and the footer. */
  label: string;
  /** One-line summary for llms.txt. */
  llmsSummary: string;
  /** ISO date the page content last changed meaningfully. */
  updated: string;
  indexable: boolean;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: number;
  /** Page uses Cloudinary images; adds a preconnect hint. */
  usesCloudinary?: boolean;
  webPageType?: string;
};

export const pages: SitePage[] = [
  {
    key: "home",
    path: routes.home,
    file: "index.html",
    module: "/src/App.tsx",
    title: "Peak Surf — Private Surf Log & Journal App for iPhone",
    description:
      "Log surf sessions in seconds, track your boards, and learn when your spot works. Peak is a free, private surf journal for iPhone: no account, no ads.",
    socialDescription:
      "Log surf sessions, track your boards, and keep your surf history private. Free on iPhone.",
    label: "Home",
    llmsSummary:
      "Overview of Peak: session logging, Best Window Today, Apple Health wave estimates, privacy, and a short FAQ.",
    updated: "2026-11-24",
    indexable: true,
    changefreq: "weekly",
    priority: 1,
    usesCloudinary: true,
  },
  {
    key: "features",
    path: routes.features,
    file: "features.html",
    module: "/src/FeaturesPage.tsx",
    title: "Peak Surf Features — Surf Log, Stats, Quiver & Conditions",
    description:
      "Everything Peak does: fast surf session logging, conditions auto-fill, Best Window Today, Board Report, stats, Apple Watch wave estimates, widgets, and export.",
    socialDescription:
      "Session logging, conditions, Best Window Today, Board Report, stats, Apple Watch wave estimates, and private export.",
    label: "Features",
    llmsSummary: `Complete list of features in Peak ${APP_VERSION}, grouped by logging, stats, conditions, gear, Apple Health, widgets, privacy, and design.`,
    updated: "2026-11-24",
    indexable: true,
    changefreq: "monthly",
    priority: 0.9,
    webPageType: "CollectionPage",
  },
  {
    key: "appleWatch",
    path: routes.appleWatch,
    file: "apple-watch-surf-tracking.html",
    module: "/src/AppleWatchPage.tsx",
    title: "Apple Watch Surf Tracking — Waves, Speed & Rides | Peak",
    description:
      "Turn Apple Watch surf workouts into a private surf log. Peak estimates wave count, top speed, longest ride, and paddle distance on your iPhone.",
    socialDescription:
      "Peak turns Apple Watch surf workouts into a private surf log, with wave count, top speed, and longest ride estimated on your iPhone.",
    label: "Apple Watch surf tracking",
    llmsSummary:
      "How Peak imports Apple Watch surfing workouts from Apple Health and estimates wave count, top speed, longest ride, and paddle distance on-device.",
    updated: "2026-11-24",
    indexable: true,
    changefreq: "monthly",
    priority: 0.8,
  },
  {
    key: "faq",
    path: routes.faq,
    file: "faq.html",
    module: "/src/FaqPage.tsx",
    title: "Peak Surf FAQ — Price, Privacy, Apple Watch & Your Data",
    description:
      "Answers about Peak, the private surf journal for iPhone: price, accounts, where your data lives, Apple Watch wave counts, surf conditions, and export.",
    label: "FAQ",
    llmsSummary:
      "Direct answers to common questions: price, requirements, accounts, data storage, export, Apple Watch, wave counting, forecasts, and support.",
    updated: "2026-11-24",
    indexable: true,
    changefreq: "monthly",
    priority: 0.8,
    webPageType: "FAQPage",
  },
  {
    key: "about",
    path: routes.about,
    file: "about.html",
    module: "/src/AboutPage.tsx",
    title: "About Peak Surf — From Senior Project to iPhone Surf Journal",
    description:
      "Meet Peak Surf, the private iPhone surf journal that started in 2022 as a Cal Poly San Luis Obispo senior project and launched on the App Store in 2026.",
    socialDescription: "The story behind Peak, the private iPhone surf journal built by a surfer.",
    label: "About",
    llmsSummary: "The story of Peak, from a 2022 Cal Poly senior project to a 2026 iPhone app.",
    updated: "2026-11-24",
    indexable: true,
    changefreq: "yearly",
    priority: 0.6,
    usesCloudinary: true,
    webPageType: "AboutPage",
  },
  {
    key: "changelog",
    path: routes.changelog,
    file: "changelog.html",
    module: "/src/ChangelogPage.tsx",
    title: "Peak Surf Changelog — Release Notes & What's New",
    description: `What's new in Peak, the private surf journal for iPhone: release notes for Peak ${APP_VERSION} and a live log of recent development work.`,
    label: "Changelog",
    llmsSummary: `Release notes for Peak ${APP_VERSION} and a live feed of recent development commits.`,
    updated: "2026-11-24",
    indexable: true,
    changefreq: "weekly",
    priority: 0.7,
  },
  {
    key: "privacy",
    path: routes.privacy,
    file: "privacy.html",
    module: "/src/PrivacyPage.tsx",
    title: "Peak Surf Privacy Policy — Your Surf History Stays Yours",
    description:
      "How the Peak Surf iPhone app keeps your surf sessions on-device, what optional features send, and how this website uses cookieless analytics.",
    socialDescription:
      "Peak is private by default. Learn how the iPhone app stores your surf history and handles optional features.",
    label: "Privacy",
    llmsSummary:
      "Privacy policy: on-device storage, no Peak server, optional Open-Meteo conditions, Apple Health, exports, and website analytics.",
    updated: "2026-08-30",
    indexable: true,
    changefreq: "yearly",
    priority: 0.5,
  },
  {
    key: "support",
    path: routes.support,
    file: "support.html",
    module: "/src/SupportPage.tsx",
    title: "Peak Surf Support — Help and Feedback",
    description:
      "Get help with the Peak Surf iPhone app from a real person, and learn which details to include in your email so we can solve the issue quickly.",
    socialDescription: "Get help with Peak Surf or share feedback with the team.",
    label: "Support",
    llmsSummary: "How to contact Peak support by email and what details to include.",
    updated: "2026-11-24",
    indexable: true,
    changefreq: "yearly",
    priority: 0.5,
    webPageType: "ContactPage",
  },
  {
    key: "notFound",
    path: routes.notFound,
    file: "404.html",
    module: "/src/NotFoundPage.tsx",
    title: "Page Not Found — Peak Surf, the iPhone Surf Journal",
    description:
      "This page does not exist. Head back to Peak, the private surf journal for iPhone, or browse features, the FAQ, and support.",
    label: "Not found",
    llmsSummary: "",
    updated: "2026-11-24",
    indexable: false,
  },
];

export const indexablePages = pages.filter((page) => page.indexable);

export function pageByKey(key: PageKey): SitePage {
  const page = pages.find((candidate) => candidate.key === key);
  if (!page) throw new Error(`Unknown page key: ${key}`);
  return page;
}

export function pageByFile(file: string): SitePage | undefined {
  return pages.find((candidate) => candidate.file === file);
}

// --- Structured data ------------------------------------------------------

const ids = {
  website: `${SITE_URL}/#website`,
  organization: `${SITE_URL}/#organization`,
  app: `${SITE_URL}/#app`,
};

const screenshots = [
  "log",
  "history",
  "session-detail",
  "stats",
  "quiver",
  "year-in-review",
].map((name) => `${SITE_URL}/app-screens/${name}.png`);

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": ids.organization,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/favicon-256x256.png`,
      width: 256,
      height: 256,
    },
    email: SUPPORT_EMAIL,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: SUPPORT_EMAIL,
      url: absoluteUrl(hrefFor("support")),
      availableLanguage: "en",
    },
    sameAs: [APP_STORE_URL],
    parentOrganization: {
      "@type": "Organization",
      name: MAKER_NAME,
      url: MAKER_URL,
    },
  };
}

function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    name: SITE_NAME,
    alternateName: [APP_NAME, APP_STORE_NAME],
    url: `${SITE_URL}/`,
    inLanguage: "en-US",
    publisher: { "@id": ids.organization },
  };
}

export function appNode() {
  return {
    "@type": "MobileApplication",
    "@id": ids.app,
    name: SITE_NAME,
    alternateName: [APP_NAME, APP_STORE_NAME],
    description:
      "A free, private surf journal for iPhone. Log surf sessions, track your boards and gear, record surf conditions, import Apple Watch surfing workouts, and see when your spot works, with no account and your data kept on your device.",
    applicationCategory: "SportsApplication",
    applicationSubCategory: "Surfing",
    operatingSystem: `iOS ${MIN_IOS} or later`,
    softwareVersion: APP_VERSION,
    datePublished: APP_FIRST_RELEASED,
    dateModified: APP_VERSION_RELEASED,
    releaseNotes: absoluteUrl(hrefFor("changelog")),
    contentRating: "4+",
    inLanguage: "en",
    isAccessibleForFree: true,
    url: `${SITE_URL}/`,
    downloadUrl: APP_STORE_URL,
    installUrl: APP_STORE_URL,
    image: OG_IMAGE,
    screenshot: screenshots,
    featureList: [
      "Log a surf session in seconds with spot, time in the water, gear, buddies, rating, notes, photos, and videos",
      "Session timer with a Live Activity on the Lock Screen and in the Dynamic Island",
      "One-tap conditions auto-fill for wind, waves, swell, water temperature, and tide",
      "Best Window Today scores the next 24 hours against your own rated sessions",
      "Stats, streaks, monthly goals, wave records, On This Day, and Year in Review",
      "Quiver tracking for boards, wetsuits, fins, and leashes, with Board Report",
      "Apple Watch and Apple Health import with on-device wave count, top speed, longest ride, and paddle distance estimates",
      "Home Screen and Lock Screen widgets, Control Center, Siri, and Shortcuts",
      "No account, no ads, no analytics; data stays on device",
      "Export to JSON or CSV and full backups with photos and videos",
    ],
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: APP_STORE_URL,
    },
    sameAs: [APP_STORE_URL],
    publisher: { "@id": ids.organization },
    author: { "@id": ids.organization },
  };
}

function breadcrumbNode(page: SitePage) {
  const items = [{ name: SITE_NAME, url: `${SITE_URL}/` }];
  if (page.path !== "/") items.push({ name: page.label, url: absoluteUrl(page.path) });
  return {
    "@type": "BreadcrumbList",
    "@id": `${absoluteUrl(page.path)}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function webPageNode(page: SitePage) {
  const url = absoluteUrl(page.path);
  const node: Record<string, unknown> = {
    "@type": page.webPageType ? ["WebPage", page.webPageType] : "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: page.title,
    description: page.description,
    inLanguage: "en-US",
    isPartOf: { "@id": ids.website },
    dateModified: page.updated,
    breadcrumb: { "@id": `${url}#breadcrumb` },
    primaryImageOfPage: { "@type": "ImageObject", url: OG_IMAGE },
  };

  if (["home", "features", "appleWatch", "faq", "changelog"].includes(page.key)) {
    node.about = { "@id": ids.app };
  }
  if (page.key === "home") {
    node.mainEntity = { "@id": ids.app };
  }
  if (page.key === "faq") {
    node.mainEntity = allFaqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    }));
  }
  return node;
}

function articleNode(page: SitePage) {
  const url = absoluteUrl(page.path);
  return {
    "@type": "TechArticle",
    "@id": `${url}#article`,
    headline: "How to track surfing with Apple Watch in Peak",
    description: page.description,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    image: OG_IMAGE,
    datePublished: "2026-11-24",
    dateModified: page.updated,
    author: { "@id": ids.organization },
    publisher: { "@id": ids.organization },
    about: { "@id": ids.app },
    proficiencyLevel: "Beginner",
  };
}

export function structuredDataFor(page: SitePage) {
  const graph: Record<string, unknown>[] = [
    webPageNode(page),
    breadcrumbNode(page),
    websiteNode(),
    organizationNode(),
  ];
  if (["home", "features", "appleWatch", "faq"].includes(page.key)) graph.push(appNode());
  if (page.key === "appleWatch") graph.push(articleNode(page));
  return { "@context": "https://schema.org", "@graph": graph };
}

// --- <head> ---------------------------------------------------------------

function escapeAttribute(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeText(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Render every SEO tag for a page's <head>. */
export function renderHead(page: SitePage) {
  const url = absoluteUrl(page.path);
  const social = page.socialDescription ?? page.description;
  const imageAlt = "Peak Surf app logo on a black background";
  const meta = (attr: "name" | "property", key: string, content: string) =>
    `<meta ${attr}="${key}" content="${escapeAttribute(content)}" />`;

  const tags = [
    `<title>${escapeText(page.title)}</title>`,
    meta("name", "description", page.description),
    meta(
      "name",
      "robots",
      page.indexable
        ? "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        : "noindex, follow",
    ),
  ];

  if (page.indexable) tags.push(`<link rel="canonical" href="${url}" />`);

  tags.push(
    meta("name", "apple-itunes-app", `app-id=${APP_STORE_ID}`),
    meta("property", "og:site_name", SITE_NAME),
    meta("property", "og:title", page.title),
    meta("property", "og:description", social),
    meta("property", "og:type", "website"),
    meta("property", "og:locale", "en_US"),
    meta("property", "og:url", url),
    meta("property", "og:image", OG_IMAGE),
    meta("property", "og:image:secure_url", OG_IMAGE),
    meta("property", "og:image:type", "image/png"),
    meta("property", "og:image:width", "1200"),
    meta("property", "og:image:height", "630"),
    meta("property", "og:image:alt", imageAlt),
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", page.title),
    meta("name", "twitter:description", social),
    meta("name", "twitter:image", OG_IMAGE),
    meta("name", "twitter:image:alt", imageAlt),
    `<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />`,
    `<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />`,
    `<link rel="shortcut icon" href="/favicon.ico" />`,
    `<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />`,
    `<link rel="alternate" type="text/plain" title="Peak Surf for AI assistants" href="/llms.txt" />`,
    meta("name", "theme-color", "#000000"),
    meta("name", "color-scheme", "dark"),
  );

  if (page.usesCloudinary) {
    tags.push(`<link rel="preconnect" href="https://res.cloudinary.com" />`);
  }

  const json = JSON.stringify(structuredDataFor(page), null, 2).replace(/</g, "\\u003c");
  tags.push(`<script type="application/ld+json">\n${json}\n</script>`);

  return tags.join("\n    ");
}
