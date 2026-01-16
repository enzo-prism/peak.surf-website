import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="relative">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
          <div className="flex items-center gap-4">
            <img src="/Transparent.png" alt="peak logo" className="h-8 w-auto" />
            <div className="leading-tight">
              <p className="font-lower text-[11px] tracking-[0.35em] text-muted-foreground">
                peak
              </p>
              <p className="text-sm text-muted-foreground">premium surf journal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="font-lower text-[11px] text-muted-foreground hover:text-foreground"
            >
              <a href="/about.html">about</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="font-cta hidden rounded-full border-border/60 bg-transparent px-5 text-[13px] text-foreground hover:bg-accent/20 md:inline-flex"
            >
              <a href="https://apps.apple.com/us/app/peak-surf/id6757644027">
                <span aria-hidden="true" className="text-base leading-none">
                  
                </span>
                download
              </a>
            </Button>
          </div>
        </div>
      </header>

      <main className="relative">
        <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-24 pt-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <h1 className="fade-up fade-delay-1 font-hero text-3xl leading-tight md:text-5xl">
              <span className="block">designed by surfers.</span>
              <span className="block">for surfers.</span>
            </h1>
            <p className="fade-up fade-delay-2 text-lg text-muted-foreground">
              private surf log for sessions, gear, and breaks. offline on your iphone.
            </p>
            <div className="fade-up fade-delay-3 flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="font-cta rounded-full px-7 text-[13px]"
              >
                <a href="https://apps.apple.com/us/app/peak-surf/id6757644027">
                  <span aria-hidden="true" className="text-base leading-none">
                    
                  </span>
                  download on the app store
                </a>
              </Button>
            </div>
          </div>

          <div className="fade-up fade-delay-2 relative">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card className="group relative overflow-hidden border-border/60 bg-card/40 shadow-[0_35px_120px_rgba(0,0,0,0.6)] sm:col-span-2">
                <AspectRatio ratio={5 / 6} className="w-full">
                  <img
                    src={heroPrimary.src}
                    alt={heroPrimary.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    loading="eager"
                    decoding="async"
                  />
                </AspectRatio>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </Card>
              {heroStack.map((image) => (
                <Card
                  key={image.src}
                  className="group relative overflow-hidden border-border/60 bg-card/40 shadow-[0_25px_70px_rgba(0,0,0,0.45)]"
                >
                  <AspectRatio ratio={4 / 5} className="w-full">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                      decoding="async"
                    />
                  </AspectRatio>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="font-lower border-border/60 text-[11px] text-muted-foreground"
            >
              gallery
            </Badge>
            <Separator className="flex-1 w-auto bg-border/60" />
          </div>
          <h2 className="mt-4 font-hero text-3xl md:text-4xl">capture peak moments</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ribbonImages.map((image) => (
              <Card
                key={image.src}
                className="group relative overflow-hidden border-border/60 bg-card/40 shadow-[0_25px_70px_rgba(0,0,0,0.45)]"
              >
                <AspectRatio ratio={3 / 4} className="w-full">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                </AspectRatio>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="font-lower border-border/60 text-[11px] text-muted-foreground"
            >
              features
            </Badge>
            <Separator className="flex-1 w-auto bg-border/60" />
          </div>
          <h2 className="mt-4 font-hero text-3xl md:text-4xl">everything that matters.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {featureHighlights.map((feature) => (
              <Card
                key={feature.title}
                className="border-border/60 bg-card/40 transition hover:bg-card/60"
              >
                <CardHeader className="space-y-2">
                  <CardTitle className="text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="font-lower border-border/60 text-[11px] text-muted-foreground"
            >
              peak archive
            </Badge>
            <Separator className="flex-1 w-auto bg-border/60" />
          </div>
          <h2 className="mt-4 font-hero text-3xl md:text-4xl">life in motion</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            the water moves fast. the memories do not have to.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {galleryImages.map((image) => (
              <Card
                key={image.src}
                className="group relative overflow-hidden border-border/60 bg-card/40 shadow-[0_25px_70px_rgba(0,0,0,0.45)]"
              >
                <AspectRatio ratio={4 / 5} className="w-full">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                    decoding="async"
                  />
                </AspectRatio>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-28">
          <Card className="border-border/60 bg-card/40">
            <CardContent className="flex flex-col items-center gap-6 p-10 text-center md:p-12">
              <h2 className="font-hero text-3xl md:text-4xl">download peak.</h2>
              <Button asChild size="lg" className="font-cta rounded-full px-8 text-[13px]">
                <a href="https://apps.apple.com/us/app/peak-surf/id6757644027">
                  <span aria-hidden="true" className="text-base leading-none">
                    
                  </span>
                  download app
                </a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs tracking-[0.3em] text-muted-foreground md:flex-row">
          <span>peak surf journal</span>
          <span>private surf log for ios</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
