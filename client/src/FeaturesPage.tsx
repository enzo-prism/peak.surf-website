import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AppleLogo from "@/components/AppleLogo";
import AppStoreLink from "@/components/AppStoreLink";
import { SiteFooter, SiteHeader, SkipLink } from "@/components/SiteChrome";
import { featureGroups } from "@/content/features";
import { hrefFor } from "@/seo/routes";
import { APP_VERSION, MIN_IOS } from "@/site";

const quickFacts = [
  ["Price", "Free"],
  ["Platform", `iPhone, iOS ${MIN_IOS} or later`],
  ["Current version", `Peak ${APP_VERSION}`],
  ["Account", "None required"],
  ["Ads and tracking", "None"],
  ["Where data lives", "On your iPhone"],
];

function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink />
      <SiteHeader
        current="features"
        cta={
          <AppStoreLink location="features_header">
            <AppleLogo className="text-base" />
            download
          </AppStoreLink>
        }
        mobileCta={
          <AppStoreLink location="features_mobile_menu">
            <AppleLogo className="text-base" />
            download
          </AppStoreLink>
        }
      />

      <main id="main-content" tabIndex={-1}>
        <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-12">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-lower border-border/60 text-[11px] text-muted-foreground">
              features
            </Badge>
            <Separator className="w-auto flex-1 bg-border/60" />
          </div>

          <div className="mt-6 max-w-3xl">
            <h1 className="font-hero text-4xl leading-tight md:text-5xl">
              Everything Peak does, in one place.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Peak is a free surf log for iPhone. It records each session in a
              few taps, fills in the conditions, keeps your quiver organized,
              and turns your logbook into stats and a personal surf window,
              with no account and your data kept on your device.
            </p>
          </div>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-3">
            {quickFacts.map(([term, value]) => (
              <div key={term} className="bg-background p-5">
                <dt className="font-lower text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {term}
                </dt>
                <dd className="mt-2 text-base text-foreground">{value}</dd>
              </div>
            ))}
          </dl>

          <nav aria-label="Feature sections" className="mt-10">
            <ul className="flex flex-wrap gap-2">
              {featureGroups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.id}`}
                    className="inline-flex min-h-9 items-center rounded-full border border-border/60 px-4 text-xs text-muted-foreground transition hover:border-foreground/60 hover:text-foreground"
                  >
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-20" aria-label="Feature list">
          <div className="grid gap-4 md:grid-cols-2">
            {featureGroups.map((group) => (
              <Card key={group.id} id={group.id} className="scroll-mt-8 border-border/60 bg-card/40">
                <CardHeader>
                  <h2 className="font-hero text-2xl font-semibold leading-tight tracking-tight">
                    {group.title}
                  </h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{group.summary}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {group.link && (
                    <a
                      href={group.link.href}
                      className="mt-6 inline-flex min-h-11 items-center text-sm text-foreground underline-offset-4 hover:underline"
                    >
                      {group.link.label} <span aria-hidden="true" className="ml-1">→</span>
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-28">
          <Card className="border-border/60 bg-card/40">
            <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-2xl">
                <h2 className="font-hero text-2xl md:text-3xl">Start your surf log.</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Peak {APP_VERSION} is free on the App Store. Questions first?{" "}
                  <a className="text-foreground underline underline-offset-4" href={hrefFor("faq")}>
                    Read the FAQ
                  </a>
                  .
                </p>
              </div>
              <Button asChild size="lg" className="font-cta shrink-0 rounded-full px-8 text-[13px]">
                <AppStoreLink location="features_footer_cta">
                  <AppleLogo className="text-base" />
                  download Peak
                </AppStoreLink>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default FeaturesPage;
