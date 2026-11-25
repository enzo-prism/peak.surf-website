import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AppleLogo from "@/components/AppleLogo";
import AppStoreLink from "@/components/AppStoreLink";
import { SiteFooter, SiteHeader, SkipLink } from "@/components/SiteChrome";
import { SUPPORT_EMAIL } from "@/site";

const supportEmail = SUPPORT_EMAIL;

function SupportPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink />
      <SiteHeader
        current="support"
        cta={
          <AppStoreLink location="support_header">
            <AppleLogo className="text-base" />
            download
          </AppStoreLink>
        }
        mobileCta={
          <AppStoreLink location="support_mobile_menu">
            <AppleLogo className="text-base" />
            download
          </AppStoreLink>
        }
      />

      <main id="main-content" tabIndex={-1}>
        <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-12">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-lower border-border/60 text-[11px] text-muted-foreground">
              support
            </Badge>
            <Separator className="w-auto flex-1 bg-border/60" />
          </div>

          <div className="mt-6 max-w-3xl">
            <h1 className="font-hero text-4xl leading-tight md:text-5xl">
              help with Peak, from a real person.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Need help or want to share feedback? Send us an email and include
              the details below so we can respond quickly.
            </p>
            {/*
              The button base class is whitespace-nowrap, and the full address is
              wider than a 320px viewport can hold. Allow the label to wrap and
              keep the address on its own line so the pill stays inside the page.
            */}
            <Button
              asChild
              size="lg"
              className="font-cta mt-8 h-auto min-h-11 whitespace-normal rounded-3xl px-5 py-3 text-[13px] sm:rounded-full sm:px-8"
            >
              <a href={`mailto:${supportEmail}`} className="text-center">
                <span className="block sm:inline">email</span>
                <span className="block break-words sm:inline sm:ps-1">
                  {supportEmail}
                </span>
              </a>
            </Button>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-4 px-6 pb-28 md:grid-cols-2">
          <Card className="border-border/60 bg-card/40">
            <CardHeader>
              <p className="font-lower text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                for any issue
              </p>
              <h2 className="font-semibold leading-none tracking-tight font-hero text-2xl">include these details</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {["App version", "iOS version", "Device model", "Steps to reproduce the issue"].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-border/60 bg-card/40">
            <CardHeader>
              <p className="font-lower text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                auto-fill conditions
              </p>
              <h2 className="font-semibold leading-none tracking-tight font-hero text-2xl">add this context</h2>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {[
                  "Session date, time, and duration",
                  "Surf break name",
                  "Whether the surf break has a pinned location",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

export default SupportPage;
