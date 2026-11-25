import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AppleLogo from "@/components/AppleLogo";
import AppStoreLink from "@/components/AppStoreLink";
import { MobileDownloadBar } from "@/components/MobileDownloadBar";
import { SiteFooter, SiteHeader, SkipLink } from "@/components/SiteChrome";
import { releases } from "@/content/releases";
import { APP_FIRST_RELEASED, formatLongDate } from "@/site";

const repoUrl = "https://github.com/enzo-prism/peak-ios";
const commitsApiUrl =
  "https://api.github.com/repos/enzo-prism/peak-ios/commits?sha=main&per_page=20";

type CommitEntry = {
  sha: string;
  shortSha: string;
  message: string;
  details: string;
  author: string;
  date: string | null;
  htmlUrl: string;
};

const commitTrailerPattern =
  /^(co-authored-by|signed-off-by|reviewed-by|tested-by|changelog:|change-id:|refs:|relates-to:|fixes:|closes:|reviewed-on:|pull-request:)/i;
const maxDetailsLength = 180;

const formatCommitDetails = (rawMessage: string) => {
  if (!rawMessage) {
    return "";
  }

  const normalized = rawMessage.replace(/\r\n/g, "\n").trim();
  const lines = normalized.split("\n");
  lines.shift();

  const body = lines.join("\n").trim();
  if (!body) {
    return "";
  }

  const paragraphs = body
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  for (const paragraph of paragraphs) {
    const cleaned = paragraph
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((line) => !commitTrailerPattern.test(line))
      .join(" ");

    if (cleaned) {
      return cleaned.length > maxDetailsLength
        ? `${cleaned.slice(0, maxDetailsLength - 1).trimEnd()}…`
        : cleaned;
    }
  }

  return "";
};

const formatDateTime = (dateString: string | null) => {
  if (!dateString) {
    return "Date unavailable";
  }

  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) {
    return "Date unavailable";
  }

  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return `${datePart} · ${timePart}`;
};

function ChangelogPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [commits, setCommits] = useState<CommitEntry[]>([]);

  useEffect(() => {
    let isMounted = true;

    const loadCommits = async () => {
      try {
        const response = await fetch(commitsApiUrl, {
          headers: {
            Accept: "application/vnd.github+json",
          },
        });

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = (await response.json()) as Array<Record<string, any>>;
        if (!Array.isArray(data)) {
          throw new Error("Unexpected response format");
        }

        const mapped = data.map((item) => {
          const rawMessage = (item?.commit?.message ?? "").trim();
          const message = rawMessage.split("\n")[0]?.trim();
          const details = formatCommitDetails(rawMessage);
          const author =
            item?.commit?.author?.name ??
            item?.commit?.committer?.name ??
            "Unknown";
          const date =
            item?.commit?.author?.date ??
            item?.commit?.committer?.date ??
            null;
          const sha = item?.sha ?? "";
          const shortSha = sha ? sha.slice(0, 7) : "";

          return {
            sha,
            shortSha,
            message: message || "Update",
            details,
            author,
            date,
            htmlUrl: item?.html_url ?? repoUrl,
          } satisfies CommitEntry;
        });

        if (isMounted) {
          setCommits(mapped);
          setStatus("success");
        }
      } catch (error) {
        if (isMounted) {
          setStatus("error");
        }
      }
    };

    loadCommits();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SkipLink />
      <SiteHeader
        current="changelog"
        cta={
          <AppStoreLink location="changelog_header">
            <AppleLogo className="text-base" />
            download
          </AppStoreLink>
        }
        mobileCta={
          <AppStoreLink location="changelog_mobile_menu">
            <AppleLogo className="text-base" />
            download
          </AppStoreLink>
        }
      />

      <main id="main-content" tabIndex={-1} className="relative">
        <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-12">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="font-lower border-border/60 text-xs text-muted-foreground"
            >
              changelog
            </Badge>
            <Separator className="flex-1 w-auto bg-border/60" />
          </div>
          <div className="mt-6 max-w-3xl">
            <h1 className="font-hero text-4xl leading-tight md:text-5xl">
              What's new in Peak.
            </h1>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Release notes for every Peak version on the App Store, followed by
              a live, transparent log of what we are building next.
            </p>
          </div>
        </section>

        <section aria-labelledby="release-notes-title" className="mx-auto w-full max-w-6xl px-6 pb-16">
          <h2 id="release-notes-title" className="font-hero text-2xl md:text-3xl">
            Release notes
          </h2>
          <div className="mt-6 space-y-4">
            {releases.map((release) => (
              <article
                key={release.version}
                id={`peak-${release.version.replace(/\./g, "-")}`}
                className="rounded-2xl border border-border/60 bg-card/40 p-6 md:p-8"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="text-xl font-semibold text-foreground md:text-2xl">
                    Peak {release.version}
                  </h3>
                  <p className="font-lower text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    released <time dateTime={release.released}>{formatLongDate(release.released)}</time>
                  </p>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {release.summary}
                </p>
                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  {release.sections.map((section) => (
                    <div key={section.title}>
                      <h4 className="text-sm font-medium text-foreground">{section.title}</h4>
                      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                        {section.items.map((item) => (
                          <li key={item} className="flex gap-3">
                            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/60" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Peak first launched on the App Store on{" "}
            <time dateTime={APP_FIRST_RELEASED}>{formatLongDate(APP_FIRST_RELEASED)}</time>.
          </p>
        </section>

        <section aria-labelledby="development-log-title" className="mx-auto w-full max-w-6xl px-6 pb-28">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <h2 id="development-log-title" className="font-hero text-2xl md:text-3xl">
                Development log
              </h2>
              <p className="text-sm text-muted-foreground">
                Latest public commits to main. Items can include work still in
                testing and are not release notes.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="font-cta h-11 rounded-full border-border/60 bg-transparent px-5 text-[13px] text-foreground hover:bg-accent/20"
            >
              <a href={repoUrl} target="_blank" rel="noreferrer">
                <span className="inline-flex items-center gap-2">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5 text-foreground/70"
                    fill="currentColor"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                  </svg>
                  view on GitHub
                </span>
              </a>
            </Button>
          </div>

          <div className="mt-10 space-y-4">
            {status === "loading" && (
              <p className="text-sm text-muted-foreground">Loading latest updates…</p>
            )}
            {status === "error" && (
              <p className="text-sm text-muted-foreground">
                Unable to load updates. Try again in a bit.
              </p>
            )}
            {status === "success" && commits.length === 0 && (
              <p className="text-sm text-muted-foreground">No updates yet.</p>
            )}
            {status === "success" &&
              commits.map((commit) => (
                <Card
                  key={commit.sha}
                  className="border-border/60 bg-card/40"
                >
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-lg md:text-xl">
                      {commit.message}
                    </CardTitle>
                    {commit.details && (
                      <p className="text-sm leading-relaxed text-muted-foreground/90">
                        {commit.details}
                      </p>
                    )}
                    <CardDescription className="text-sm text-muted-foreground">
                      {commit.author} · {formatDateTime(commit.date)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full border border-border/60 px-3 py-1 font-lower text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {commit.shortSha || "unknown"}
                    </span>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="font-lower h-11 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <a href={commit.htmlUrl} target="_blank" rel="noreferrer">
                        view commit
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
          </div>
        </section>
      </main>

      <SiteFooter />
      <MobileDownloadBar link={<AppStoreLink location="changelog_sticky_bar" />} />
    </div>
  );
}

export default ChangelogPage;
