import { Button } from "@/components/ui/button";
import AppleLogo from "@/components/AppleLogo";
import AppStoreLink from "@/components/AppStoreLink";
import { SiteFooter, SiteHeader, SkipLink } from "@/components/SiteChrome";
import { hrefFor } from "@/seo/routes";

const suggestions = [
  { href: hrefFor("home"), label: "Home", detail: "What Peak is and how it works" },
  { href: hrefFor("features"), label: "Features", detail: "Everything the app does" },
  { href: hrefFor("faq"), label: "FAQ", detail: "Price, privacy, Apple Watch, and more" },
  { href: hrefFor("support"), label: "Support", detail: "Email a real person" },
];

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink />
      <SiteHeader
        cta={
          <AppStoreLink location="not_found_header">
            <AppleLogo className="text-base" />
            download
          </AppStoreLink>
        }
        mobileCta={
          <AppStoreLink location="not_found_mobile_menu">
            <AppleLogo className="text-base" />
            download
          </AppStoreLink>
        }
      />

      <main id="main-content" tabIndex={-1} className="mx-auto w-full max-w-6xl px-6 pb-28 pt-12">
        <p className="font-lower text-[11px] uppercase tracking-[0.18em] text-muted-foreground">404</p>
        <h1 className="mt-4 font-hero text-4xl leading-tight md:text-5xl">This wave already broke.</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
          The page you are looking for does not exist or has moved. Try one of
          these instead.
        </p>
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {suggestions.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block rounded-2xl border border-border/60 bg-card/40 p-6 transition hover:border-foreground/50"
              >
                <span className="text-base font-medium text-foreground">{item.label}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{item.detail}</span>
              </a>
            </li>
          ))}
        </ul>
        <Button asChild size="lg" className="font-cta mt-10 rounded-full px-8 text-[13px]">
          <AppStoreLink location="not_found_cta">
            <AppleLogo className="text-base" />
            download Peak
          </AppStoreLink>
        </Button>
      </main>

      <SiteFooter />
    </div>
  );
}

export default NotFoundPage;
