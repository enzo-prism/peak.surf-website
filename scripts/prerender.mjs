// Prerender every page to static HTML at build time, then write the
// machine-readable files crawlers and AI assistants use.
//
// The site is a plain Vite + React multi-page build, so every built page
// shipped an empty <div id="root"></div>. Google can execute JS, but most other
// crawlers (Bing, social unfurlers, LLM crawlers) cannot. This renders each page
// component with react-dom/server and bakes the markup into dist/*.html; the
// client then hydrates it.
//
// Effects do not run during renderToString, so components that load remote data
// (the changelog's GitHub commit feed) prerender in their loading state and fill
// in on hydration. Everything that matters for search lives in static content.
//
// Pages come from client/src/seo/pages.ts. This script also writes:
//   dist/sitemap.xml    every indexable page with its lastmod
//   dist/llms.txt       a short, linked overview for AI assistants (llmstxt.org)
//   dist/llms-full.txt  the full product facts, features, and FAQ as Markdown

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");

const ROOT_DIV = '<div id="root"></div>';

const vite = await createServer({
  configFile: path.join(projectRoot, "vite.config.ts"),
  server: { middlewareMode: true, hmr: false, ws: false },
  appType: "custom",
  // SSR rendering does not need a browser dependency scan during shutdown.
  optimizeDeps: { noDiscovery: true },
  logLevel: "warn",
});

let failures = 0;

