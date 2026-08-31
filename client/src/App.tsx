import { useEffect, useRef, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AppleLogo from "@/components/AppleLogo";
import AppStoreLink from "@/components/AppStoreLink";

function cloudinarySrcSet(src: string) {
  return [480, 800, 1200, 1600]
    .map((width) => `${src.replace("w_1400", `w_${width}`)} ${width}w`)
    .join(", ");
}

const journey = [
  {
    step: "01",
    eyebrow: "before",
    title: "know when to go.",
    description:
      "Best Window Today pairs tide data with patterns from sessions you rated highly. It only speaks up when there is enough history to be useful.",
    detail: "Personal to your surf history · Confidence-aware",
  },
  {
    step: "02",
    eyebrow: "during",
    title: "start without stopping.",
    description:
      "Begin a session from Peak, Siri, Control Center, or the Lock Screen. Follow it with a Live Activity on iPhone and Dynamic Island.",
    detail: "Siri · Control Center · Live Activity",
  },
  {
    step: "03",
    eyebrow: "after",
    title: "keep the session yours.",
    description:
      "Review your route, conditions, board, notes, and editable wave estimates. Then find any session again in seconds.",
    detail: "Editable insights · Searchable history",
  },
];

const ecosystemFeatures = [
  { label: "widgets", detail: "today at a glance" },
  { label: "siri", detail: "start hands-free" },
  { label: "lock screen", detail: "session controls" },
  { label: "control center", detail: "one-tap access" },
  { label: "live activity", detail: "follow the session" },
  { label: "dynamic island", detail: "stay in the moment" },
];

const healthMetrics = [
  { value: "18", label: "waves" },
  { value: "19.4", unit: "mph", label: "top speed" },
  { value: "312", unit: "yd", label: "longest ride" },
  { value: "2.8", unit: "mi", label: "paddle distance" },
];

type ProductScreenSource = {
  type: string;
  srcSet: string;
  sizes?: string;
};

type ProductScreen = {
  src: string;
  alt: string;
  label: string;
  caption: string;
  responsiveSources?: ProductScreenSource[];
};

const productImageSources = (name: string): ProductScreenSource[] => [
  {
    type: "image/webp",
    srcSet: `/app-screens/${name}-660.webp 660w, /app-screens/${name}-990.webp 990w`,
  },
];

const productScreens: Record<string, ProductScreen> = {
  log: {
    src: "/app-screens/log.png",
    alt: "Peak Log screen with Log Session and Start Session buttons, a Best window today spot selector, and recent sessions",
    label: "best window",
    caption: "Check a personal surf window, then start tracking in one tap.",
    responsiveSources: productImageSources("log"),
  },
  history: {
    src: "/app-screens/history.png",
    alt: "Peak History screen listing dated surf sessions with spots, ratings, wave heights, gear, buddies, photos, and notes",
    label: "history",
    caption: "Every session, rating, spot, and note in one place.",
    responsiveSources: productImageSources("history"),
  },
  sessionDetail: {
    src: "/app-screens/session-detail.png",
    alt: "Peak Session screen for a five-star Trestles surf showing photos, wave height, duration, time, wave count, and a detailed surf report",
    label: "session detail",
    caption: "Review the photos, conditions, timing, and waves that made the session memorable.",
    responsiveSources: productImageSources("session-detail"),
  },
  stats: {
    src: "/app-screens/stats.png",
    alt: "Peak Stats screen showing time in the water, average session length, surf days, streaks, a monthly goal, and a July recap",
    label: "stats",
    caption: "Turn a growing logbook into useful patterns about spots, conditions, and boards.",
    responsiveSources: productImageSources("stats"),
  },
  quiver: {
    src: "/app-screens/quiver.png",
    alt: "Peak Quiver screen showing saved surfboards, wetsuits, and fins with their session history",
    label: "quiver",
    caption: "Keep boards, wetsuits, and fins organized in one place.",
    responsiveSources: productImageSources("quiver"),
  },
  yearInReview: {
    src: "/app-screens/year-in-review.png",
    alt: "Peak Year in Review screen summarizing fictional sample sessions, surf days, hours, ratings, and wave heights",
    label: "year in review",
    caption: "Look back on a year of days, spots, boards, and memories.",
    responsiveSources: productImageSources("year-in-review"),
  },
};

const featuredProductScreens = [
  {
    screen: productScreens.log,
    eyebrow: "best window",
    title: "Know when your spot lines up.",
    description:
      "Peak compares the forecast with your own five-star sessions, then keeps logging one tap away.",
    detail: "Personal history · Spot forecasts · One-tap tracking",
  },
  {
    screen: productScreens.sessionDetail,
    eyebrow: "session detail",
    title: "Remember the whole day.",
    description:
      "Bring the rating, photos, timing, wave count, and detailed surf report together in one editable record.",
    detail: "Editable details · Surf report · Photos and wave stats",
  },
  {
    screen: productScreens.stats,
    eyebrow: "personal stats",
    title: "See your rhythm take shape.",
    description:
      "Follow your time in the water, surf days, streaks, monthly goal, and recent pace without turning surfing into homework.",
    detail: "Time in water · Streaks · Monthly goals",
  },
];

const supportingProductScreens = [
  productScreens.history,
  productScreens.quiver,
  productScreens.yearInReview,
];

const lifestyleImages = [
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/f_auto,q_auto,w_1400/v1768584781/Frame_32_cdeoif.webp",
    alt: "Surfer riding a clean wave",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/f_auto,q_auto,w_1400/v1768584768/Frame_33_o5mkjw.webp",
    alt: "Surfer moving through the face of a wave",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/f_auto,q_auto,w_1400/v1768584769/Frame_30_odkhgc.webp",
    alt: "Ocean surf session photographed from shore",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/f_auto,q_auto,w_1400/v1768584764/Frame_24_xcrbqs.webp",
    alt: "Surfer carving across open water",
  },
];

