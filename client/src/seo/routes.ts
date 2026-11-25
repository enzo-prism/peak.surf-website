// Public URL paths for every page. Kept separate from pages.ts so page
// components can link to each other without bundling the SEO registry.
// Paths are extensionless: vercel.json `cleanUrls` serves about.html at /about
// and 308-redirects /about.html to /about.

export const routes = {
  home: "/",
  features: "/features",
  appleWatch: "/apple-watch-surf-tracking",
  faq: "/faq",
  about: "/about",
  changelog: "/changelog",
  privacy: "/privacy",
  support: "/support",
  notFound: "/404",
} as const;

export type PageKey = keyof typeof routes;

export function hrefFor(key: PageKey) {
  return routes[key];
}
