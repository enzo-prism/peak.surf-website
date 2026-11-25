// Single source of truth for facts about Peak that appear in page copy,
// structured data, sitemap.xml, and llms.txt.
//
// When a new version ships on the App Store, update APP_VERSION and
// APP_VERSION_RELEASED (and the release notes in content/releases.ts). The SEO
// check (`npm run check:seo`) fails the build if the structured data drifts
// from these values.
//
// This file is also imported by vite.config.ts, so keep imports relative and
// free of browser-only APIs.

export const SITE_URL = "https://www.peaksurf.club";
export const SITE_NAME = "Peak Surf";

export const APP_NAME = "Peak";
/** The app's name on the App Store listing. */
export const APP_STORE_NAME = "peak.surf";
export const APP_STORE_ID = "6757644027";
export const APP_STORE_URL = "https://apps.apple.com/us/app/peak-surf/id6757644027";

export const APP_VERSION = "3.5";
/** ISO date the current APP_VERSION went live on the App Store. */
export const APP_VERSION_RELEASED = "2026-10-07";
/** ISO date of Peak's first App Store release. */
export const APP_FIRST_RELEASED = "2026-01-15";
export const MIN_IOS = "17.0";

export const SUPPORT_EMAIL = "enzo@design-prism.com";
export const MAKER_NAME = "Prism";
export const MAKER_URL = "https://www.design-prism.com";

export const OG_IMAGE = `${SITE_URL}/opengraph.png`;

export function absoluteUrl(path: string) {
  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}

export function formatLongDate(isoDate: string) {
  return new Date(`${isoDate}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}
