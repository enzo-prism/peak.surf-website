const featureHighlights = [
  {
    title: "log sessions fast",
    description: "spot, conditions, crew, rating, notes.",
  },
  {
    title: "track your gear",
    description: "boards, wetsuits, fins, and more.",
  },
  {
    title: "history + filters",
    description: "find any session in seconds.",
  },
  {
    title: "private by default",
    description: "offline-first. no accounts. no social.",
  },
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
            <img src="/Transparent.png" alt="peak logo" className="h-8 w-auto" />
            <div className="leading-tight">
              <p className="text-[11px] tracking-[0.35em] text-white/60">
                peak
              </p>
              <p className="text-sm text-white/80">premium surf journal for ios</p>
            </div>
          </div>
          <a
            href="https://apps.apple.com/us/app/peak-surf/id6757644027"
            className="font-cta hidden items-center gap-3 rounded-full border border-white/40 px-5 py-2 text-[13px] text-white transition hover:border-white hover:bg-white/10 md:flex"
          >
            <span aria-hidden="true" className="text-base leading-none">
              
            </span>
            download
          </a>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-24 pt-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <h1 className="fade-up fade-delay-1 font-hero text-4xl leading-tight md:text-6xl">
              track the session. keep the story.
            </h1>
            <p className="fade-up fade-delay-2 text-lg text-white/70">
              private surf log for sessions, gear, and breaks. offline on your iphone.
            </p>
            <div className="fade-up fade-delay-3 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://apps.apple.com/us/app/peak-surf/id6757644027"
                className="font-cta inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-3 text-[13px] text-black transition hover:bg-white/90"
              >
                <span aria-hidden="true" className="text-base leading-none">
                  
                </span>
                download on the app store
              </a>
            </div>
          </div>

          <div className="fade-up fade-delay-2 relative">
            <div className="rounded-[32px] border border-white/15 bg-white/5 p-6 shadow-[0_35px_120px_rgba(0,0,0,0.55)]">
              <div className="flex min-h-[240px] items-center justify-center">
                <img src="/Transparent.png" alt="peak logo" className="h-20 w-auto opacity-90" />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-hero text-3xl md:text-4xl">everything that matters.</h2>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
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

        <section className="mx-auto w-full max-w-6xl px-6 pb-28">
          <div className="rounded-[40px] border border-white/15 bg-white/5 p-12 text-center">
            <h2 className="mt-4 font-hero text-3xl md:text-4xl">
              download peak.
            </h2>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="https://apps.apple.com/us/app/peak-surf/id6757644027"
                className="font-cta inline-flex items-center justify-center gap-3 rounded-full bg-white px-8 py-3 text-[13px] text-black transition hover:bg-white/90"
              >
                <span aria-hidden="true" className="text-base leading-none">
                  
                </span>
                download app
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs tracking-[0.3em] text-white/40 md:flex-row">
          <span>peak surf journal</span>
          <span>private surf log for ios</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
