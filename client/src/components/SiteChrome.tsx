import { useEffect, useRef, useState, type ReactElement } from "react";

import { Button } from "@/components/ui/button";
import { hrefFor, type PageKey } from "@/seo/routes";
import { MAKER_NAME, MAKER_URL } from "@/site";

// Shared sticky header, mobile menu sheet, and footer for every page. The App
// Store CTAs are passed in by each page so every App Store link keeps a
// static, page-specific analytics `location` (enforced by
// scripts/check-analytics.mjs).

type NavItem = { key: PageKey; label: string };
export type HeaderLink = { label: string; href: string; current?: boolean };

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

const toLinks = (items: NavItem[], current?: PageKey): HeaderLink[] =>
  items.map((item) => ({ label: item.label, href: hrefFor(item.key), current: item.key === current }));

const containerClass = (wide: boolean) =>
  wide ? "max-w-7xl px-5 md:px-8" : "max-w-6xl px-5 md:px-6";

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only z-[100] rounded-full bg-white px-5 py-3 text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
    >
      Skip to content
    </a>
  );
}

const focusableSelector = 'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';

export function SiteHeader({
  current,
  cta,
  mobileCta,
  links,
  mobileLinks,
  wide = false,
}: {
  current?: PageKey;
  /** This page's AppStoreLink for the header (static location). Shown on every screen size. */
  cta: ReactElement;
  /** This page's AppStoreLink for the mobile menu sheet (static location). */
  mobileCta: ReactElement;
  /** Override the desktop links (the home page uses in-page anchors). */
  links?: HeaderLink[];
  /** Override the mobile menu links. */
  mobileLinks?: HeaderLink[];
  /** Use the home page's wider 7xl container. */
  wide?: boolean;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  const desktopLinks = links ?? toLinks(desktopNav, current);
  const sheetLinks = mobileLinks ?? toLinks(mobileNav, current);

  useEffect(() => {
    if (!isMenuOpen) return;
    const root = document.documentElement;
    root.classList.add("menu-open");
    firstMobileLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !headerRef.current) return;

      // Keep keyboard focus inside the header and its open menu sheet.
      const focusable = Array.from(
        headerRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => element.getClientRects().length > 0);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onResize = () => {
      if (window.matchMedia("(min-width: 768px)").matches) setIsMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    return () => {
      root.classList.remove("menu-open");
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [isMenuOpen]);

  return (
    <header
      ref={headerRef}
      className="site-header sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl"
      data-menu-open={isMenuOpen}
    >
      <div className={`mx-auto flex w-full items-center justify-between gap-3 py-3 ${containerClass(wide)}`}>
        <a
          href={hrefFor("home")}
          aria-label="Peak home"
          className="flex min-h-11 min-w-0 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <img src="/Transparent.png" alt="" width="300" height="300" className="h-8 w-8 shrink-0" />
          <span className="min-w-0 leading-tight">
            <span className="block font-display text-[15px] text-white">peak</span>
            <span className="block truncate text-xs text-white/60">private surf journal</span>
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-2">
          <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
            {desktopLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={link.current ? "page" : undefined}
                className={`nav-link ${link.current ? "text-white" : ""}`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <Button
            asChild
            size="sm"
            className="header-cta font-cta h-11 rounded-full bg-white px-4 text-[13px] text-black hover:bg-white/85 md:ml-2 md:px-5"
          >
            {cta}
          </Button>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="site-mobile-nav"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="menu-button grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/85 transition active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden"
          >
            <span className="menu-icon" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      <div className="nav-backdrop md:hidden" data-open={isMenuOpen} aria-hidden="true" onClick={() => setIsMenuOpen(false)} />
      <div id="site-mobile-nav" className="nav-sheet md:hidden" data-open={isMenuOpen}>
        <nav aria-label="Mobile navigation" className="mx-auto max-w-xl px-5 pb-6 pt-2">
          <ul className="divide-y divide-white/10">
            {sheetLinks.map((link, index) => (
              <li key={link.href}>
                <a
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  href={link.href}
                  aria-current={link.current ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex min-h-14 items-center justify-between text-[17px] transition active:text-white ${
                    link.current ? "text-white" : "text-white/75"
                  }`}
                >
                  {link.label}
                  {link.current ? (
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#b6d7c7]" />
                  ) : (
                    <span aria-hidden="true" className="text-white/35">→</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
          <Button
            asChild
            className="font-cta mt-5 h-14 w-full rounded-full bg-white text-[15px] text-black hover:bg-white/90"
          >
            {mobileCta}
          </Button>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter({ wide = false }: { wide?: boolean }) {
  return (
    <footer className="border-t border-white/10 pb-24 md:pb-0">
      <div
        className={`mx-auto flex w-full flex-col gap-6 py-10 text-sm text-white/60 md:flex-row md:items-start md:justify-between ${containerClass(wide)}`}
      >
        <div className="leading-6">
          <p className="text-white/85">Peak</p>
          <p>Private surf journal for iPhone</p>
        </div>
        <nav
          aria-label="Footer navigation"
          className="grid grid-cols-2 gap-x-6 sm:flex sm:flex-wrap sm:justify-end sm:gap-x-5 md:max-w-xl"
        >
          {footerNav.map((item) => (
            <a key={item.key} className="footer-link" href={hrefFor(item.key)}>
              {item.label}
            </a>
          ))}
          <a className="footer-link" href={MAKER_URL} target="_blank" rel="noreferrer">
            made by {MAKER_NAME}
          </a>
        </nav>
      </div>
    </footer>
  );
}
