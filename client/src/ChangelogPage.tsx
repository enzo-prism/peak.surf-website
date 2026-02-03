import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const repoUrl = "https://github.com/enzo-prism/peak-ios";
const commitsApiUrl =
  "https://api.github.com/repos/enzo-prism/peak-ios/commits?sha=main&per_page=20";

type CommitEntry = {
  sha: string;
  shortSha: string;
  message: string;
  author: string;
  date: string | null;
  htmlUrl: string;
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
          const message = (item?.commit?.message ?? "").split("\n")[0]?.trim();
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
                variant="ghost"
                size="sm"
                className="font-lower text-[11px] text-muted-foreground hover:text-foreground"
              >
                <a href="/changelog.html">changelog</a>
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
                variant="ghost"
                size="sm"
                className="w-full justify-start font-lower text-[11px] text-muted-foreground hover:text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                <a href="/changelog.html">changelog</a>
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
              changelog
            </Badge>
            <Separator className="flex-1 w-auto bg-border/60" />
          </div>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <h1 className="font-hero text-4xl leading-tight md:text-5xl">
                product updates from the peak iOS build.
              </h1>
              <p className="text-sm text-muted-foreground">
                Latest 20 commits to main. straight from GitHub.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="font-cta rounded-full border-border/60 bg-transparent px-5 text-[13px] text-foreground hover:bg-accent/20"
            >
              <a href={repoUrl} target="_blank" rel="noreferrer">
                view on GitHub
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
                  className="border-border/60 bg-card/40 shadow-[0_25px_70px_rgba(0,0,0,0.45)]"
                >
                  <CardHeader className="space-y-2">
                    <CardTitle className="text-lg md:text-xl">
                      {commit.message}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {commit.author} · {formatDateTime(commit.date)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full border border-border/60 px-3 py-1 font-lower text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                      {commit.shortSha || "unknown"}
                    </span>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="font-lower text-[11px] text-muted-foreground hover:text-foreground"
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
    </div>
  );
}

export default ChangelogPage;
