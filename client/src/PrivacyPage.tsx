import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AppleLogo from "@/components/AppleLogo";
import AppStoreLink from "@/components/AppStoreLink";
import { MobileDownloadBar } from "@/components/MobileDownloadBar";
import { SiteFooter, SiteHeader, SkipLink } from "@/components/SiteChrome";
import { SUPPORT_EMAIL } from "@/site";

const supportEmail = SUPPORT_EMAIL;

const privacySections = [
  {
    title: "on-device data",
    body: (
      <p>
        Peak stores sessions, spots, gear, buddies, photos, videos, and settings
        locally using on-device storage. That data stays on your device unless you
        export a backup, share a session card, or choose an optional feature below.
      </p>
    ),
  },
  {
    title: "auto-fill conditions",
    body: (
      <>
        <p>
          Auto-fill Conditions sends only the session time window and the surf
          break&apos;s pinned coordinates to the public Open-Meteo marine and
          weather APIs over HTTPS.
        </p>
        <p>
          It runs only when you choose it. Peak does not send your name, notes,
          gear, buddies, photos, or other identifiers.
        </p>
      </>
    ),
  },
  {
    title: "location",
    body: (
      <p>
        Location is optional. If you use your location or pin a spot on the map,
        Peak uses it only to place that pin and enable conditions auto-fill for
        it. You can always log a name-only spot.
      </p>
    ),
  },
  {
    title: "Apple Health",
    body: (
      <>
        <p>
          If you enable Apple Health on iPhone, Peak can save logged surf sessions
          as surfing workouts. It can also read Apple Watch surf workouts, heart
          rate, and active calories to enrich sessions or offer import.
        </p>
        <p>
          Access is controlled by iOS and can be revoked in Settings. Peak does
          not upload Health data to a Peak server. There is no Peak server.
        </p>
      </>
    ),
  },
  {
    title: "photos and videos",
    body: (
      <p>
        Media you add with the system photo picker stays on your device unless
        you export a full backup or share a session yourself.
      </p>
    ),
  },
  {
    title: "backup and export",
    body: (
      <p>
        JSON, CSV, and .peakbackup exports are created by you and saved or shared
        by you. Peak does not transmit them automatically.
      </p>
    ),
  },
  {
    title: "this website",
    body: (
      <>
        <p>
          The Peak app and this marketing website are separate. The app does not
          use analytics or tracking SDKs. This website uses anonymous, cookieless
          Vercel Web Analytics to understand aggregate page visits and App Store
          clicks. Analytics events do not include your journal data or other
          personal details.
        </p>
        <p>
          Website pages use system fonts and may request images from
          Cloudinary and public changelog data from GitHub. Those services
          receive standard web request information, but this website cannot
          access your Peak journal, Apple Health data, or saved media.
        </p>
      </>
    ),
  },
];

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink />
      <SiteHeader
        current="privacy"
        cta={
          <AppStoreLink location="privacy_header">
            <AppleLogo className="text-base" />
            download
          </AppStoreLink>
        }
        mobileCta={
          <AppStoreLink location="privacy_mobile_menu">
            <AppleLogo className="text-base" />
            download
          </AppStoreLink>
        }
      />

      <main id="main-content" tabIndex={-1}>
        <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-12">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-lower border-border/60 text-xs text-muted-foreground">
              privacy
            </Badge>
            <Separator className="w-auto flex-1 bg-border/60" />
          </div>

          <div className="mt-6 max-w-3xl">
            <h1 className="font-hero text-4xl leading-tight md:text-5xl">
              your surf history stays yours.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Peak is private by default. Your surf sessions live on your device.
              We do not require accounts, and the Peak app does not use analytics
              or tracking SDKs.
            </p>
            <p className="mt-4 font-lower text-xs uppercase tracking-[0.18em] text-muted-foreground">
              last updated August 30, 2026
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-20" aria-label="Privacy details">
          <div className="grid gap-4 md:grid-cols-2">
            {privacySections.map((section) => (
              <Card key={section.title} className="border-border/60 bg-card/40">
                <CardHeader>
                  <h2 className="font-semibold leading-none tracking-tight font-hero text-xl">{section.title}</h2>
                </CardHeader>
                <CardContent className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                  {section.body}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-28">
          <Card className="border-border/60 bg-card/40">
            <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-2xl">
                <h2 className="font-hero text-2xl md:text-3xl">questions about your data?</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  If you email support, we use the device details or screenshots
                  you choose to share only to respond. Policy changes will appear
                  here and in the app.
                </p>
              </div>
              <Button asChild size="lg" className="font-cta shrink-0 rounded-full px-8 text-[13px]">
                <a href={`mailto:${supportEmail}`}>email support</a>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <SiteFooter />
      <MobileDownloadBar link={<AppStoreLink location="privacy_sticky_bar" />} />
    </div>
  );
}

export default PrivacyPage;
