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

const surfImages = [
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584781/Frame_32_cdeoif.webp",
    alt: "peak surf moment 01.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584768/Frame_33_o5mkjw.webp",
    alt: "peak surf moment 02.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584769/Frame_30_odkhgc.webp",
    alt: "peak surf moment 03.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584764/Frame_24_xcrbqs.webp",
    alt: "peak surf moment 04.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584763/Frame_23_qdstji.webp",
    alt: "peak surf moment 05.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584769/Frame_35_i84kyr.webp",
    alt: "peak surf moment 06.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584760/Frame_22_lbggtk.webp",
    alt: "peak surf moment 07.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584778/Frame_21_gx3iuk.webp",
    alt: "peak surf moment 08.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584781/Frame_29_e4ubgv.webp",
    alt: "peak surf moment 09.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584781/leo_gbp9hq.webp",
    alt: "peak surf moment 10.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584745/19_b7fuua.webp",
    alt: "peak surf moment 11.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584740/12_qfuufg.webp",
    alt: "peak surf moment 12.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584740/8_yamfyn.webp",
    alt: "peak surf moment 13.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584758/Frame_19_cicx3k.webp",
    alt: "peak surf moment 14.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584753/Frame_11_qvaxax.webp",
    alt: "peak surf moment 15.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584756/Frame_17_ukxuze.webp",
    alt: "peak surf moment 16.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584751/Frame_10_fcbska.webp",
    alt: "peak surf moment 17.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584753/Frame_12_jkhsml.webp",
    alt: "peak surf moment 18.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584747/Frame_2_vk8ayo.webp",
    alt: "peak surf moment 19.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584740/11_l67hgt.webp",
    alt: "peak surf moment 20.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584746/20_pt42c8.webp",
    alt: "peak surf moment 21.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584772/shell-1_l9hapk.webp",
    alt: "peak surf moment 22.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584772/shell_sd7dbt.webp",
    alt: "peak surf moment 23.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584736/7_s1ae08.webp",
    alt: "peak surf moment 24.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584736/10_skckcc.webp",
    alt: "peak surf moment 25.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584740/15_a7buiv.webp",
    alt: "peak surf moment 26.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584735/5_fudb5f.webp",
    alt: "peak surf moment 27.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584743/18_u88lc4.webp",
    alt: "peak surf moment 28.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584768/Frame_31_mrbbxd.webp",
    alt: "peak surf moment 29.",
  },
  {
    src: "https://res.cloudinary.com/dhqpqfw6w/image/upload/v1768584764/Frame_28_wazsce.webp",
    alt: "peak surf moment 30.",
  },
];

const heroImages = surfImages.slice(0, 3);
const heroPrimary = heroImages[0];
const heroStack = heroImages.slice(1);
const ribbonImages = surfImages.slice(3, 12);
const galleryImages = surfImages.slice(12);
const galleryPrimary = galleryImages[0];
const gallerySecondary = galleryImages.slice(1);

function App() {
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
              <p className="text-sm text-white/80">premium surf journal for ios</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="/about.html"
              className="font-lower text-[11px] text-white/60 transition hover:text-white"
            >
              about
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
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="group relative overflow-hidden rounded-[32px] border border-white/15 bg-white/5 shadow-[0_35px_120px_rgba(0,0,0,0.55)] sm:col-span-2">
                <div className="aspect-[5/6] w-full">
                  <img
                    src={heroPrimary.src}
                    alt={heroPrimary.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    loading="eager"
                    decoding="async"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>
              {heroStack.map((image) => (
                <div
                  key={image.src}
                  className="group relative overflow-hidden rounded-[28px] border border-white/15 bg-white/5 shadow-[0_25px_70px_rgba(0,0,0,0.45)]"
                >
                  <div className="aspect-[4/5] w-full">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-hero text-3xl md:text-4xl">capture peak moments</h2>
            </div>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ribbonImages.map((image) => (
              <div
                key={image.src}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_25px_70px_rgba(0,0,0,0.45)]"
              >
                <div className="aspect-[3/4] w-full">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            ))}
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

        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="group relative overflow-hidden rounded-[36px] border border-white/15 bg-white/5 shadow-[0_35px_120px_rgba(0,0,0,0.55)]">
              <div className="aspect-[4/5] w-full">
                <img
                  src={galleryPrimary.src}
                  alt={galleryPrimary.alt}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="font-lower text-[11px] text-white/60">
                  peak archive
                </p>
                <h3 className="mt-3 font-hero text-2xl md:text-3xl">life in motion</h3>
                <p className="mt-3 text-sm text-white/70">
                  the water moves fast. the memories do not have to.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {gallerySecondary.map((image) => (
                <div
                  key={image.src}
                  className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/5 shadow-[0_25px_70px_rgba(0,0,0,0.45)]"
                >
                  <div className="aspect-[4/5] w-full">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
              ))}
            </div>
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
