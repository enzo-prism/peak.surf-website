# AGENTS.md

## Project overview
Peak Surf website (https://www.peaksurf.club) is a static marketing site for the Peak iOS app. It is a Vite + React + Tailwind multi-page build with no backend services, deployed on Vercel (project `peak-site`). Every push to `main` deploys production.

## Key paths
- `client/src/site.ts`: single source of truth for app facts (current version, release dates, App Store URL, minimum iOS, support email).
- `client/src/seo/pages.ts`: page registry. Titles, descriptions, canonicals, Open Graph, JSON-LD, sitemap entries, and llms.txt summaries for every page.
- `client/src/seo/routes.ts`: public URL paths (extensionless) used for all internal links.
- `client/src/content/`: copy shared between pages, structured data, and llms files (`faq.ts`, `features.ts`, `releases.ts`, `appleWatch.ts`).
- `client/src/components/SiteChrome.tsx`: shared header, footer, and skip link for every page except home.
- `client/src/App.tsx`: home page layout and marketing copy.
- Other pages: `FeaturesPage.tsx`, `AppleWatchPage.tsx`, `FaqPage.tsx`, `AboutPage.tsx`, `ChangelogPage.tsx`, `PrivacyPage.tsx`, `SupportPage.tsx`, `NotFoundPage.tsx`.
- `client/*.html`: minimal page shells. Each has a `<!--peak:head-->` placeholder that `vite.config.ts` fills from the page registry, plus one module script.
- `client/src/index.css`: typography, animation utilities, and global styling.
- `public/`: static assets (logos, icons, screenshots) and `robots.txt`.
- `vercel.json`: clean URLs, legacy redirects, cache and security headers.
- `scripts/prerender.mjs`: prerenders every page and writes `sitemap.xml`, `llms.txt`, and `llms-full.txt` into `dist/`.
- `scripts/check-seo.mjs`: validates the built site; fails the build on SEO regressions.
- `scripts/check-analytics.mjs`: enforces the Vercel Analytics setup and App Store click tracking.

## URLs
Pages are served without `.html` (`/features`, `/faq`, `/apple-watch-surf-tracking`, `/about`, `/changelog`, `/privacy`, `/support`). `vercel.json` sets `cleanUrls: true`, so old `/about.html` links 308-redirect to `/about`. Always link with `hrefFor()` from `seo/routes.ts`; `check:seo` fails on internal `.html` links or links that do not resolve.

## Dev commands
- `npm install`
- `npm run dev` (Vite dev server on port 5000; pages are not prerendered and clean URLs need the `.html` suffix in dev)
- `npm run build` (analytics check, Vite build, prerender, then SEO check; output in `dist`)
- `npm run check` (TypeScript typecheck and analytics check)
- `npm run check:seo` (re-run the SEO check against an existing `dist`)
- To preview production behaviour (clean URLs, 404 page) locally: `npx serve dist`

## Releasing a new app version
When a version goes live on the App Store (not when it is submitted):
1. Update `APP_VERSION` and `APP_VERSION_RELEASED` in `client/src/site.ts`.
2. Add release notes to the top of `client/src/content/releases.ts`.
3. Update `faq.ts` ("What is the latest version of Peak?") and `features.ts` if features changed. Describe shipped features only.
4. Bump `updated` for changed pages in `client/src/seo/pages.ts` (drives sitemap `lastmod` and `dateModified`).
5. `npm run build` and push to `main`.

Facts can be checked against the live App Store listing: `curl -s "https://itunes.apple.com/lookup?id=6757644027&country=us"`.

## Adding a page
1. Add an entry to `pages` in `client/src/seo/pages.ts` and a path to `client/src/seo/routes.ts`.
2. Create `client/<file>.html` from an existing shell (keep `<!--peak:head-->` and exactly one module script).
3. Create the entry module (`client/src/<name>.tsx`, copy `about.tsx`, mounting `<Analytics />` once) and the page component using `SiteHeader`/`SiteFooter`.
4. Pass page-specific `AppStoreLink` elements (unique static `location` values) to `SiteHeader`.
5. Add it to `footerNav` in `SiteChrome.tsx` so it is linked site-wide.
Vite inputs, prerendering, sitemap, and llms files pick it up from the registry automatically.

## SEO and answer-engine (AEO) rules
- Every page needs one `<h1>`, a 30–62 character title, and a 110–160 character description, all unique. `check:seo` enforces this.
- FAQ answers are plain strings in `content/faq.ts`; the FAQPage JSON-LD uses the same strings, so visible text and structured data always match. Keep answers direct, factual, and true for the current App Store version.
- The `MobileApplication` JSON-LD reads `softwareVersion` from `APP_VERSION`; never hard-code version numbers in copy, use the constant.
- `robots.txt` explicitly allows search and AI crawlers. `llms.txt`/`llms-full.txt` are generated; do not hand-edit them in `dist`.
- Heading levels must not skip (h1 → h2 → h3) for accessibility and outline quality.

## Environment
No required environment variables.

## Structure and styling
- The site is intentionally minimal and premium: mostly black with white accents.
- Typography uses native SF Pro on Apple platforms through `--font-sans` in `client/src/index.css`, with system-font fallbacks elsewhere. All typography utilities and Tailwind `font-sans` share this stack; do not reintroduce SF Pro Rounded or Inter.
- Animation utilities live in `client/src/index.css` (`fade-up`, `fade-delay-*`).
- Home page sections stay inside `client/src/App.tsx` to maintain a single-page flow; deeper content gets its own registered page.

## Tests
No unit tests. `npm run build` runs the analytics and SEO validators; `npm run check` runs the typecheck. Last Lighthouse pass (2026-11-24, local build, mobile): SEO 100 and accessibility 100 on every page, performance 98–100.
