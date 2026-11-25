import { useEffect, useState } from "react";
import { useMotion } from "./useMotion";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AppleLogo from "@/components/AppleLogo";
import { AndroidNote, AppStoreBadge, AppStoreQr } from "@/components/AppStoreBadge";
import AppStoreLink from "@/components/AppStoreLink";
import { MobileDownloadBar } from "@/components/MobileDownloadBar";
import { SiteFooter, SiteHeader, SkipLink, type HeaderLink } from "@/components/SiteChrome";
import { featuredFaqItems } from "@/content/faq";
import { hrefFor } from "@/seo/routes";
import { APP_VERSION, MIN_IOS } from "@/site";

const homeLinks: HeaderLink[] = [
  { label: "how it works", href: "#how-it-works" },
  { label: "features", href: hrefFor("features") },
  { label: "apple watch", href: hrefFor("appleWatch") },
  { label: "faq", href: "#faq" },
  { label: "about", href: hrefFor("about") },
];

const homeMobileLinks: HeaderLink[] = [
  ...homeLinks,
  { label: "changelog", href: hrefFor("changelog") },
  { label: "support", href: hrefFor("support") },
];

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
    alt: "Surfboards beneath a shaded surf shop sign",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/f_auto,q_auto,w_1400/v1768584768/Frame_33_o5mkjw.webp",
    alt: "Surfer holding a board beside the rocky coast",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/f_auto,q_auto,w_1400/v1768584769/Frame_30_odkhgc.webp",
    alt: "Surfer with a board at the shoreline at sunset",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/f_auto,q_auto,w_1400/v1768584764/Frame_24_xcrbqs.webp",
    alt: "Friends with surfboards after a session",
  },
];