function App() {
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
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-full bg-white px-5 py-3 text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        skip to content
      </a>

      <header className="relative z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 md:px-8">
          <a
            href="/"
            aria-label="Peak home"
            className="flex min-h-11 items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <img src="/Transparent.png" alt="" className="h-8 w-auto" />
            <div className="leading-tight">
              <p className="font-display text-sm">peak</p>
              <p className="text-[11px] text-white/50">private surf journal</p>
            </div>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            <a className="nav-link" href="#how-it-works">
              how it works
            </a>
            <a className="nav-link" href="#intelligence">
              intelligence
            </a>
            <a className="nav-link" href="#privacy">
              privacy
            </a>
            <a className="nav-link" href="/about.html">
              about
            </a>
            <Button
              asChild
              size="sm"
              className="ml-3 h-11 rounded-full bg-white px-5 text-xs text-black hover:bg-white/85"
            >
              <AppStoreLink location="home_header">get peak 3.2</AppStoreLink>
            </Button>
          </nav>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-white/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:hidden"
          >
            <span className="sr-only">menu</span>
            <span className="space-y-1.5" aria-hidden="true">
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </span>
          </button>
        </div>

        <div id="mobile-nav" className={isMenuOpen ? "md:hidden" : "hidden"}>
          <nav
            aria-label="Mobile navigation"
            className="mx-5 mb-5 grid gap-1 rounded-2xl border border-white/10 bg-[#111] p-3"
          >
            {[
              ["how it works", "#how-it-works"],
              ["intelligence", "#intelligence"],
              ["privacy", "#privacy"],
              ["about", "/about.html"],
              ["changelog", "/changelog.html"],
            ].map(([label, href]) => (
              <a
                key={href}
                ref={label === "how it works" ? firstMobileLinkRef : undefined}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                {label}
              </a>
            ))}
            <Button asChild className="mt-2 h-11 rounded-full bg-white text-black">
              <AppStoreLink location="home_mobile_menu">get peak 3.2</AppStoreLink>
            </Button>
          </nav>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
        <section className="relative">
          <div className="hero-glow" aria-hidden="true" />
          <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-24 pt-16 md:px-8 md:pb-32 md:pt-24 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="relative z-10 max-w-3xl">
              <Badge className="fade-up border border-white/15 bg-white/5 px-3 py-1.5 font-normal text-white/75 hover:bg-white/5">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#86d9b3]" />
                Peak 3.2 · available now
              </Badge>
              {/*
                The three lines are hard-broken on purpose, so the type scale is
                fluid and capped per band to keep the longest line ("Track what
                happened.") on one line at every width. A fixed scale wrapped it
                into six ragged lines from 1024px up.
              */}
              <h1 className="fade-up fade-delay-1 mt-7 font-hero text-[clamp(1.5rem,7.4vw,2.3rem)] leading-[0.96] tracking-[-0.05em] sm:text-[clamp(2.3rem,8.1vw,3.65rem)] lg:text-[clamp(2.75rem,4.4vw,3.6rem)]">
                Know when to go.
                <br />
                <span className="text-white/65">Track what happened.</span>
                <br />
                Keep it private.
              </h1>
              <p className="fade-up fade-delay-2 mt-8 max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
                Peak turns your own surf history into useful timing, editable
                session insights, and a journal that stays on your devices.
              </p>
              <div className="fade-up fade-delay-3 mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button
                  asChild
                  size="lg"
                  className="h-12 rounded-full bg-white px-7 text-sm text-black hover:bg-white/85"
                >
                  <AppStoreLink location="home_hero">
                    <AppleLogo className="mr-2 text-base" />
                    download Peak 3.2
                  </AppStoreLink>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-12 rounded-full border-white/20 bg-transparent px-7 text-sm text-white hover:bg-white/10 hover:text-white"
                >
                  <a href="#how-it-works">
                    see how it works
                  </a>
                </Button>
              </div>
              <p className="fade-up fade-delay-4 mt-5 text-xs leading-relaxed text-white/55">
                Version 3.2 is available now on the App Store. Free update for
                everyone already on Peak.
              </p>
            </div>

            <div className="fade-up fade-delay-2 relative mx-auto w-full max-w-[620px]">
              <div className="hero-product-stage">
                <ProductPhone
                  screen={productScreens.log}
                  priority
                  className="max-w-[330px]"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="how-it-works"
          className="scroll-mt-24 border-y border-white/10 bg-[#070707]"
        >
          <div className="mx-auto w-full max-w-7xl px-5 py-24 md:px-8 md:py-32">
            <SectionIntro
              eyebrow="before · during · after"
              title="Your whole session, connected."
              description="Peak 3.2 fits around the surf instead of pulling you away from it."
            />
            <div className="mt-14 grid gap-4 lg:grid-cols-3">
              {journey.map((item) => (
                <Card
                  key={item.step}
                  className="group border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055]"
                >
                  <CardContent className="flex h-full flex-col p-7 md:p-8">
                    <div className="flex items-center justify-between">
                      <span className="text-xs tracking-[0.22em] text-white/55">
                        {item.eyebrow}
                      </span>
                      <span className="font-mono text-xs text-white/55">
                        {item.step}
                      </span>
                    </div>
                    <h3 className="mt-16 font-hero text-3xl tracking-[-0.035em]">
                      {item.title}
                    </h3>
                    <p className="mt-4 flex-1 text-sm leading-7 text-white/55">
                      {item.description}
                    </p>
                    <Separator className="my-7 bg-white/10" />
                    <p className="text-xs text-white/55">{item.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-7xl gap-16 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="section-eyebrow">built into iPhone</p>
            <h2 className="section-title mt-5">Ready before you unlock.</h2>
            <p className="section-copy mt-6">
              Peak puts the next action where you already are. Start faster,
              check progress at a glance, and leave your phone alone when the
              waves are working.
            </p>
            <p className="mt-6 text-xs leading-6 text-white/55">
              Siri, widgets, Control Center, Lock Screen, Live Activities, and
              Dynamic Island all ship in Peak 3.2.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {ecosystemFeatures.map((feature, index) => (
              <div
                key={feature.label}
                className="flex min-h-28 items-center gap-4 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-5"
              >
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-black text-xs text-white/55">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <p className="text-sm font-medium">{feature.label}</p>
                  <p className="mt-1 text-xs text-white/55">{feature.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="intelligence"
          className="scroll-mt-24 border-y border-white/10 bg-[#f2f1ed] text-black"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.23em] text-black/60">
                apple health insights
              </p>
              <h2 className="mt-5 font-hero text-[clamp(2.5rem,5vw,5rem)] leading-[0.95] tracking-[-0.05em]">
                The numbers help.
                <br />
                You get the final word.
              </h2>
              <p className="mt-7 max-w-xl text-base leading-7 text-black/60 md:text-lg">
                With your permission, Peak uses Apple Health workout route data
                to estimate wave count, speed, distance, and rides. Every
                estimate can be reviewed and edited.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/55 px-4 py-2 text-xs text-black/60">
                <span className="grid h-5 w-5 place-items-center rounded-full bg-black text-[10px] text-white">
                  ✓
                </span>
                Numbers are computed by Peak
              </div>
            </div>

            <div className="rounded-[2.5rem] border border-black/10 bg-black p-4 shadow-[0_35px_100px_rgba(0,0,0,0.25)] sm:p-6">
              <div className="rounded-[1.8rem] border border-white/10 bg-[#151515] p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/55">Sunset Cliffs</p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      morning session
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/50">
                    editable
                  </span>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-3">
                  {healthMetrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"
                    >
                      <p className="text-2xl font-semibold text-white">
                        {metric.value}
                        {metric.unit && (
                          <span className="ml-1 text-xs font-normal text-white/55">
                            {metric.unit}
                          </span>
                        )}
                      </p>
                      <p className="mt-1 text-xs text-white/55">{metric.label}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 h-20 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] px-4 pt-4">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/55">
                    workout route
                  </p>
                  <svg
                    viewBox="0 0 400 60"
                    className="mt-1 w-full"
                    role="img"
                    aria-label="Example surf route line"
                  >
                    <path
                      d="M0 40 C55 8 95 54 145 28 S225 46 270 18 S350 50 400 10"
                      fill="none"
                      stroke="rgba(134,217,179,.8)"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="privacy"
          className="scroll-mt-24 mx-auto grid w-full max-w-7xl gap-16 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[1fr_1fr] lg:items-start"
        >
          <div className="lg:sticky lg:top-32">
            <p className="section-eyebrow">private intelligence</p>
            <h2 className="section-title mt-5">Built from your history. Kept as yours.</h2>
            <p className="section-copy mt-6">
              Peak learns from the sessions you choose to save. Board Report,
              personal records, goals, On This Day, and yearly recaps help turn a
              logbook into something useful.
            </p>
          </div>
          <div className="grid gap-px overflow-hidden rounded-[2rem] border border-white/10 bg-white/10">
            {[
              ["No account required", "Start journaling without creating a profile."],
              ["No ads", "The product is the journal, not your attention."],
              ["No app analytics", "Your surf history is not a marketing dataset."],
              [
                "On-device by design",
                "Optional Apple Intelligence phrasing happens on supported devices; Peak computes the numbers.",
              ],
              [
                "Portable, not trapped",
                "Export and backup tools keep you in control of the archive.",
              ],
            ].map(([title, description], index) => (
              <div
                key={title}
                className="grid gap-4 bg-black p-6 sm:grid-cols-[44px_1fr] sm:p-8"
              >
                <span className="text-xs text-white/55">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-medium">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/55">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-white/10 bg-[#070707]">
          <div className="mx-auto w-full max-w-7xl px-5 py-24 md:px-8 md:py-32">
            <SectionIntro
              eyebrow="real product · real screens"
              title="A journal you will want to revisit."
              description="Peak keeps logging quiet, then makes your history, progress, and gear easy to understand."
            />
            <p className="mt-7 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs leading-5 text-white/60">
              Screens show fictional sample surf data for demonstration.
            </p>

            <div className="mt-16 space-y-20 md:space-y-28">
              {featuredProductScreens.map((feature, index) => (
                <article
                  key={feature.eyebrow}
                  className="product-feature-band"
                >
                  <div
                    className={
                      index % 2 === 1
                        ? "lg:order-2 lg:pl-10"
                        : "lg:pr-10"
                    }
                  >
                    <p className="section-eyebrow">{feature.eyebrow}</p>
                    <h3 className="mt-5 max-w-xl font-hero text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[0.97] tracking-[-0.045em]">
                      {feature.title}
                    </h3>
                    <p className="mt-6 max-w-xl text-base leading-7 text-white/60 md:text-lg">
                      {feature.description}
                    </p>
                    <p className="mt-7 text-xs leading-6 text-white/55">
                      {feature.detail}
                    </p>
                  </div>
                  <div
                    className={`product-feature-visual ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <ProductPhone
                      screen={feature.screen}
                      className="max-w-[330px]"
                    />
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-24 border-t border-white/10 pt-14 md:mt-32 md:pt-20">
              <div className="max-w-2xl">
                <p className="section-eyebrow">the rest of your journal</p>
                <h3 className="mt-4 font-hero text-3xl tracking-[-0.035em] md:text-5xl">
                  History, gear, and the year behind you.
                </h3>
              </div>
              <div className="mt-12 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                {supportingProductScreens.map((screen) => (
                  <figure key={screen.src} className="group">
                    <ProductPhone screen={screen} />
                    <figcaption className="mx-auto mt-5 max-w-[290px]">
                      <p className="text-sm font-medium">{screen.label}</p>
                      <p className="mt-1.5 text-xs leading-5 text-white/55">
                        {screen.caption}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-5 py-24 md:px-8 md:py-32">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lifestyleImages.map((image, index) => (
              <figure
                key={image.src}
                className={`overflow-hidden rounded-[1.75rem] border border-white/10 ${
                  index % 2 === 1 ? "lg:translate-y-8" : ""
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  srcSet={cloudinarySrcSet(image.src)}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  width="1050"
                  height="1400"
                  className="aspect-[3/4] w-full object-cover transition duration-700 hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
          <p className="mx-auto mt-16 max-w-xl text-center text-sm leading-6 text-white/55">
            The ocean moves fast. Your memory does not have to.
          </p>
        </section>

        <section className="px-5 pb-24 md:px-8 md:pb-32">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white text-black">
            <div className="grid gap-10 p-8 sm:p-12 md:p-16 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-black/60">
                  available now on iPhone
                </p>
                <h2 className="mt-5 max-w-3xl font-hero text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.05em]">
                  Start your private surf history.
                </h2>
                <p className="mt-6 max-w-xl text-sm leading-6 text-black/60">
                  Download Peak 3.2 today. Free, no account, and your
                  history stays on your devices.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-black px-8 text-white hover:bg-black/80"
              >
                <AppStoreLink location="home_footer_cta">
                  <AppleLogo className="mr-2 text-base" />
                  download Peak 3.2
                </AppStoreLink>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-8 text-xs text-white/55 md:flex-row md:items-center md:justify-between md:px-8">
          <span>Peak · private surf journal for iPhone</span>
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer navigation">
            <a className="footer-link" href="/privacy.html">
              privacy
            </a>
            <a className="footer-link" href="/support.html">
              support
            </a>
            <a className="footer-link" href="/about.html">
              about
            </a>
            <a className="footer-link" href="/changelog.html">
              changelog
            </a>
            <a
              className="footer-link"
              href="https://www.design-prism.com"
              target="_blank"
              rel="noreferrer"
            >
              made by Prism
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function ProductPhone({
  screen,
  priority = false,
  className = "",
}: {
  screen: ProductScreen;
  priority?: boolean;
  className?: string;
}) {
  const sizes = "(min-width: 1024px) 330px, min(86vw, 330px)";

  return (
    <div className={`phone-frame ${className}`}>
      <picture className="block h-full w-full">
        {screen.responsiveSources?.map((source) => (
          <source
            key={`${source.type}-${source.srcSet}`}
            type={source.type}
            srcSet={source.srcSet}
            sizes={source.sizes ?? sizes}
          />
        ))}
        <img
          src={screen.src}
          alt={screen.alt}
          width="1320"
          height="2868"
          sizes={sizes}
          className="h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
          decoding="async"
        />
      </picture>
    </div>
  );
}

function SectionIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-5">{title}</h2>
      <p className="section-copy mt-6">{description}</p>
    </div>
  );
}

export default App;
