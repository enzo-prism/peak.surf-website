import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AppleLogo from "@/components/AppleLogo";
import AppStoreLink from "@/components/AppStoreLink";
import { SiteFooter, SiteHeader, SkipLink } from "@/components/SiteChrome";
import { appleWatchMetrics, appleWatchPrinciples, appleWatchSteps } from "@/content/appleWatch";
import { hrefFor } from "@/seo/routes";
import { MIN_IOS } from "@/site";

function AppleWatchPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink />
      <SiteHeader
        current="appleWatch"
        cta={
          <AppStoreLink location="apple_watch_header">
            <AppleLogo className="text-base" />
            download
          </AppStoreLink>
        }
        mobileCta={
          <AppStoreLink location="apple_watch_mobile_menu">
            <AppleLogo className="text-base" />
            download
          </AppStoreLink>
        }
      />

      <main id="main-content" tabIndex={-1}>
        <article>
          <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-12">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="font-lower border-border/60 text-[11px] text-muted-foreground">
                apple watch surf tracking
              </Badge>
              <Separator className="w-auto flex-1 bg-border/60" />
            </div>

            <div className="mt-6 max-w-3xl">
              <h1 className="font-hero text-4xl leading-tight md:text-5xl">
                Track surfing with Apple Watch. Keep the log private.
              </h1>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                Peak turns the surfing workouts your Apple Watch saves to Apple
                Health into a full surf log. From each workout's GPS route, Peak
                estimates your wave count, top speed, longest ride, and paddle
                distance on your iPhone, and you can edit every number.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                You need an iPhone running iOS {MIN_IOS} or later. Peak runs on
                iPhone and reads your workouts from Apple Health, so it does not
                need a separate Watch app.
              </p>
            </div>
          </section>

          <section
            aria-labelledby="estimates-title"
            className="mx-auto w-full max-w-6xl px-6 pb-16"
          >
            <h2 id="estimates-title" className="font-hero text-2xl md:text-3xl">
              What Peak estimates from a surf workout
            </h2>
            <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-2 lg:grid-cols-4">
              {appleWatchMetrics.map((metric) => (
                <div key={metric.label} className="bg-background p-6">
                  <dt className="text-base font-medium text-foreground">{metric.label}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{metric.detail}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="steps-title" className="mx-auto w-full max-w-6xl px-6 pb-16">
            <h2 id="steps-title" className="font-hero text-2xl md:text-3xl">
              How to log an Apple Watch surf in Peak
            </h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {appleWatchSteps.map((step, index) => (
                <li key={step.title} className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8">
                  <p className="font-lower text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    step {index + 1}
                  </p>
                  <h3 className="mt-3 text-lg font-medium text-foreground">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="principles-title" className="mx-auto w-full max-w-6xl px-6 pb-16">
            <div className="max-w-3xl">
              <h2 id="principles-title" className="font-hero text-2xl md:text-3xl">
                The numbers help. You get the final word.
              </h2>
              <ul className="mt-6 space-y-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                {appleWatchPrinciples.map((principle) => (
                  <li key={principle} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" />
                    <span>{principle}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                Peak can also save the sessions you log as surfing workouts in
                Apple Health. See the{" "}
                <a className="text-foreground underline underline-offset-4" href={hrefFor("privacy")}>
                  privacy policy
                </a>{" "}
                for exactly what Peak reads and writes, or the{" "}
                <a className="text-foreground underline underline-offset-4" href={`${hrefFor("faq")}#apple-watch`}>
                  Apple Watch FAQ
                </a>
                .
              </p>
            </div>
          </section>
        </article>

        <section className="mx-auto w-full max-w-6xl px-6 pb-28">
          <Card className="border-border/60 bg-card/40">
            <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-2xl">
                <h2 className="font-hero text-2xl md:text-3xl">Bring your Watch surfs into one logbook.</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Peak is free, has no account, and keeps your surf history on
                  your iPhone.{" "}
                  <a className="text-foreground underline underline-offset-4" href={hrefFor("features")}>
                    See every feature
                  </a>
                  .
                </p>
              </div>
              <Button asChild size="lg" className="font-cta shrink-0 rounded-full px-8 text-[13px]">
                <AppStoreLink location="apple_watch_footer_cta">
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

export default AppleWatchPage;
