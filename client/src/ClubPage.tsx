import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const steps = [
  {
    title: "apply",
    description: "tell us who you are and how you surf.",
  },
  {
    title: "get invited",
    description: "if there's a fit, we'll invite you to a paddle-out.",
  },
  {
    title: "unlock the schedule",
    description: "accepted members get the weekly lineup and post-surf spot.",
  },
];

const requirements = [
  "age: 18-30 (phase 1)",
  "location: bay area-based",
  "skill level: all levels welcome (beginner-friendly + advanced sessions)",
  "trust: link a public social profile or get referred by a current member",
];

const benefits = [
  "meet likeminded friends who actually show up",
  "weekly paddle-outs (members-only schedule)",
  "make peak moments with new people",
  "discover surf breaks that can handle a crew",
  "post-surf food + coffee",
  "discounted gear from selected surf vendors",
];

const code = [
  "respect the lineup. no egos.",
  "surf safe. look out for each other.",
  "leave no trace.",
  "no filming or photos of others without consent.",
  "protect spots. don't broadcast locations.",
];

function ClubPage() {
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
              variant="outline"
              size="sm"
              className="font-cta hidden rounded-full border-border/60 bg-transparent px-5 text-[13px] text-foreground hover:bg-accent/20 md:inline-flex"
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
            <p className="text-sm text-muted-foreground">
              ages 18-30. weekly paddle-outs + post-surf coffee.
            </p>
            <p className="text-sm text-muted-foreground">small roster. application required.</p>
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
              what is peak club
            </Badge>
            <Separator className="flex-1 w-auto bg-border/60" />
          </div>
          <Card className="mt-6 border-border/60 bg-card/40">
            <CardContent className="space-y-4 p-8 text-sm text-muted-foreground">
              <p>peak started as a private surf journal.</p>
              <p>
                peak club is the real-world extension: a tight crew that paddles out together
                every week and makes new peak moments in the water.
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
              how it works
            </Badge>
            <Separator className="flex-1 w-auto bg-border/60" />
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <Card key={step.title} className="border-border/60 bg-card/40">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-base font-semibold">
                    {index + 1}) {step.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground">
                    {step.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16">
          <div className="grid gap-4 lg:grid-cols-3">
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
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16">
          <Card className="border-border/60 bg-card/40">
            <CardContent className="flex flex-col items-start gap-4 p-8">
              <h2 className="font-hero text-2xl md:text-3xl">ready?</h2>
              <p className="text-sm text-muted-foreground">applications are reviewed weekly.</p>
              <Button asChild size="lg" className="font-cta rounded-full px-7 text-[13px]">
                <a href="#apply">apply</a>
              </Button>
            </CardContent>
          </Card>
        </section>

        <section id="apply" className="mx-auto w-full max-w-6xl px-6 pb-24">
          <Card className="border-border/60 bg-card/40">
            <CardHeader className="space-y-2">
              <CardTitle className="font-hero text-2xl md:text-3xl">apply</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                tell us who you are and how you surf.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                action="https://formspree.io/f/mqeeeeyz"
                method="POST"
                className="grid gap-4"
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
                  <label className="grid gap-2 text-xs text-muted-foreground">
                    age
                    <Input name="age" type="number" min="18" max="30" placeholder="age" />
                  </label>
                  <label className="grid gap-2 text-xs text-muted-foreground">
                    location
                    <Input name="location" type="text" placeholder="city, bay area" />
                  </label>
                  <label className="grid gap-2 text-xs text-muted-foreground">
                    surf level
                    <Input name="skill" type="text" placeholder="beginner, intermediate, advanced" />
                  </label>
                  <label className="grid gap-2 text-xs text-muted-foreground">
                    social profile or referral
                    <Input name="social" type="text" placeholder="instagram or referrer" />
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
                <Button type="submit" size="lg" className="font-cta rounded-full px-7 text-[13px]">
                  send application
                </Button>
              </form>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs tracking-[0.3em] text-muted-foreground md:flex-row">
          <span>peak surf journal</span>
          <span>bay area surf club</span>
        </div>
      </footer>
    </div>
  );
}

export default ClubPage;
