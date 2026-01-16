import { useState } from "react";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="relative">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
          <div className="flex items-center gap-4">
            <img
              src="/Transparent.png"
              alt="peak logo"
              className="h-8 w-auto transition-opacity hover:opacity-80"
            />
            <div className="leading-tight">
              <p className="font-lower text-[11px] tracking-[0.35em] text-muted-foreground">
                peak
              </p>
              <p className="text-sm text-muted-foreground">premium surf journal</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 md:flex">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="font-lower text-[11px] text-muted-foreground hover:text-foreground"
              >
                <a href="/">home</a>
              </Button>
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
                variant="ghost"
                size="sm"
                className="font-lower text-[11px] text-muted-foreground hover:text-foreground"
              >
                <a href="/club.html">club</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="font-cta rounded-full border-border/60 bg-transparent px-5 text-[13px] text-foreground hover:bg-accent/20"
              >
                <a href="https://apps.apple.com/us/app/peak-surf/id6757644027">
                  <span aria-hidden="true" className="text-base leading-none">
                    
                  </span>
                  download
                </a>
              </Button>
            </div>
            <button
              type="button"
              aria-label="toggle navigation"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex items-center justify-center rounded-full border border-border/60 p-2 text-muted-foreground transition hover:border-foreground/70 hover:text-foreground md:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <span className="absolute left-0 top-0 h-0.5 w-full bg-current" />
                <span className="absolute left-0 top-1.5 h-0.5 w-full bg-current" />
                <span className="absolute left-0 top-3 h-0.5 w-full bg-current" />
              </span>
            </button>
          </div>
        </div>
        <div id="mobile-nav" className={isMenuOpen ? "md:hidden" : "hidden md:hidden"}>
          <div className="mx-auto w-full max-w-6xl px-6 pb-6">
            <div className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-background/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="w-full justify-start font-lower text-[11px] text-muted-foreground hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                <a href="/">home</a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="w-full justify-start font-lower text-[11px] text-muted-foreground hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                <a href="/about.html">about</a>
              </Button>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="w-full justify-start font-lower text-[11px] text-muted-foreground hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                <a href="/club.html">club</a>
              </Button>
              <Button
                asChild
                size="sm"
                className="font-cta w-full justify-center rounded-full px-5 text-[13px]"
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
        </div>
      </header>

      <main className="relative">
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-12">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="font-lower border-border/60 text-[11px] text-muted-foreground"
            >
              about peak
            </Badge>
            <Separator className="flex-1 w-auto bg-border/60" />
          </div>
          <div className="mt-6 max-w-3xl">
            <h1 className="font-hero text-4xl leading-tight md:text-5xl">
              a senior project turned surf journal.
            </h1>
            <p className="mt-6 text-sm text-muted-foreground">
              peak started in 2022 as a senior project at cal poly san luis obispo.
              enzo created it and spent his last two years at cal poly refining the work.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              while working at apple, he partnered with a program manager, product marketing
              managers, and product designers to elevate the peak app design and concept.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              it became a web app in 2025, released the ios app in 2026, and we are excited for the
              future of peak.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-20">
          <Card className="border-border/60 bg-card/40">
            <CardHeader className="space-y-2">
              <CardTitle className="font-hero text-2xl md:text-3xl">timeline</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {timeline.map((item) => (
                <Card key={item.year} className="border-border/60 bg-background/40">
                  <CardHeader className="space-y-2 p-4">
                    <CardTitle className="text-base font-semibold text-foreground">
                      {item.year}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {item.detail}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-24">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="font-lower border-border/60 text-[11px] text-muted-foreground"
            >
              project archive
            </Badge>
            <Separator className="flex-1 w-auto bg-border/60" />
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projectImages.map((image) => (
              <Card
                key={image.src}
                className="group overflow-hidden border-border/60 bg-card/40 shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
                <CardContent className="p-4">
                  <p className="font-lower text-[11px] text-muted-foreground">
                    {image.label}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-28">
          <Card className="border-border/60 bg-card/40">
            <CardContent className="flex flex-col items-center gap-6 p-10 text-center md:p-12">
              <h2 className="font-hero text-3xl md:text-4xl">
                excited for the future of peak.
              </h2>
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
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-muted-foreground md:flex-row">
          <span>peak surf journal</span>
          <span>premium surf log for ios</span>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;
