

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AppleLogo from "@/components/AppleLogo";
import AppStoreLink from "@/components/AppStoreLink";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { MobileDownloadBar } from "@/components/MobileDownloadBar";
import { SiteFooter, SiteHeader, SkipLink } from "@/components/SiteChrome";

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
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink />
      <SiteHeader
        current="about"
        cta={
          <AppStoreLink location="about_header">
            <AppleLogo className="text-base" />
            download
          </AppStoreLink>
        }
        mobileCta={
          <AppStoreLink location="about_mobile_menu">
            <AppleLogo className="text-base" />
            download
          </AppStoreLink>
        }
      />

      <main id="main-content" tabIndex={-1} className="relative">
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-12">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="font-lower border-border/60 text-xs text-muted-foreground"
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
              <h2 className="font-hero text-2xl font-semibold leading-none tracking-tight md:text-3xl">timeline</h2>
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
              className="font-lower border-border/60 text-xs text-muted-foreground"
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
                  <p className="font-lower text-xs text-muted-foreground">
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
              <AppStoreLink location="about_footer_cta" data-download-cta className="app-badge-link ">
                <AppStoreBadge />
              </AppStoreLink>
            </CardContent>
          </Card>
        </section>
      </main>

      <SiteFooter />
      <MobileDownloadBar link={<AppStoreLink location="about_sticky_bar" />} />
    </div>
  );
}

export default AboutPage;
