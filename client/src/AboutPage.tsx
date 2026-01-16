const timeline = [
  {
    year: "2022",
    detail: "started as a senior project at cal poly san luis obispo.",
  },
  {
    year: "2025",
    detail: "became a web app.",
  },
  {
    year: "2026",
    detail: "released the ios app.",
  },
];

const projectImages = [
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584748/Frame_9_yra6b9.webp",
    alt: "senior project board.",
    label: "senior project (2022)",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584748/Frame_8_npiaty.webp",
    alt: "initial backend architecture diagram 01.",
    label: "backend architecture",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584746/Frame_7_owtjqy.webp",
    alt: "initial backend architecture diagram 02.",
    label: "backend architecture",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584754/Frame_13_jkc6yo.webp",
    alt: "early logo explorations.",
    label: "early logo concepts",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584750/Frame_6_x212si.webp",
    alt: "early ui and ux concept 01.",
    label: "early ui + ux concepts",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584750/Frame_5_drfacf.webp",
    alt: "early ui and ux concept 02.",
    label: "early ui + ux concepts",
  },
];

function AboutPage() {
  return (
    <div className="site-bg relative min-h-screen overflow-hidden text-white">
      <header className="relative z-10">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
          <div className="flex items-center gap-4">
            <img src="/Transparent.png" alt="peak logo" className="h-8 w-auto" />
            <div className="leading-tight">
              <p className="text-[11px] tracking-[0.35em] text-white/60">
                peak
              </p>
              <p className="text-sm text-white/80">premium surf journal</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/"
              className="font-lower text-[11px] text-white/60 transition hover:text-white"
            >
              home
            </a>
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
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-12">
          <div className="max-w-3xl">
            <p className="font-lower text-[11px] text-white/50">
              about peak
            </p>
            <h1 className="mt-4 font-hero text-4xl leading-tight md:text-5xl">
              a senior project turned surf journal.
            </h1>
            <p className="mt-6 text-sm text-white/70">
              peak started in 2022 as a senior project at cal poly san luis obispo.
              enzo created it and spent his last two years at cal poly refining the work.
            </p>
            <p className="mt-4 text-sm text-white/70">
              while working at apple, he partnered with a program manager, product marketing
              managers, and product designers to elevate the peak app design and concept.
            </p>
            <p className="mt-4 text-sm text-white/70">
              it became a web app in 2025, released the ios app in 2026, and we are excited for the
              future of peak.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-20">
          <div className="rounded-[32px] border border-white/15 bg-white/5 p-8 md:p-10">
            <p className="font-lower text-[11px] text-white/50">
              timeline
            </p>
            <div className="mt-6 grid gap-4 text-sm text-white/70 md:grid-cols-3">
              {timeline.map((item) => (
                <div
                  key={item.year}
                  className="rounded-2xl border border-white/10 bg-black/40 p-4"
                >
                  <p className="text-white/50">{item.year}</p>
                  <p className="mt-3 text-white/80">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <p className="font-lower text-[11px] text-white/50">
            project archive
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projectImages.map((image) => (
              <div key={image.src} className="group">
                <div className="relative overflow-hidden rounded-[24px] border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                  <div className="aspect-[4/3] w-full">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
                <p className="font-lower mt-3 text-[11px] text-white/50">
                  {image.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-28">
          <div className="rounded-[36px] border border-white/15 bg-white/5 p-10 text-center">
            <h2 className="font-hero text-3xl md:text-4xl">
              excited for the future of peak.
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

export default AboutPage;
