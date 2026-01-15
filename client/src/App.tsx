const featureHighlights = [
  {
    title: "Instant session logging",
    description: "Date + break, gear, crew, rating, and notes in seconds.",
  },
  {
    title: "Gear-first tracking",
    description: "Boards, wetsuits, fins, and more - always tied to real sessions.",
  },
  {
    title: "History + filters",
    description: "Find any session fast by spot, gear, or buddies.",
  },
  {
    title: "Stats that matter",
    description: "Surf frequency, top breaks, and most-used gear at a glance.",
  },
  {
    title: "Premium minimalist design",
    description: "Black and white, subtle depth, and a modern interface.",
  },
  {
    title: "Private by default",
    description: "No accounts. No social features. Offline-first.",
  },
];

const whyPeakQuestions = [
  "Which board do I truly trust the most?",
  "Where have I been surfing the most this year?",
  "What gear did I ride on my best sessions?",
  "What patterns keep showing up - and what should I try next?",
];

function App() {
  return (
    <div className="site-bg relative min-h-screen overflow-hidden text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(transparent 31px, rgba(255,255,255,0.05) 32px), linear-gradient(90deg, transparent 31px, rgba(255,255,255,0.05) 32px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-white/10 blur-[160px]" />
      <div className="pointer-events-none absolute bottom-[-200px] left-[-120px] h-[520px] w-[520px] rounded-full bg-white/10 blur-[200px]" />

      <header className="relative z-10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
          <div className="flex items-center gap-4">
            <img src="/Transparent.png" alt="Peak logo" className="h-8 w-auto" />
            <div className="leading-tight">
              <p className="text-[11px] uppercase tracking-[0.35em] text-white/60">
                peak.surf - Peak
              </p>
              <p className="text-sm text-white/80">Premium surf journal for iOS</p>
            </div>
          </div>
          <a
            href="https://apps.apple.com/"
            className="hidden items-center rounded-full border border-white/40 px-5 py-2 text-sm uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white/10 md:flex"
          >
            Download
          </a>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-24 pt-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <p className="fade-up text-xs uppercase tracking-[0.3em] text-white/60">
              Your surf journal, refined.
            </p>
            <h1 className="fade-up fade-delay-1 font-display text-4xl leading-tight md:text-6xl">
              Track your surf journey - with a premium feel.
            </h1>
            <p className="fade-up fade-delay-2 text-lg text-white/70">
              Peak is a private surf-session log designed for surfers who care about progression
              and patterns. From the board you grabbed to the break you keep coming back to, Peak
              turns your sessions into a clear story you will actually want to revisit.
            </p>
            <p className="fade-up fade-delay-2 text-sm uppercase tracking-[0.32em] text-white/50">
              Black. White. Clean. Modern.
            </p>
            <p className="fade-up fade-delay-2 text-sm text-white/60">
              Make surfing more engaging by seeing what you are really doing over time.
            </p>
            <div className="fade-up fade-delay-3 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://apps.apple.com/"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:bg-white/90"
              >
                Download Peak
              </a>
              <a
                href="https://apps.apple.com/"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white/10"
              >
                Log your next session
              </a>
            </div>
            <div className="fade-up fade-delay-4 flex flex-wrap gap-3 text-xs uppercase tracking-[0.2em] text-white/60">
              <span className="rounded-full border border-white/20 px-4 py-2">
                Private by default
              </span>
              <span className="rounded-full border border-white/20 px-4 py-2">Offline-first</span>
              <span className="rounded-full border border-white/20 px-4 py-2">No social noise</span>
            </div>
          </div>

          <div className="fade-up fade-delay-2 relative">
            <div className="rounded-[32px] border border-white/15 bg-white/5 p-6 shadow-[0_35px_120px_rgba(0,0,0,0.55)]">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
                <span>Peak</span>
                <span>6:32 AM</span>
              </div>
              <div className="mt-8 space-y-5">
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-sm text-white/70">Ocean Beach</p>
                  <p className="font-display text-2xl">Clean, 3-4 ft</p>
                  <p className="mt-2 text-xs text-white/50">Twin fin - 7:05 AM</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-sm text-white/70">Bolinas</p>
                  <p className="font-display text-2xl">Glassy, 2 ft</p>
                  <p className="mt-2 text-xs text-white/50">Log - 6:12 AM</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-sm text-white/70">Pacifica</p>
                  <p className="font-display text-2xl">Moody, 4-5 ft</p>
                  <p className="mt-2 text-xs text-white/50">Step-up - 5:58 AM</p>
                </div>
              </div>
              <div className="mt-8 rounded-full border border-white/20 px-4 py-3 text-center text-xs uppercase tracking-[0.3em] text-white/70">
                Designed to feel premium
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="grid gap-10 rounded-[36px] border border-white/10 bg-black/60 p-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Short statement</p>
              <h2 className="font-display text-3xl md:text-4xl">
                A minimal, high-end surf journal built to make tracking effortless and genuinely
                fun.
              </h2>
              <p className="text-white/70">
                Peak (peak.surf) is a fast, premium surf journal that makes it easy to track your
                sessions, your gear, and your favorite breaks - so you can surf more intentionally
                and enjoy the journey. No noise. No social pressure. Just a clean record of your
                surfing - on your device.
              </p>
            </div>
            <div className="space-y-5">
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-white/50">Peak insight</p>
                <p className="mt-3 text-lg text-white/80">
                  Track the sessions. Build the story. Surf with intention.
                </p>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-white/50">Premium focus</p>
                <p className="mt-3 text-lg text-white/80">
                  A luxury-feeling surf log that stays out of your way.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Feature highlights</p>
              <h2 className="font-display text-3xl md:text-4xl">Everything that matters. Nothing else.</h2>
            </div>
            <p className="hidden max-w-sm text-sm text-white/60 lg:block">
              Peak is designed to feel like a luxury tool - modern, quiet, and purposeful.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featureHighlights.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/30 hover:bg-white/10"
              >
                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Built for clarity</p>
              <h2 className="font-display text-3xl md:text-4xl">Built for surfers who want clarity.</h2>
              <p className="text-white/70">
                Peak is for the surfer who wants to understand the sessions that made them better.
                No feeds. No noise. Just insight.
              </p>
              <div className="space-y-3">
                {whyPeakQuestions.map((question) => (
                  <div
                    key={question}
                    className="rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white/80"
                  >
                    {question}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold">Log sessions in seconds</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70 marker:text-white/30">
                  <li>Date and break (spot)</li>
                  <li>Gear used - boards, wetsuits, fins, leash</li>
                  <li>Who you surfed with</li>
                  <li>Star rating + optional notes</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold">Your gear, tracked like it should be</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70 marker:text-white/30">
                  <li>See which boards you actually use most</li>
                  <li>Track wetsuits and fins by season</li>
                  <li>Remember what worked at each break</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold">See your surfing patterns clearly</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70 marker:text-white/30">
                  <li>Surf frequency over time</li>
                  <li>Top breaks, top gear, repeat patterns</li>
                  <li>Filters by spot, gear, or buddies</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <h3 className="text-lg font-semibold">Private by default</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70 marker:text-white/30">
                  <li>No accounts required</li>
                  <li>No social features or public feeds</li>
                  <li>Offline-first, on your device</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="grid gap-10 rounded-[36px] border border-white/10 bg-white/[0.03] p-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Designed to feel premium</p>
              <h2 className="font-display text-3xl md:text-4xl">
                Minimal, modern, luxurious - a surf journal you will keep for years.
              </h2>
              <p className="text-white/70">
                Peak is intentionally minimal: black, white, and subtle grey accents. Clean
                typography, quiet depth, and a modern interface that stays out of the way.
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-black/50 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-white/50">Technology that respects the session</p>
                <p className="mt-3 text-sm text-white/70">
                  You surf first. Peak quietly keeps the record.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-black/50 p-5">
                <p className="text-sm uppercase tracking-[0.3em] text-white/50">Private by default</p>
                <p className="mt-3 text-sm text-white/70">
                  Peak is personal. Your sessions are yours. No accounts. No social pressure.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-28">
          <div className="rounded-[40px] border border-white/15 bg-white/5 p-12 text-center">
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">Download Peak</p>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">
              Download Peak and log your next session.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Turn sessions into a story worth keeping. Peak is the easiest way to document your
              surf life - and make it more fun to keep going.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://apps.apple.com/"
                className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-black transition hover:bg-white/90"
              >
                Download on the App Store
              </a>
              <a
                href="mailto:hello@peak.surf"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-3 text-sm uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white/10"
              >
                Contact Peak
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs uppercase tracking-[0.3em] text-white/40 md:flex-row">
          <span>Peak Surf Journal</span>
          <span>Private surf log for iOS</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
