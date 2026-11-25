// Validate the built site (dist/) for search and answer-engine readiness.
// Runs at the end of `npm run build`, so a regression fails the deploy.
//
// Checks every page registered in client/src/seo/pages.ts for: title and
// description length and uniqueness, canonical and og:url, robots directives,
// one non-empty <h1> in the prerendered body, parseable JSON-LD that matches
// the current app version, FAQ structured data that matches visible text,
// internal links that resolve, and image alt attributes. It also checks
// sitemap.xml, robots.txt, llms.txt, llms-full.txt, and vercel.json.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { createServer } from "vite";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(projectRoot, "dist");

const LIMITS = {
  title: [30, 62],
  description: [110, 160],
};

const failures = [];
const warnings = [];
const fail = (where, message) => failures.push(`${where}: ${message}`);

function decode(value) {
  return value
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function metaContent(html, attr, key) {
  const pattern = new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`, "i");
  const match = html.match(pattern);
  return match ? decode(match[1]) : null;
}

function bodyOf(html) {
  const start = html.indexOf('<div id="root">');
  const end = html.lastIndexOf("</body>");
  return start === -1 ? "" : html.slice(start, end);
}

function visibleText(markup) {
  return decode(
    markup
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " "),
  ).trim();
}

const vite = await createServer({
  configFile: path.join(projectRoot, "vite.config.ts"),
  server: { middlewareMode: true, hmr: false, ws: false },
  appType: "custom",
  optimizeDeps: { noDiscovery: true },
  logLevel: "warn",
});

try {
  const registry = await vite.ssrLoadModule("/src/seo/pages.ts");
  const site = await vite.ssrLoadModule("/src/site.ts");
  const { allFaqItems } = await vite.ssrLoadModule("/src/content/faq.ts");

  const distFiles = new Set();
  async function walk(directory) {
    for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(absolute);
      else distFiles.add(`/${path.relative(distDir, absolute).split(path.sep).join("/")}`);
    }
  }
  await walk(distDir);

  const pagePaths = new Set(registry.pages.map((page) => page.path));
  const titles = new Map();
  const descriptions = new Map();

  for (const page of registry.pages) {
    const where = page.file;
    let html;
    try {
      html = await fs.readFile(path.join(distDir, page.file), "utf8");
    } catch {
      fail(where, "missing from dist");
      continue;
    }

    const expectedUrl = site.absoluteUrl(page.path);
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
    const description = metaContent(html, "name", "description");
    const robots = metaContent(html, "name", "robots");
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    const ogUrl = metaContent(html, "property", "og:url");

    if ((html.match(/<title>/g) ?? []).length !== 1) fail(where, "expected exactly one <title>");
    if (!title) fail(where, "missing <title>");
    else {
      const text = decode(title);
      if (text.length < LIMITS.title[0] || text.length > LIMITS.title[1]) {
        fail(where, `title is ${text.length} chars (want ${LIMITS.title.join("–")}): "${text}"`);
      }
      if (titles.has(text)) fail(where, `title duplicates ${titles.get(text)}`);
      titles.set(text, where);
    }

    if (!description) fail(where, "missing meta description");
    else {
      if (description.length < LIMITS.description[0] || description.length > LIMITS.description[1]) {
        fail(
          where,
          `description is ${description.length} chars (want ${LIMITS.description.join("–")})`,
        );
      }
      if (descriptions.has(description)) fail(where, `description duplicates ${descriptions.get(description)}`);
      descriptions.set(description, where);
    }

    if (ogUrl !== expectedUrl) fail(where, `og:url is ${ogUrl}, expected ${expectedUrl}`);
    for (const key of ["og:title", "og:description", "og:image"]) {
      if (!metaContent(html, "property", key)) fail(where, `missing ${key}`);
    }
    for (const key of ["twitter:card", "twitter:title", "twitter:image"]) {
      if (!metaContent(html, "name", key)) fail(where, `missing ${key}`);
    }

    if (page.indexable) {
      if (!robots?.startsWith("index, follow")) fail(where, `robots is "${robots}"`);
      if (canonical !== expectedUrl) fail(where, `canonical is ${canonical}, expected ${expectedUrl}`);
    } else {
      if (!robots?.startsWith("noindex")) fail(where, `non-indexable page has robots "${robots}"`);
      if (canonical) fail(where, "non-indexable page should not declare a canonical");
    }

    // Prerendered body ----------------------------------------------------
    const body = bodyOf(html);
    const text = visibleText(body);
    if (text.length < 400) fail(where, `prerendered body has only ${text.length} chars of text`);

    const h1s = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map((match) => visibleText(match[1]));
    if (h1s.length !== 1) fail(where, `expected one <h1>, found ${h1s.length}`);
    else if (!h1s[0]) fail(where, "<h1> is empty");

    for (const img of body.match(/<img\b[^>]*>/g) ?? []) {
      if (!/\salt="/.test(img)) fail(where, `image without alt: ${img.slice(0, 90)}`);
    }

    for (const match of html.matchAll(/\shref="([^"]+)"/g)) {
      const href = decode(match[1]);
      if (!href.startsWith("/") || href.startsWith("//")) continue;
      const [pathname] = href.split(/[?#]/);
      if (/\.html$/.test(pathname)) {
        fail(where, `internal link uses a .html URL: ${href}`);
        continue;
      }
      if (pagePaths.has(pathname) || distFiles.has(pathname)) continue;
      if (distFiles.has(`${pathname}.html`)) continue;
      fail(where, `internal link does not resolve: ${href}`);
    }

    for (const match of body.matchAll(/\shref="#([^"]+)"/g)) {
      if (!body.includes(`id="${match[1]}"`)) fail(where, `in-page anchor #${match[1]} has no target`);
    }

    // Structured data -----------------------------------------------------
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    if (blocks.length === 0) fail(where, "no JSON-LD");
    for (const block of blocks) {
      let data;
      try {
        data = JSON.parse(block[1]);
      } catch (error) {
        fail(where, `JSON-LD does not parse: ${error.message}`);
        continue;
      }
      if (data["@context"] !== "https://schema.org") fail(where, "JSON-LD missing schema.org @context");
      const graph = data["@graph"] ?? [data];
      const types = graph.flatMap((node) => [].concat(node["@type"]));

      if (!types.includes("BreadcrumbList")) fail(where, "JSON-LD has no BreadcrumbList");
      const webPage = graph.find((node) => [].concat(node["@type"]).includes("WebPage"));
      if (!webPage) fail(where, "JSON-LD has no WebPage");
      else if (webPage.url !== expectedUrl) fail(where, `WebPage url is ${webPage.url}`);

      for (const node of graph.filter((candidate) => candidate["@type"] === "MobileApplication")) {
        if (node.softwareVersion !== site.APP_VERSION) {
          fail(where, `softwareVersion ${node.softwareVersion} != APP_VERSION ${site.APP_VERSION}`);
        }
        if (node.offers?.price !== "0") fail(where, "app offer must state price 0");
        if (!node.operatingSystem?.includes(site.MIN_IOS)) fail(where, "operatingSystem lacks MIN_IOS");
      }

      if (types.includes("FAQPage")) {
        const questions = webPage?.mainEntity ?? [];
        if (questions.length !== allFaqItems.length) {
          fail(where, `FAQPage has ${questions.length} questions, content has ${allFaqItems.length}`);
        }
        for (const question of questions) {
          if (!text.includes(question.name)) fail(where, `FAQ question not visible: ${question.name}`);
          if (!text.includes(question.acceptedAnswer.text)) {
            fail(where, `FAQ answer not visible word for word: ${question.name}`);
          }
        }
      }
    }

    if (/\b3\.2\b/.test(text) && !/\b3\.2\b/.test(site.APP_VERSION)) {
      warnings.push(`${where}: visible text mentions 3.2; check for a stale version`);
    }
  }

  // Site files -------------------------------------------------------------
  const sitemap = await fs.readFile(path.join(distDir, "sitemap.xml"), "utf8").catch(() => "");
  const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  const expectedSitemap = registry.indexablePages.map((page) => site.absoluteUrl(page.path));
  if (sitemapUrls.join("\n") !== expectedSitemap.join("\n")) {
    fail("sitemap.xml", `urls ${JSON.stringify(sitemapUrls)} != indexable pages`);
  }

  const robots = await fs.readFile(path.join(distDir, "robots.txt"), "utf8").catch(() => "");
  if (!robots.includes(`Sitemap: ${site.SITE_URL}/sitemap.xml`)) fail("robots.txt", "missing Sitemap line");
  if (/^Disallow:\s*\/\s*$/m.test(robots)) fail("robots.txt", "blocks the whole site");

  const llms = await fs.readFile(path.join(distDir, "llms.txt"), "utf8").catch(() => "");
  if (!llms.startsWith(`# ${site.SITE_NAME}`)) fail("llms.txt", "missing H1");
  for (const pageUrl of expectedSitemap) {
    if (!llms.includes(`](${pageUrl})`)) fail("llms.txt", `does not link ${pageUrl}`);
  }
  if (!llms.includes(`Current version: ${site.APP_VERSION}`)) fail("llms.txt", "stale version");

  const llmsFull = await fs.readFile(path.join(distDir, "llms-full.txt"), "utf8").catch(() => "");
  for (const item of allFaqItems) {
    if (!llmsFull.includes(item.answer)) fail("llms-full.txt", `missing FAQ answer: ${item.question}`);
  }

  const vercel = JSON.parse(await fs.readFile(path.join(projectRoot, "vercel.json"), "utf8"));
  if (vercel.cleanUrls !== true) fail("vercel.json", "cleanUrls must be true (canonicals are extensionless)");
  if (vercel.trailingSlash !== false) fail("vercel.json", "trailingSlash must be false");

  if (!distFiles.has("/404.html")) fail("dist", "missing 404.html");
} finally {
  await vite.close();
}

for (const warning of warnings) console.warn(`seo-check warning: ${warning}`);
if (failures.length > 0) {
  for (const failure of failures) console.error(`seo-check: ${failure}`);
  console.error(`seo-check: ${failures.length} problem(s)`);
  process.exitCode = 1;
} else {
  console.log("seo-check: all pages, structured data, sitemap, robots, and llms files passed");
}
