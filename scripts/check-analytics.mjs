import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { loadConfigFromFile } from "vite";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const trackerPath = "client/src/components/AppStoreLink.tsx";
const failures = [];

async function read(relativePath) {
  return readFile(path.join(projectRoot, relativePath), "utf8");
}

async function sourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await sourceFiles(absolutePath)));
    } else if (/\.(?:css|html|ts|tsx)$/.test(entry.name)) {
      files.push(absolutePath);
    }
  }

  return files;
}

function moduleScriptSources(html) {
  return (html.match(/<script\b[^>]*>/gi) ?? []).flatMap((tag) => {
    if (!/\btype\s*=\s*["']module["']/i.test(tag)) return [];
    const src = tag.match(/\bsrc\s*=\s*["']([^"']+)["']/i)?.[1];
    return src ? [src] : [];
  });
}

function normalizeInputs(input) {
  if (typeof input === "string") return [input];
  if (Array.isArray(input)) return input;
  if (input && typeof input === "object") return Object.values(input);
  return [];
}

const packageJson = JSON.parse(await read("package.json"));
const analyticsVersion = packageJson.dependencies?.["@vercel/analytics"];
if (typeof analyticsVersion !== "string" || !/^\^2\./.test(analyticsVersion)) {
  failures.push("@vercel/analytics must remain a normal v2 dependency");
}

const loadedConfig = await loadConfigFromFile(
  { command: "build", mode: "production" },
  path.join(projectRoot, "vite.config.ts"),
);
if (!loadedConfig) throw new Error("analytics-check: could not load vite.config.ts");

const viteRoot = path.resolve(projectRoot, loadedConfig.config.root ?? ".");
const configuredInputs = normalizeInputs(
  loadedConfig.config.build?.rollupOptions?.input,
).map((input) => path.resolve(input));

if (configuredInputs.length === 0) {
  failures.push("Vite has no configured build inputs to validate");
}

const clientFiles = await sourceFiles(viteRoot);
const discoveredHtmlEntries = [];
for (const htmlPath of clientFiles.filter((file) => file.endsWith(".html"))) {
  const html = await readFile(htmlPath, "utf8");
  if (moduleScriptSources(html).length > 0) discoveredHtmlEntries.push(htmlPath);
}

const configuredInputSet = new Set(configuredInputs);
const discoveredEntrySet = new Set(discoveredHtmlEntries);
for (const htmlPath of discoveredHtmlEntries) {
  if (!configuredInputSet.has(htmlPath)) {
    failures.push(
      `${path.relative(projectRoot, htmlPath)} has a module entry but is missing from Vite build inputs`,
    );
  }
}
for (const inputPath of configuredInputs) {
  if (!discoveredEntrySet.has(inputPath)) {
    failures.push(
      `${path.relative(projectRoot, inputPath)} is a Vite input without a discoverable module entry`,
    );
  }
}

const entryModules = new Set();
for (const htmlPath of configuredInputs) {
  let html;
  try {
    html = await readFile(htmlPath, "utf8");
  } catch {
    continue;
  }

  const scriptSources = moduleScriptSources(html);
  if (scriptSources.length !== 1) {
    failures.push(
      `${path.relative(projectRoot, htmlPath)} has ${scriptSources.length} module scripts; expected exactly one`,
    );
    continue;
  }

  const scriptSource = scriptSources[0].split(/[?#]/, 1)[0];
  if (/^(?:[a-z]+:)?\/\//i.test(scriptSource)) {
    failures.push(`${path.relative(projectRoot, htmlPath)} uses an external module entry`);
    continue;
  }

  const modulePath = scriptSource.startsWith("/")
    ? path.resolve(viteRoot, `.${scriptSource}`)
    : path.resolve(path.dirname(htmlPath), scriptSource);
  entryModules.add(modulePath);

  let source;
  try {
    source = await readFile(modulePath, "utf8");
  } catch {
    failures.push(`${path.relative(projectRoot, modulePath)} could not be read`);
    continue;
  }

  const mountCount = source.match(/<Analytics\s*\/>/g)?.length ?? 0;
  if (!/from\s+["']@vercel\/analytics\/react["']/.test(source)) {
    failures.push(
      `${path.relative(projectRoot, modulePath)} does not import the generic React Analytics component`,
    );
  }
  if (mountCount !== 1) {
    failures.push(
      `${path.relative(projectRoot, modulePath)} mounts <Analytics /> ${mountCount} times; expected exactly once`,
    );
  }
}

const locations = [];
let appStoreLinkCount = 0;
for (const absolutePath of clientFiles.filter((file) => file.endsWith(".tsx"))) {
  const source = await readFile(absolutePath, "utf8");
  appStoreLinkCount += source.match(/<AppStoreLink\b/g)?.length ?? 0;
  for (const match of source.matchAll(/<AppStoreLink\b[^>]*\blocation="([^"]+)"/g)) {
    locations.push(match[1]);
  }
}

if (appStoreLinkCount !== locations.length) {
  failures.push("every AppStoreLink must declare one static location");
}
if (new Set(locations).size !== locations.length) {
  failures.push("AppStoreLink location values must be unique");
}

const tracker = await read(trackerPath);
if (
  !/track\("App Store Click",\s*\{\s*location,\s*version: APP_VERSION,\s*\}\);/s.test(
    tracker,
  )
) {
  failures.push("AppStoreLink must send only location and version with the App Store Click event");
}

const legacyPatterns = [
  ["Google Analytics", /Google Analytics/i],
  ["Google tag loader", /googletagmanager\.com\/gtag/i],
  ["gtag calls", /\bgtag\s*\(/i],
  ["Plausible calls", /\bplausible\b/i],
];

for (const absolutePath of clientFiles) {
  const source = await readFile(absolutePath, "utf8");
  const relativePath = path.relative(projectRoot, absolutePath);

  for (const [label, pattern] of legacyPatterns) {
    if (pattern.test(source)) failures.push(`${relativePath} still contains ${label}`);
  }

  if (
    absolutePath.endsWith(".tsx") &&
    relativePath !== trackerPath &&
    source.includes("https://apps.apple.com/us/app/peak-surf/id6757644027")
  ) {
    failures.push(`${relativePath} bypasses the shared tracked AppStoreLink`);
  }
}

if (failures.length > 0) {
  for (const failure of failures) console.error(`analytics-check: ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `analytics-check: verified ${configuredInputs.length} Vite entries, ${entryModules.size} React modules, and ${locations.length} tracked App Store CTAs`,
  );
}
