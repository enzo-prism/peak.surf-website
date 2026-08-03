// Prerender each page to static HTML at build time.
//
// The site is a plain Vite + React SPA, so every built page shipped an empty
// <div id="root"></div>. Google can execute JS, but the rest of the crawler
// population (Bing, social unfurlers, LLM crawlers) largely cannot, which left
// the whole marketing site invisible to them. This renders each page component
// with react-dom/server and bakes the markup into dist/*.html; the client then
// hydrates it.
//
// Effects do not run during renderToString, so components that load remote data
// (the changelog's GitHub commit list) prerender in their loading state and fill
// in on hydration. That is intentional: the static shell carries the headings and
// copy that matter for indexing.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");

const routes = [
  { file: "index.html", module: "/src/App.tsx" },
  { file: "about.html", module: "/src/AboutPage.tsx" },
  { file: "changelog.html", module: "/src/ChangelogPage.tsx" },
  { file: "privacy.html", module: "/src/PrivacyPage.tsx" },
  { file: "support.html", module: "/src/SupportPage.tsx" },
];

const ROOT_DIV = '<div id="root"></div>';

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "warn",
});

let failures = 0;

try {
  for (const route of routes) {
    const htmlPath = path.join(distDir, route.file);
    const html = await fs.readFile(htmlPath, "utf8");

    if (!html.includes(ROOT_DIV)) {
      console.error(
        `prerender: ${route.file} has no empty ${ROOT_DIV} to fill; skipping`,
      );
      failures += 1;
      continue;
    }

    const loaded = await vite.ssrLoadModule(route.module);
    const Component = loaded.default;
    const markup = renderToString(React.createElement(Component));

    if (!markup.trim()) {
      console.error(`prerender: ${route.module} rendered empty markup`);
      failures += 1;
      continue;
    }

    await fs.writeFile(
      htmlPath,
      html.replace(ROOT_DIV, `<div id="root">${markup}</div>`),
      "utf8",
    );
    console.log(
      `prerender: ${route.file} <- ${route.module} (${markup.length} bytes)`,
    );
  }
} finally {
  await vite.close();
}

if (failures > 0) {
  process.exitCode = 1;
}