function App() {
  const motion = useMotion();
  return (
    <div ref={motion.root} data-motion={motion.paused || motion.reduced ? "paused" : "active"} className="peak-site min-h-screen bg-background text-foreground">
      <SkipLink />
      <SiteHeader
        wide
        links={homeLinks}
        mobileLinks={homeMobileLinks}
        cta={<AppStoreLink location="home_header">get peak {APP_VERSION}</AppStoreLink>}
        mobileCta={
          <AppStoreLink location="home_mobile_menu">
            <AppleLogo className="text-base" />
            download Peak {APP_VERSION}
          </AppStoreLink>
        }
      />

      <main id="main-content" tabIndex={-1}>
        <section data-motion-zone className="hero" aria-labelledby="hero-title">
          <div className="hero-ocean" aria-hidden="true">
            <img src={lifestyleImages[2].src} srcSet={cloudinarySrcSet(lifestyleImages[2].src)} sizes="100vw" alt="" width="1400" height="1867" {...{ fetchpriority: "high" }} />
          </div>
          <SwellContours />
          <div className="hero-layout mx-auto max-w-7xl px-5 md:px-8">
            <div className="hero-copy">
              <Badge className="fade-up border border-white/20 bg-black/20 px-3 py-2 font-normal text-white/80 hover:bg-black/20">
                <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-[#b6d7c7]" />
                Peak {APP_VERSION} · the private surf journal for iPhone
              </Badge>
              <h1 id="hero-title" className="hero-title mt-8">
                <span className="hero-line"><span>Every wave.</span></span>
                <span className="hero-line"><span>Worth <em>keeping.</em></span></span>
              </h1>
              <p className="fade-up fade-delay-2 hero-description">
                Know when to go. Remember how it felt.
                <br />Your surf history, kept entirely yours.
              </p>
              <div className="fade-up fade-delay-3 mt-9 flex flex-wrap items-center gap-x-3 gap-y-2">
                <AppStoreLink location="home_hero" data-download-cta className="app-badge-link">
                  <AppStoreBadge className="h-[54px]" />
                </AppStoreLink>
                <a href="#how-it-works" className="hero-explore">Explore the journal <span aria-hidden="true">↓</span></a>
              </div>
              <p className="fade-up fade-delay-4 mt-5 text-[13px] text-white/65">Free on iPhone · No account · iOS {MIN_IOS} or later</p>
              <div className="mt-5 max-w-md"><AndroidNote /></div>
            </div>
            <div className="hero-device fade-up fade-delay-2">
              <div className="hero-device-halo" aria-hidden="true" />
              <div className="hero-phone-float"><HeroScreens /></div>
              <div className="device-note"><span className="note-rule" />Your next session starts here.</div>
            </div>
          </div>
          <div className="hero-bottom mx-auto max-w-7xl px-5 md:px-8">
            <a href="#how-it-works" className="scroll-cue"><span aria-hidden="true">↓</span> A little less screen. A little more sea.</a>
            <button type="button" className="motion-toggle" onClick={motion.toggle} aria-pressed={motion.paused || motion.reduced} disabled={motion.reduced}>
              <span aria-hidden="true">{motion.paused || motion.reduced ? "▶" : "Ⅱ"}</span>
              {motion.reduced ? "Reduced motion" : motion.paused ? "Resume motion" : "Pause motion"}
            </button>
          </div>
        </section>

        <section
          id="how-it-works"
          className="border-y border-white/10 bg-[#070707]"
        >
          <div className="mx-auto w-full max-w-7xl px-5 py-24 md:px-8 md:py-32">
            <SectionIntro
              eyebrow="before · during · after"
              title="Your whole session, connected."
              description="Peak is a free surf log for iPhone that fits around the surf instead of pulling you away from it."
            />
            <div className="swipe-row swipe-row-wide mt-12 lg:grid lg:grid-cols-3 lg:gap-4" role="region" aria-label="Before, during and after a session" tabIndex={0}>
              {journey.map((item) => (
                <Card
                  key={item.step}
                  data-reveal
                  className="journey-card group border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055]"
                >
                  <CardContent className="flex h-full flex-col p-7 md:p-8">
                    <div className="flex items-center justify-between">
                      <span className="text-xs tracking-[0.22em] text-white/60">
                        {item.eyebrow}
                      </span>
                      <span className="tabular-nums text-xs text-white/60">
                        {item.step}
                      </span>
                    </div>
                    <JourneyGraphic step={item.step} />
                    <h3 className="mt-6 font-hero text-[1.75rem] leading-tight tracking-[-0.035em] md:mt-8 md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 flex-1 text-sm leading-7 text-white/55">
                      {item.description}
                    </p>
                    <Separator className="my-6 bg-white/10 md:my-7" />
                    <p className="text-[13px] text-white/60">{item.detail}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section data-reveal className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 md:gap-16 md:px-8 md:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="section-eyebrow">built into iPhone</p>
            <h2 className="section-title mt-5">Ready before you unlock.</h2>
            <p className="section-copy mt-6">
              Peak puts the next action where you already are. Start faster,
              check progress at a glance, and leave your phone alone when the
              waves are working.
            </p>
            <p className="mt-6 text-[13px] leading-6 text-white/60">
              Siri, widgets, Control Center, Lock Screen, Live Activities, and
              Dynamic Island all ship in Peak {APP_VERSION}.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {ecosystemFeatures.map((feature, index) => (
              <div
                key={feature.label}
                className="ecosystem-card flex flex-col items-start gap-3 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-4 sm:min-h-28 sm:flex-row sm:items-center sm:gap-4 sm:p-5"
              >
                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-black text-xs text-white/60 sm:h-11 sm:w-11 sm:rounded-2xl">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div>
                  <p className="text-[15px] font-medium sm:text-sm">{feature.label}</p>
                  <p className="mt-1 text-[13px] leading-5 text-white/60 sm:text-xs">{feature.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="intelligence"
          data-reveal
          className="border-y border-white/10 bg-[#f2f1ed] text-black"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-black/65">
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
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/55 px-4 py-2 text-xs text-black/60">
                  <span aria-hidden="true" className="grid h-5 w-5 place-items-center rounded-full bg-black text-[11px] text-white">
                    ✓
                  </span>
                  Numbers are computed by Peak
                </div>
                <a
                  href={hrefFor("appleWatch")}
                  className="inline-flex min-h-11 items-center text-sm text-black underline-offset-4 hover:underline"
                >
                  How Apple Watch surf tracking works <span aria-hidden="true" className="ml-1">→</span>
                </a>
              </div>
            </div>

            <div className="insight-card rounded-[2.5rem] border border-black/10 bg-black p-4 shadow-[0_35px_100px_rgba(0,0,0,0.25)] sm:p-6">
              <div className="rounded-[1.8rem] border border-white/10 bg-[#151515] p-5 sm:p-7">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/55">Sunset Cliffs</p>
                    <p className="mt-1 text-lg font-semibold text-white">
                      morning session
                    </p>
                  </div>
                  <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
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
                  <p className="text-xs uppercase tracking-[0.14em] text-white/60">
                    workout route · illustrative session
                  </p>
                  <svg
                    viewBox="0 0 400 60"
                    className="mt-1 w-full"
                    role="img"
                    aria-label="Example surf route line"
                  >
                    <path className="route-path" pathLength="1"
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
          className="mx-auto grid w-full max-w-7xl gap-16 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[1fr_1fr] lg:items-start"
        >
          <div data-reveal className="lg:sticky lg:top-32">
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
                data-reveal className="privacy-row grid grid-cols-[32px_1fr] gap-3 bg-black p-5 sm:grid-cols-[44px_1fr] sm:gap-4 sm:p-8"
              >
                <span className="pt-1 text-xs tabular-nums text-white/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-[17px] font-medium sm:text-lg">{title}</h3>
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
            <p className="mt-6 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs leading-5 text-white/65">
              Screens show fictional sample surf data for demonstration.
            </p>

            <div className="product-feature-list swipe-row mt-10 lg:mt-16" role="region" aria-label="Peak screens: best window, session detail, and stats" tabIndex={0}>
              {featuredProductScreens.map((feature, index) => (
                <article
                  key={feature.eyebrow}
                  data-reveal className="product-feature-band"
                >
                  <div
                    className={
                      index % 2 === 1
                        ? "lg:order-2 lg:pl-10"
                        : "lg:pr-10"
                    }
                  >
                    <p className="section-eyebrow"><span className="chapter-number">0{index + 1}</span>{feature.eyebrow}</p>
                    <h3 className="mt-4 max-w-xl font-hero text-[clamp(1.85rem,4.5vw,4.5rem)] leading-[1] tracking-[-0.045em] lg:mt-5">
                      {feature.title}
                    </h3>
                    <p className="mt-4 max-w-xl text-[15px] leading-6 text-white/65 md:text-lg md:leading-7 lg:mt-6">
                      {feature.description}
                    </p>
                    <p className="mt-4 text-[13px] leading-6 text-white/60 lg:mt-7">
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
                      sizes="(min-width: 1024px) 330px, 240px"
                    />
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 border-t border-white/10 pt-12 md:mt-32 md:pt-20">
              <div className="max-w-2xl">
                <p className="section-eyebrow">the rest of your journal</p>
                <h3 className="mt-4 font-hero text-3xl tracking-[-0.035em] md:text-5xl">
                  History, gear, and the year behind you.
                </h3>
              </div>
              <div className="supporting-list swipe-row mt-10 md:mt-12" role="region" aria-label="Peak screens: history, quiver, and year in review" tabIndex={0}>
                {supportingProductScreens.map((screen) => (
                  <figure key={screen.src} data-reveal className="supporting-screen group">
                    <ProductPhone screen={screen} sizes="(min-width: 1024px) 330px, 220px" />
                    <figcaption className="mx-auto mt-5 max-w-[290px]">
                      <p className="text-[15px] font-medium">{screen.label}</p>
                      <p className="mt-1.5 text-[13px] leading-5 text-white/60">
                        {screen.caption}
                      </p>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="lifestyle-section mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-32">
          <div data-reveal className="mb-10 md:mb-14"><p className="section-eyebrow">Made for the days that stay with you</p><h2 className="ocean-statement mt-5">Be out there.<br /><span>Keep it with you.</span></h2></div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {lifestyleImages.map((image, index) => (
              <figure
                key={image.src}
                data-reveal
                className={`overflow-hidden rounded-[1.25rem] border border-white/10 sm:rounded-[1.75rem] ${
                  index % 2 === 1 ? "lg:translate-y-8" : ""
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  srcSet={cloudinarySrcSet(image.src)}
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  width="1050"
                  height="1400"
                  className="aspect-[3/4] w-full object-cover transition duration-700 hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            ))}
          </div>
          <p className="mx-auto mt-12 max-w-xl text-center text-sm leading-6 text-white/60 md:mt-16">
            The ocean moves fast. Your memory does not have to.
          </p>
        </section>

        <section
          id="faq"
          aria-labelledby="faq-title"
          className="border-y border-white/10 bg-[#070707]"
        >
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 md:gap-14 md:px-8 md:py-32 lg:grid-cols-[0.8fr_1.2fr]">
            <div data-reveal>
              <p className="section-eyebrow">questions</p>
              <h2 id="faq-title" className="section-title mt-5">Good to know before you paddle out.</h2>
              <p className="section-copy mt-6">
                Peak is free, needs no account, and keeps your surf history on
                your iPhone.
              </p>
              <a
                href={hrefFor("faq")}
                className="mt-8 inline-flex min-h-11 items-center text-sm text-white underline-offset-4 hover:underline"
              >
                Read all questions <span aria-hidden="true" className="ml-1">→</span>
              </a>
            </div>
            <div className="grid gap-px self-start overflow-hidden rounded-[2rem] border border-white/10 bg-white/10">
              {featuredFaqItems.map((item, index) => (
                <details key={item.id} data-reveal className="faq-item group bg-black" open={index === 0}>
                  <summary className="faq-summary">
                    <h3 className="text-[17px] font-medium leading-snug sm:text-lg">{item.question}</h3>
                    <span className="faq-icon" aria-hidden="true" />
                  </summary>
                  <div className="px-5 pb-6 sm:px-8 sm:pb-8">
                    <p className="text-[15px] leading-6 text-white/65 sm:text-sm">{item.answer}</p>
                    {item.link && (
                      <a
                        href={item.link.href}
                        className="mt-2 inline-flex min-h-11 items-center text-sm text-white/85 underline-offset-4 hover:text-white hover:underline"
                      >
                        {item.link.label} <span aria-hidden="true" className="ml-1">→</span>
                      </a>
                    )}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section data-reveal className="closing-section px-5 py-20 md:px-8 md:pb-32 md:pt-24">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-white text-black">
            <div className="grid gap-10 p-8 sm:p-12 md:p-16 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-black/65">
                  available now on iPhone
                </p>
                <h2 className="mt-5 max-w-3xl font-hero text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-[-0.05em]">
                  Start your private surf history.
                </h2>
                <p className="mt-6 max-w-xl text-[15px] leading-6 text-black/65">
                  Download Peak {APP_VERSION} today. Free, no account, and your
                  history stays on your devices. Requires iOS {MIN_IOS} or later.
                </p>
                <div className="mt-5 max-w-md"><AndroidNote tone="light" /></div>
              </div>
              <div className="flex flex-col items-start gap-6 lg:items-end">
                <AppStoreLink location="home_footer_cta" data-download-cta className="app-badge-link">
                  <AppStoreBadge className="h-14" />
                </AppStoreLink>
                <AppStoreQr />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter wide />
      <MobileDownloadBar link={<AppStoreLink location="home_sticky_bar" />} />
    </div>
  );
}

const heroScreens = [productScreens.log, productScreens.sessionDetail, productScreens.stats];

/**
 * The hero phone cycles through three real Peak screens with a slow
 * crossfade (CSS only, see .hero-screens in index.css). The first screen is
 * prerendered; the others mount after hydration so they never compete with
 * the page's first paint. Pause motion and reduced motion stop the cycle on
 * the first screen.
 */
function HeroScreens() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const show = () => setReady(true);
    if (document.readyState === "complete") show();
    else window.addEventListener("load", show, { once: true });
    return () => window.removeEventListener("load", show);
  }, []);

  return (
    <div data-motion-zone className="hero-screens phone-frame">
      {heroScreens.map((screen, index) =>
        index === 0 || ready ? (
          <div key={screen.src} className={`hero-screen hero-screen-${index + 1}`} aria-hidden={index === 0 ? undefined : true}>
            <picture>
              {screen.responsiveSources?.map((source) => (
                <source key={source.srcSet} type={source.type} srcSet={source.srcSet} sizes="(min-width: 1024px) 278px, 230px" />
              ))}
              <img
                src={screen.src}
                alt={index === 0 ? "Peak app screens: the Log screen, a session detail, and personal stats" : ""}
                width="1320"
                height="2868"
                sizes="(min-width: 1024px) 278px, 230px"
                className="h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </picture>
          </div>
        ) : null,
      )}
    </div>
  );
}

function SwellContours() {
  return <svg className="swell-contours" viewBox="0 0 1440 860" fill="none" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
    <g>{Array.from({ length: 12 }, (_, index) => <path key={index} d={`M-200 ${430 + index * 27} C180 ${90 + index * 32} 420 ${920 + index * 15} 800 ${470 + index * 23} S1250 ${210 + index * 26} 1670 ${390 + index * 28}`} />)}</g>
  </svg>;
}

function JourneyGraphic({ step }: { step: string }) {
  return <div data-motion-zone className={`journey-graphic journey-graphic-${step}`} aria-hidden="true">
    <svg viewBox="0 0 300 90" fill="none">
      {step === "01" ? <>
        <path className="graphic-grid" d="M0 25H300M0 65H300M50 0V90M150 0V90M250 0V90" />
        <path className="tide-line" pathLength="1" d="M0 70C55 70 65 20 115 20S170 70 220 70S265 20 300 20" />
        <circle className="tide-marker" cx="115" cy="20" r="5" />
        <path className="graphic-grid" d="M115 29V90" />
      </> : step === "02" ? <>
        <rect className="activity-shell" x="40" y="16" width="220" height="58" rx="29" />
        <circle className="activity-dot" cx="65" cy="45" r="4" />
        {Array.from({ length: 19 }, (_, i) => <path key={i} className="activity-bar" style={{ animationDelay: `${i * -0.13}s` }} d={`M${87 + i * 7} 34V56`} />)}
        <circle cx="235" cy="45" r="3" fill="currentColor" />
      </> : <>
        <path className="graphic-grid" d="M20 75H280" />
        {[30, 44, 35, 60, 49, 70, 56, 78].map((height, i) => <rect key={i} className="journal-bar" x={30 + i * 31} y={80 - height * 0.8} width="15" height={height * 0.8} rx="3" style={{ animationDelay: `${i * 0.07}s` }} />)}
      </>}
    </svg>
  </div>;
}

function ProductPhone({
  screen,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 330px, min(86vw, 330px)",
}: {
  screen: ProductScreen;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {

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
    <div data-reveal className="max-w-3xl">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title mt-5">{title}</h2>
      <p className="section-copy mt-6">{description}</p>
    </div>
  );
}

export default App;
