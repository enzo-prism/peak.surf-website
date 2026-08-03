import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AppleLogo from "@/components/AppleLogo";

const appStoreUrl = "https://apps.apple.com/us/app/peak-surf/id6757644027";
const supportEmail = "support@prism.app";

const privacySections = [
  {
    title: "on-device data",
    body: (
      <p>
        Peak stores sessions, spots, gear, buddies, photos, videos, and settings
        locally using on-device storage. That data stays on your device unless you
        export a backup, share a session card, or choose an optional feature below.
      </p>
    ),
  },
  {
    title: "auto-fill conditions",
    body: (
      <>
        <p>
          Auto-fill Conditions sends only the session time window and the surf
          break&apos;s pinned coordinates to the public Open-Meteo marine and
          weather APIs over HTTPS.
        </p>
        <p>
          It runs only when you choose it. Peak does not send your name, notes,
          gear, buddies, photos, or other identifiers.
        </p>
      </>
    ),
  },
  {
    title: "location",
    body: (
      <p>
        Location is optional. If you use your location or pin a spot on the map,
        Peak uses it only to place that pin and enable conditions auto-fill for
        it. You can always log a name-only spot.
      </p>
    ),
  },
  {
    title: "Apple Health",
    body: (
      <>
        <p>
          If you enable Apple Health on iPhone, Peak can save logged surf sessions
          as surfing workouts. It can also read Apple Watch surf workouts, heart
          rate, and active calories to enrich sessions or offer import.
        </p>
        <p>
          Access is controlled by iOS and can be revoked in Settings. Peak does
          not upload Health data to a Peak server. There is no Peak server.
        </p>
      </>
    ),
  },
  {
    title: "photos and videos",
    body: (
      <p>
        Media you add with the system photo picker stays on your device unless
        you export a full backup or share a session yourself.
      </p>
    ),
  },
  {
    title: "backup and export",
    body: (
      <p>
        JSON, CSV, and .peakbackup exports are created by you and saved or shared
        by you. Peak does not transmit them automatically.
      </p>
    ),
  },
  {
    title: "this website",
    body: (
      <>
        <p>
          The Peak app and this marketing website are separate. The app does not
          use analytics or tracking SDKs. This website uses Google Analytics to
          understand aggregate page visits and App Store clicks.
        </p>
        <p>
          Website pages may also request fonts from Google, images from
          Cloudinary, and public changelog data from GitHub. Those services
          receive standard web request information, but this website cannot
          access your Peak journal, Apple Health data, or saved media.
        </p>
      </>
    ),
  },
];

function SiteHeader() {
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
            className="h-8 w-auto transition-opacity hover:opacity-80"
          />
          <div className="leading-tight">
            <p className="font-lower text-[11px] tracking-[0.35em] text-muted-foreground">
              peak
            </p>
            <p className="text-sm text-muted-foreground">private surf journal</p>
          </div>
        </a>

        <div className="flex items-center gap-3">
          <nav aria-label="Main navigation" className="hidden items-center gap-3 md:flex">
            <Button asChild variant="ghost" size="sm" className="font-lower text-[11px] text-muted-foreground hover:text-foreground">
              <a href="/">home</a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="font-lower text-[11px] text-foreground">
              <a href="/privacy.html" aria-current="page">privacy</a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="font-lower text-[11px] text-muted-foreground hover:text-foreground">
              <a href="/support.html">support</a>
            </Button>
            <Button asChild variant="outline" size="sm" className="font-cta rounded-full border-border/60 bg-transparent px-5 text-[13px] text-foreground hover:bg-accent/20">
              <a href={appStoreUrl}>
                <AppleLogo className="text-base" />
                download
              </a>
            </Button>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            aria-controls="privacy-mobile-nav"
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
        id="privacy-mobile-nav"
        aria-label="Mobile navigation"
        className={isMenuOpen ? "md:hidden" : "hidden"}
      >
        <div className="mx-auto w-full max-w-6xl px-6 pb-6">
          <div className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-background/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <Button asChild variant="ghost" size="sm" className="w-full justify-start font-lower text-[11px] text-muted-foreground hover:text-foreground">
              <a ref={firstMobileLinkRef} href="/">home</a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="w-full justify-start font-lower text-[11px] text-foreground">
              <a href="/privacy.html" aria-current="page">privacy</a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="w-full justify-start font-lower text-[11px] text-muted-foreground hover:text-foreground">
              <a href="/support.html">support</a>
            </Button>
            <Button asChild size="sm" className="font-cta w-full justify-center rounded-full px-5 text-[13px]">
              <a href={appStoreUrl}>
                <AppleLogo className="text-base" />
                download
              </a>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only z-50 rounded-md bg-foreground px-4 py-2 text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <SiteHeader />

      <main id="main-content" tabIndex={-1}>
        <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-12">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-lower border-border/60 text-[11px] text-muted-foreground">
              privacy
            </Badge>
            <Separator className="w-auto flex-1 bg-border/60" />
          </div>

          <div className="mt-6 max-w-3xl">
            <h1 className="font-hero text-4xl leading-tight md:text-5xl">
              your surf history stays yours.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Peak is private by default. Your surf sessions live on your device.
              We do not require accounts, and the Peak app does not use analytics
              or tracking SDKs.
            </p>
            <p className="mt-4 font-lower text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              last updated July 15, 2026
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-20" aria-label="Privacy details">
          <div className="grid gap-4 md:grid-cols-2">
            {privacySections.map((section) => (
              <Card key={section.title} className="border-border/60 bg-card/40">
                <CardHeader>
                  <CardTitle className="font-hero text-xl">{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                  {section.body}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-28">
          <Card className="border-border/60 bg-card/40">
            <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-2xl">
                <h2 className="font-hero text-2xl md:text-3xl">questions about your data?</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  If you email support, we use the device details or screenshots
                  you choose to share only to respond. Policy changes will appear
                  here and in the app.
                </p>
              </div>
              <Button asChild size="lg" className="font-cta shrink-0 rounded-full px-8 text-[13px]">
                <a href={`mailto:${supportEmail}`}>email support</a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-muted-foreground md:flex-row">
          <span>peak surf journal</span>
          <nav aria-label="Footer navigation" className="flex items-center gap-5">
            <a className="inline-flex items-center hover:text-foreground" href="/privacy.html">privacy</a>
            <a className="inline-flex items-center hover:text-foreground" href="/support.html">support</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default PrivacyPage;
