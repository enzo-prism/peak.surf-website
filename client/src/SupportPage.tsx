import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AppleLogo from "@/components/AppleLogo";
import AppStoreLink from "@/components/AppStoreLink";

const supportEmail = "enzo@design-prism.com";

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
          <img src="/Transparent.png" alt="" className="h-8 w-auto transition-opacity hover:opacity-80" />
          <div className="leading-tight">
            <p className="font-lower text-[11px] tracking-[0.35em] text-muted-foreground">peak</p>
            <p className="text-sm text-muted-foreground">private surf journal</p>
          </div>
        </a>

        <div className="flex items-center gap-3">
          <nav aria-label="Main navigation" className="hidden items-center gap-3 md:flex">
            <Button asChild variant="ghost" size="sm" className="font-lower text-[11px] text-muted-foreground hover:text-foreground">
              <a href="/">home</a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="font-lower text-[11px] text-muted-foreground hover:text-foreground">
              <a href="/privacy.html">privacy</a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="font-lower text-[11px] text-foreground">
              <a href="/support.html" aria-current="page">support</a>
            </Button>
            <Button asChild variant="outline" size="sm" className="font-cta rounded-full border-border/60 bg-transparent px-5 text-[13px] text-foreground hover:bg-accent/20">
              <AppStoreLink location="support_header">
                <AppleLogo className="text-base" />
                download
              </AppStoreLink>
            </Button>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            aria-controls="support-mobile-nav"
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
        id="support-mobile-nav"
        aria-label="Mobile navigation"
        className={isMenuOpen ? "md:hidden" : "hidden"}
      >
        <div className="mx-auto w-full max-w-6xl px-6 pb-6">
          <div className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-background/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
            <Button asChild variant="ghost" size="sm" className="w-full justify-start font-lower text-[11px] text-muted-foreground hover:text-foreground">
              <a ref={firstMobileLinkRef} href="/">home</a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="w-full justify-start font-lower text-[11px] text-muted-foreground hover:text-foreground">
              <a href="/privacy.html">privacy</a>
            </Button>
            <Button asChild variant="ghost" size="sm" className="w-full justify-start font-lower text-[11px] text-foreground">
              <a href="/support.html" aria-current="page">support</a>
            </Button>
            <Button asChild size="sm" className="font-cta w-full justify-center rounded-full px-5 text-[13px]">
              <AppStoreLink location="support_mobile_menu">
                <AppleLogo className="text-base" />
                download
              </AppStoreLink>
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}

function SupportPage() {
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
              support
            </Badge>
            <Separator className="w-auto flex-1 bg-border/60" />
          </div>

          <div className="mt-6 max-w-3xl">
            <h1 className="font-hero text-4xl leading-tight md:text-5xl">
              help with Peak, from a real person.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Need help or want to share feedback? Send us an email and include
              the details below so we can respond quickly.
            </p>
            {/*
              The button base class is whitespace-nowrap, and the full address is
              wider than a 320px viewport can hold. Allow the label to wrap and
              keep the address on its own line so the pill stays inside the page.
            */}
            <Button
              asChild
              size="lg"
              className="font-cta mt-8 h-auto min-h-11 whitespace-normal rounded-3xl px-5 py-3 text-[13px] sm:rounded-full sm:px-8"
            >
              <a href={`mailto:${supportEmail}`} className="text-center">
                <span className="block sm:inline">email</span>
                <span className="block break-words sm:inline sm:ps-1">
                  {supportEmail}
                </span>
              </a>
            </Button>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-6 pb-28 md:grid-cols-2">
          <Card className="border-border/60 bg-card/40">
            <CardHeader>
              <p className="font-lower text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                for any issue
              </p>
              <CardTitle className="font-hero text-2xl">include these details</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {["App version", "iOS version", "Device model", "Steps to reproduce the issue"].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/40">
            <CardHeader>
              <p className="font-lower text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                auto-fill conditions
              </p>
              <CardTitle className="font-hero text-2xl">add this context</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Session date, time, and duration",
                  "Surf break name",
                  "Whether the surf break has a pinned location",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-muted-foreground md:flex-row">
          <span>peak surf journal</span>
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a className="inline-flex items-center hover:text-foreground" href="/">home</a>
            <a className="inline-flex items-center hover:text-foreground" href="/about.html">about</a>
            <a className="inline-flex items-center hover:text-foreground" href="/changelog.html">changelog</a>
            <a className="inline-flex items-center hover:text-foreground" href="/privacy.html">privacy</a>
            <a className="inline-flex items-center hover:text-foreground" href="/support.html">support</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default SupportPage;
