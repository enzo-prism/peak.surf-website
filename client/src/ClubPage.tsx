import { useState, type FormEvent } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const weeklyLoop = [
  "spot drops midweek (members-only)",
  "rsvp required (sessions are capped)",
  "paddle out together",
  "coffee + food after every time",
];

const steps = [
  {
    title: "apply",
    description: "tell us who you are, how you surf, and when you're usually free.",
  },
  {
    title: "trial paddle-out (invite)",
    description: "if it looks like a fit, we'll invite you to join a paddle-out.",
  },
  {
    title: "join the roster",
    description: "if the vibe and safety are right both ways, you're in.",
  },
  {
    title: "unlock the schedule",
    description: "accepted members get the weekly lineup + post-surf spot.",
  },
];

const sessionTypes = [
  "social paddle — beginner-friendly, mellow conditions",
  "crew paddle — intermediate+, higher tempo",
  "peak session — small group, best conditions (invite-only)",
];

const requirements = [
  "cohort age: 18-30 (phase 1)",
  "location: bay area-based",
  "skill level: all levels welcome (session types keep it safe)",
  "trust: referral or a public profile link or an intro video link",
];

const benefits = [
  "a crew that actually shows up",
  "members-only schedule + capped sessions",
  "post-surf coffee every week",
  "discover breaks + food/coffee without blowing up spots",
  "partner perks from selected surf vendors",
  "optional: numbered peak club patch",
];

const code = [
  "respect the lineup. no egos.",
  "be on time. rsvp honestly.",
  "surf safe. look out for each other.",
  "no filming or photos without consent.",
  "protect spots. don't broadcast locations.",
];

const scheduleTeaser = [
  "weekly drop + rsvp",
  "exact location shared with members",
  "members-only lineup",
];

const successHighlights = [
  {
    title: "review window",
    detail: "applications are reviewed weekly.",
  },
  {
    title: "invite",
    detail: "if it feels like a fit, you'll get a paddle-out invite.",
  },
  {
    title: "next steps",
    detail: "keep an eye on your email for the follow-up.",
  },
];

const pillClasses =
  "inline-flex items-center rounded-full border border-border/60 bg-background px-3 py-1.5 text-[11px] text-muted-foreground transition hover:border-foreground/70 hover:text-foreground peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background";

function ClubPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [submissionState, setSubmissionState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const isSubmitting = submissionState === "submitting";
  const isSuccess = submissionState === "success";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submissionState === "submitting") {
      return;
    }

    setSubmissionState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mqeeeeyz", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSubmissionState("success");
        form.reset();
        return;
      }

      const data = await response.json().catch(() => null);
      const message =
        data?.errors?.map((error: { message: string }) => error.message).join(", ") ??
        "something went wrong. please try again.";
      setErrorMessage(message);
      setSubmissionState("error");
    } catch (error) {
      setErrorMessage("something went wrong. please try again.");
      setSubmissionState("error");
    }
  };

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
        <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-12">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="font-lower border-border/60 text-[11px] text-muted-foreground"
            >
              peak club
            </Badge>
            <Separator className="flex-1 w-auto bg-border/60" />
          </div>
          <div className="mt-6 max-w-2xl space-y-4">
            <h1 className="font-hero text-4xl leading-tight md:text-5xl">bay area surf club.</h1>
            <p className="text-sm text-muted-foreground">cohort 01: ages 18-30.</p>
            <p className="text-sm text-muted-foreground">weekly paddle-outs + post-surf coffee.</p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>small roster. capped sessions.</p>
              <p>members-only schedule.</p>
              <p>application required.</p>
            </div>
            <Button asChild size="lg" className="font-cta rounded-full px-7 text-[13px]">
              <a href="#apply">apply</a>
            </Button>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="font-lower border-border/60 text-[11px] text-muted-foreground"
            >
              what it is
            </Badge>
            <Separator className="flex-1 w-auto bg-border/60" />
          </div>
          <Card className="mt-6 border-border/60 bg-card/40">
            <CardContent className="space-y-4 p-8 text-sm text-muted-foreground">
              <p>peak is private online.</p>
              <p>peak club is social in real life.</p>
              <p>
                a consistent crew that paddles out every week, then grabs coffee and food after.
                make peak moments in the water. keep them in your archive.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="font-lower border-border/60 text-[11px] text-muted-foreground"
            >
              the weekly loop
            </Badge>
            <Separator className="flex-1 w-auto bg-border/60" />
          </div>
          <Card className="mt-6 border-border/60 bg-card/40">
            <CardContent className="p-8">
              <ul className="space-y-2 text-sm text-muted-foreground">
                {weeklyLoop.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16">
          <div className="flex items-center gap-3">
            <Badge
              variant="outline"
              className="font-lower border-border/60 text-[11px] text-muted-foreground"
            >
              how it works
            </Badge>
            <Separator className="flex-1 w-auto bg-border/60" />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {steps.map((step, index) => (
              <Card key={step.title} className="border-border/60 bg-card/40">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-base font-semibold">
                    {index + 1}) {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-sm text-muted-foreground">
                  {step.description}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16">
          <div className="grid gap-4 lg:grid-cols-3">
            <Card className="border-border/60 bg-card/40">
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-semibold">session types</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {sessionTypes.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card/40">
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-semibold">membership requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {requirements.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-muted-foreground">
                  not 18-30? join the waitlist for future cohorts.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card/40">
              <CardHeader className="space-y-2">
                <CardTitle className="text-xl font-semibold">member benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {benefits.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16">
          <Card className="border-border/60 bg-card/40">
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl font-semibold">the code</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {code.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16">
          <Card className="border-border/60 bg-card/40">
            <CardHeader className="space-y-2">
              <CardTitle className="text-xl font-semibold">members-only schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {scheduleTeaser.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        <section id="apply" className="mx-auto w-full max-w-6xl px-6 pb-24">
          <Card className="border-border/60 bg-card/40">
            <CardHeader className="space-y-2">
              <CardTitle className="font-hero text-2xl md:text-3xl">
                {isSuccess ? "application received." : "apply"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/30 px-6 py-8 md:px-10">
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_60%)]" />
                  <div className="relative space-y-6">
                    <Badge
                      variant="outline"
                      className="font-lower border-border/60 text-[11px] text-muted-foreground"
                    >
                      application sent
                    </Badge>
                    <div className="space-y-3">
                      <h3 className="font-hero text-3xl leading-tight md:text-4xl">
                        you're on the review list.
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        we read every submission. if it's a fit, we'll reach out with a
                        paddle-out invite.
                      </p>
                    </div>
                    <div className="grid gap-3 md:grid-cols-3">
                      {successHighlights.map((item) => (
                        <div
                          key={item.title}
                          className="rounded-2xl border border-border/60 bg-card/40 p-4"
                        >
                          <p className="font-lower text-[11px] text-muted-foreground">
                            {item.title}
                          </p>
                          <p className="mt-2 text-sm text-foreground/90">{item.detail}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        asChild
                        size="sm"
                        className="font-cta rounded-full px-5 text-[12px]"
                      >
                        <a href="https://apps.apple.com/us/app/peak-surf/id6757644027">
                          <span aria-hidden="true" className="text-base leading-none">
                            
                          </span>
                          download
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="ghost"
                        size="sm"
                        className="font-cta rounded-full px-5 text-[12px] text-muted-foreground hover:text-foreground"
                      >
                        <a href="/">back home</a>
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">
                    applications reviewed weekly. if it's a fit, we'll reach out with an
                    invite.
                  </p>
                  <form
                    action="https://formspree.io/f/mqeeeeyz"
                    method="POST"
                    onSubmit={handleSubmit}
                    className="mt-6 grid gap-4"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="grid gap-2 text-xs text-muted-foreground">
                        your name
                        <Input name="name" type="text" placeholder="full name" required />
                      </label>
                      <label className="grid gap-2 text-xs text-muted-foreground">
                        your email
                        <Input name="email" type="email" placeholder="you@email.com" required />
                      </label>
                      <fieldset className="grid gap-2 text-xs text-muted-foreground">
                        <legend>availability</legend>
                        <div className="flex flex-wrap gap-2">
                          <label className="cursor-pointer">
                            <input
                              name="availability"
                              type="radio"
                              value="weekdays early"
                              className="peer sr-only"
                              required
                            />
                            <span className={pillClasses}>weekdays early</span>
                          </label>
                          <label className="cursor-pointer">
                            <input
                              name="availability"
                              type="radio"
                              value="weekends"
                              className="peer sr-only"
                            />
                            <span className={pillClasses}>weekends</span>
                          </label>
                          <label className="cursor-pointer">
                            <input
                              name="availability"
                              type="radio"
                              value="flexible"
                              className="peer sr-only"
                            />
                            <span className={pillClasses}>flexible</span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="grid gap-2 text-xs text-muted-foreground">
                        <legend>transport</legend>
                        <div className="flex flex-wrap gap-2">
                          <label className="cursor-pointer">
                            <input
                              name="transport"
                              type="radio"
                              value="car"
                              className="peer sr-only"
                              required
                            />
                            <span className={pillClasses}>car</span>
                          </label>
                          <label className="cursor-pointer">
                            <input
                              name="transport"
                              type="radio"
                              value="can carpool"
                              className="peer sr-only"
                            />
                            <span className={pillClasses}>can carpool</span>
                          </label>
                          <label className="cursor-pointer">
                            <input
                              name="transport"
                              type="radio"
                              value="need carpool"
                              className="peer sr-only"
                            />
                            <span className={pillClasses}>need carpool</span>
                          </label>
                        </div>
                      </fieldset>
                      <fieldset className="grid gap-2 text-xs text-muted-foreground">
                        <legend>surf level</legend>
                        <div className="flex flex-wrap gap-2">
                          <label className="cursor-pointer">
                            <input
                              name="skill"
                              type="radio"
                              value="beginner"
                              className="peer sr-only"
                              required
                            />
                            <span className={pillClasses}>beginner</span>
                          </label>
                          <label className="cursor-pointer">
                            <input
                              name="skill"
                              type="radio"
                              value="intermediate"
                              className="peer sr-only"
                            />
                            <span className={pillClasses}>intermediate</span>
                          </label>
                          <label className="cursor-pointer">
                            <input
                              name="skill"
                              type="radio"
                              value="advanced"
                              className="peer sr-only"
                            />
                            <span className={pillClasses}>advanced</span>
                          </label>
                        </div>
                      </fieldset>
                      <label className="grid gap-2 text-xs text-muted-foreground">
                        where do you usually surf
                        <Input name="spots" type="text" placeholder="favorite breaks" />
                      </label>
                      <label className="grid gap-2 text-xs text-muted-foreground md:col-span-2">
                        <span className="inline-flex items-center gap-2">
                          referral / profile (for trust + safety)
                          <button
                            type="button"
                            aria-label="trust and safety details"
                            className="group relative inline-flex h-4 w-4 items-center justify-center rounded-full border border-border/70 text-[10px] text-muted-foreground/80"
                          >
                            ?
                            <span className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 w-48 -translate-x-1/2 rounded-lg border border-border/70 bg-background px-3 py-2 text-[11px] text-muted-foreground opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                              submit one of: referral name (best), public profile link, or
                              intro video link.
                            </span>
                          </button>
                        </span>
                        <Input
                          name="trust"
                          type="text"
                          placeholder="instagram link / referral name / intro video link"
                        />
                      </label>
                    </div>
                    <label className="grid gap-2 text-xs text-muted-foreground">
                      message
                      <Textarea
                        name="message"
                        placeholder="tell us about your surfing and why you want to join"
                        rows={4}
                      />
                    </label>
                    <p className="text-xs text-muted-foreground">
                      we use this only to review membership. no spam. no public member list.
                    </p>
                    {submissionState === "error" ? (
                      <p className="text-xs text-destructive" role="alert">
                        {errorMessage}
                      </p>
                    ) : null}
                    <Button
                      type="submit"
                      size="lg"
                      className="font-cta rounded-full px-7 text-[13px]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "sending..." : "send application"}
                    </Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-muted-foreground md:flex-row font-lower">
          <span>peak surf journal</span>
          <span>bay area surf club</span>
        </div>
      </footer>
    </div>
  );
}

export default ClubPage;
