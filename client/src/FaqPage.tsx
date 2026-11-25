import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AppleLogo from "@/components/AppleLogo";
import AppStoreLink from "@/components/AppStoreLink";
import { AppStoreBadge } from "@/components/AppStoreBadge";
import { MobileDownloadBar } from "@/components/MobileDownloadBar";
import { SiteFooter, SiteHeader, SkipLink } from "@/components/SiteChrome";
import { faqGroups } from "@/content/faq";
import { SUPPORT_EMAIL } from "@/site";

function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink />
      <SiteHeader
        current="faq"
        cta={
          <AppStoreLink location="faq_header">
            <AppleLogo className="text-base" />
            download
          </AppStoreLink>
        }
        mobileCta={
          <AppStoreLink location="faq_mobile_menu">
            <AppleLogo className="text-base" />
            download
          </AppStoreLink>
        }
      />

      <main id="main-content" tabIndex={-1}>
        <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-12">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="font-lower border-border/60 text-xs text-muted-foreground">
              faq
            </Badge>
            <Separator className="w-auto flex-1 bg-border/60" />
          </div>

          <div className="mt-6 max-w-3xl">
            <h1 className="font-hero text-4xl leading-tight md:text-5xl">
              Questions about Peak, answered.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Peak is a free, private surf journal for iPhone. Here is what it
              costs, what it needs, where your data lives, and how it works with
              Apple Watch.
            </p>
          </div>

          <nav aria-label="FAQ topics" className="mt-10">
            <ul className="flex flex-wrap gap-2">
              {faqGroups.map((group) => (
                <li key={group.title}>
                  <a
                    href={`#${slug(group.title)}`}
                    className="inline-flex min-h-11 items-center rounded-full border border-border/60 px-4 text-sm transition active:bg-white/10 text-muted-foreground transition hover:border-foreground/60 hover:text-foreground"
                  >
                    {group.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </section>

        <div className="mx-auto w-full max-w-6xl space-y-16 px-6 pb-20">
          {faqGroups.map((group) => (
            <section
              key={group.title}
              id={slug(group.title)}
              aria-labelledby={`${slug(group.title)}-title`}
            >
              <h2
                id={`${slug(group.title)}-title`}
                className="font-hero text-2xl md:text-3xl"
              >
                {group.title}
              </h2>
              <div className="mt-6 divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/60">
                {group.items.map((item) => (
                  <article key={item.id} id={item.id} className="bg-card/40 p-6 md:p-8">
                    <h3 className="text-lg font-medium text-foreground">
                      <a href={`#${item.id}`} className="-my-2 block py-2 hover:underline hover:underline-offset-4">
                        {item.question}
                      </a>
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
                      {item.answer}
                    </p>
                    {item.link && (
                      <a
                        href={item.link.href}
                        className="mt-4 inline-flex min-h-11 items-center text-sm text-foreground underline-offset-4 hover:underline"
                      >
                        {item.link.label} <span aria-hidden="true" className="ml-1">→</span>
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="mx-auto w-full max-w-6xl px-6 pb-28">
          <Card className="border-border/60 bg-card/40">
            <CardContent className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-2xl">
                <h2 className="font-hero text-2xl md:text-3xl">Still have a question?</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Email{" "}
                  <a className="break-words text-foreground underline underline-offset-4" href={`mailto:${SUPPORT_EMAIL}`}>
                    {SUPPORT_EMAIL}
                  </a>{" "}
                  and a real person will reply. Or download Peak and try it, it is free.
                </p>
              </div>
              <AppStoreLink location="faq_footer_cta" data-download-cta className="app-badge-link shrink-0">
                <AppStoreBadge />
              </AppStoreLink>
            </CardContent>
          </Card>
        </section>
      </main>

      <SiteFooter />
      <MobileDownloadBar link={<AppStoreLink location="faq_sticky_bar" />} />
    </div>
  );
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default FaqPage;
