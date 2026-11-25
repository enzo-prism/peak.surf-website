import { useEffect, useRef, useState, type ReactElement } from "react";

import { Button } from "@/components/ui/button";
import { hrefFor, type PageKey } from "@/seo/routes";
import { MAKER_NAME, MAKER_URL } from "@/site";

// Shared header and footer for every page except the home page, which has its
// own hero header. The App Store CTAs are passed in by each page so every
// App Store link keeps a static, page-specific analytics `location`
// (enforced by scripts/check-analytics.mjs).

type NavItem = { key: PageKey; label: string };

const desktopNav: NavItem[] = [
  { key: "home", label: "home" },
  { key: "features", label: "features" },
  { key: "appleWatch", label: "apple watch" },
  { key: "faq", label: "faq" },
  { key: "about", label: "about" },
];

const mobileNav: NavItem[] = [
  ...desktopNav,
  { key: "changelog", label: "changelog" },
  { key: "support", label: "support" },
];

export const footerNav: NavItem[] = [
  { key: "home", label: "home" },
  { key: "features", label: "features" },
  { key: "appleWatch", label: "apple watch surf tracking" },
  { key: "faq", label: "faq" },
  { key: "about", label: "about" },
  { key: "changelog", label: "changelog" },
  { key: "privacy", label: "privacy" },
  { key: "support", label: "support" },
];

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only z-50 rounded-md bg-foreground px-4 py-2 text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Skip to content
    </a>
  );
}

export function SiteHeader({
  current,
  cta,
  mobileCta,
}: {
  current?: PageKey;
  /** This page's AppStoreLink for the header (static location). */
  cta: ReactElement;
  /** This page's AppStoreLink for the mobile menu (static location). */
  mobileCta: ReactElement;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;
    firstMobileLinkRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  const linkClass = (key: PageKey) =>
    `font-lower text-[11px] ${
      key === current ? "text-foreground" : "text-muted-foreground hover:text-foreground"
    }`;

  return (
    <header className="relative">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
        <a
          href="/"
          className="flex min-h-11 items-center gap-4 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Peak Surf home"
        >
          <img
            src="/Transparent.png"
            alt=""
            width="300"
            height="300"
            className="h-8 w-auto transition-opacity hover:opacity-80"
          />
          <div className="leading-tight">
            <p className="font-lower text-[11px] tracking-[0.35em] text-muted-foreground">peak</p>
            <p className="text-sm text-muted-foreground">private surf journal</p>
          </div>
        </a>

        <div className="flex items-center gap-3">
          <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:gap-2 md:flex">
            {desktopNav.map((item) => (
              <Button key={item.key} asChild variant="ghost" size="sm" className={linkClass(item.key)}>
                <a href={hrefFor(item.key)} aria-current={item.key === current ? "page" : undefined}>
                  {item.label}
                </a>
              </Button>
            ))}
            <Button
              asChild
              variant="outline"
              size="sm"
              className="font-cta ml-2 rounded-full border-border/60 bg-transparent px-5 text-[13px] text-foreground hover:bg-accent/20"
            >
              {cta}
            </Button>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            aria-controls="site-mobile-nav"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition hover:border-foreground/70 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          >
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span className="absolute left-0 top-0 h-0.5 w-full bg-current" />
              <span className="absolute left-0 top-1.5 h-0.5 w-full bg-current" />
              <span className="absolute left-0 top-3 h-0.5 w-full bg-current" />
            </span>
          </button>
        </div>
      </div>

      <nav
        id="site-mobile-nav"
        aria-label="Mobile navigation"
        className={isMenuOpen ? "md:hidden" : "hidden"}
      >
        <div className="mx-auto w-full max-w-6xl px-6 pb-6">
          <div className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-background/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            {mobileNav.map((item, index) => (
              <Button
                key={item.key}
                asChild
                variant="ghost"
                size="sm"
                className={`w-full justify-start ${linkClass(item.key)}`}
              >
                <a
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  href={hrefFor(item.key)}
                  aria-current={item.key === current ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              </Button>
            ))}
            <Button asChild size="sm" className="font-cta w-full justify-center rounded-full px-5 text-[13px]">
              {mobileCta}
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-muted-foreground md:flex-row">
        <span>Peak · private surf journal for iPhone</span>
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          {footerNav.map((item) => (
            <a
              key={item.key}
              className="inline-flex min-h-6 items-center hover:text-foreground"
              href={hrefFor(item.key)}
            >
              {item.label}
            </a>
          ))}
          <a
            className="inline-flex min-h-6 items-center hover:text-foreground"
            href={MAKER_URL}
            target="_blank"
            rel="noreferrer"
          >
            made by {MAKER_NAME}
          </a>
        </nav>
      </div>
    </footer>
  );
}