try {
  const registry = await vite.ssrLoadModule("/src/seo/pages.ts");
  const site = await vite.ssrLoadModule("/src/site.ts");
  const { allFaqItems, faqGroups } = await vite.ssrLoadModule("/src/content/faq.ts");
  const { featureGroups } = await vite.ssrLoadModule("/src/content/features.ts");
  const { releases } = await vite.ssrLoadModule("/src/content/releases.ts");
  const appleWatch = await vite.ssrLoadModule("/src/content/appleWatch.ts");

  for (const page of registry.pages) {
    const htmlPath = path.join(distDir, page.file);
    const html = await fs.readFile(htmlPath, "utf8");

    if (!html.includes(ROOT_DIV)) {
      console.error(`prerender: ${page.file} has no empty ${ROOT_DIV} to fill; skipping`);
      failures += 1;
      continue;
    }

    const loaded = await vite.ssrLoadModule(page.module);
    const markup = renderToString(React.createElement(loaded.default));

    if (!markup.trim()) {
      console.error(`prerender: ${page.module} rendered empty markup`);
      failures += 1;
      continue;
    }

    await fs.writeFile(
      htmlPath,
      html.replace(ROOT_DIV, `<div id="root">${markup}</div>`),
      "utf8",
    );
    console.log(`prerender: ${page.file} <- ${page.module} (${markup.length} bytes)`);
  }

  const url = (pagePath) => site.absoluteUrl(pagePath);

  // sitemap.xml ------------------------------------------------------------
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...registry.indexablePages.map((page) =>
      [
        "  <url>",
        `    <loc>${url(page.path)}</loc>`,
        `    <lastmod>${page.updated}</lastmod>`,
        page.changefreq ? `    <changefreq>${page.changefreq}</changefreq>` : null,
        page.priority !== undefined ? `    <priority>${page.priority.toFixed(1)}</priority>` : null,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n"),
    ),
    "</urlset>",
    "",
  ].join("\n");
  await fs.writeFile(path.join(distDir, "sitemap.xml"), sitemap, "utf8");
  console.log(`prerender: sitemap.xml (${registry.indexablePages.length} urls)`);

  // llms.txt ---------------------------------------------------------------
  const facts = [
    `- Name: ${site.SITE_NAME} (also called ${site.APP_NAME}; listed as "${site.APP_STORE_NAME}" on the App Store)`,
    `- What it is: a free, private surf journal and surf session log for iPhone`,
    `- Price: Free on the App Store, no ads`,
    `- Requirements: iPhone with iOS ${site.MIN_IOS} or later; Apple Watch optional via Apple Health`,
    `- Current version: ${site.APP_VERSION}, released ${site.formatLongDate(site.APP_VERSION_RELEASED)}`,
    `- First released: ${site.formatLongDate(site.APP_FIRST_RELEASED)}`,
    `- Privacy: no account, no Peak server, no analytics, tracking, or ads in the app; data stays on the iPhone`,
    `- Not available on Android`,
    `- App Store: ${site.APP_STORE_URL}`,
    `- Support: ${site.SUPPORT_EMAIL}`,
  ];

  const pageLinks = (filter) =>
    registry.indexablePages
      .filter(filter)
      .map((page) => `- [${page.label}](${url(page.path)}): ${page.llmsSummary}`);

  const primaryKeys = new Set(["home", "features", "appleWatch", "faq"]);
  const llms = [
    `# ${site.SITE_NAME}`,
    "",
    `> ${site.SITE_NAME} is a free, private surf journal for iPhone. Surfers log each session (spot, time in the water, gear, buddies, rating, notes, photos), auto-fill the conditions, import Apple Watch surfing workouts with on-device wave estimates, and see stats, a Board Report, and a personal Best Window Today. No account is required and the logbook stays on the device.`,
    "",
    "## Key facts",
    "",
    ...facts,
    "",
    "## Pages",
    "",
    ...pageLinks((page) => primaryKeys.has(page.key)),
    "",
    "## Optional",
    "",
    ...pageLinks((page) => !primaryKeys.has(page.key)),
    `- [Full product reference](${site.SITE_URL}/llms-full.txt): every feature and FAQ answer in one Markdown file`,
    "",
  ].join("\n");
  await fs.writeFile(path.join(distDir, "llms.txt"), llms, "utf8");

  // llms-full.txt ----------------------------------------------------------
  const latest = releases[0];
  const full = [
    `# ${site.SITE_NAME}: full product reference`,
    "",
    `> Source: ${site.SITE_URL}/ — generated from the website's content at build time. Answers describe Peak ${site.APP_VERSION}, the version currently on the App Store.`,
    "",
    "## Key facts",
    "",
    ...facts,
    "",
    "## Features",
    "",
    ...featureGroups.flatMap((group) => [
      `### ${group.title}`,
      "",
      group.summary,
      "",
      ...group.items.map((item) => `- ${item}`),
      "",
    ]),
    "## Apple Watch surf tracking",
    "",
    `More: ${url(registry.pageByKey("appleWatch").path)}`,
    "",
    "What Peak estimates from an Apple Watch surfing workout's GPS route:",
    "",
    ...appleWatch.appleWatchMetrics.map((metric) => `- ${metric.label}: ${metric.detail}`),
    "",
    "How to log an Apple Watch surf:",
    "",
    ...appleWatch.appleWatchSteps.map((step, index) => `${index + 1}. ${step.title}. ${step.body}`),
    "",
    ...appleWatch.appleWatchPrinciples.map((principle) => `- ${principle}`),
    "",
    "## Frequently asked questions",
    "",
    ...faqGroups.flatMap((group) => [
      `### ${group.title}`,
      "",
      ...group.items.flatMap((item) => [`**${item.question}**`, "", item.answer, ""]),
    ]),
    `## Latest release: Peak ${latest.version} (${site.formatLongDate(latest.released)})`,
    "",
    latest.summary,
    "",
    ...latest.sections.flatMap((section) => [
      `### ${section.title}`,
      "",
      ...section.items.map((item) => `- ${item}`),
      "",
    ]),
  ].join("\n");
  await fs.writeFile(path.join(distDir, "llms-full.txt"), full, "utf8");
  console.log(
    `prerender: llms.txt and llms-full.txt (${featureGroups.length} feature groups, ${allFaqItems.length} FAQ answers)`,
  );
} finally {
  await vite.close();
}

if (failures > 0) {
  process.exitCode = 1;
}
