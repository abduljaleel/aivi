import Link from "next/link";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/config";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle,
  Target,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav */}
      <header className="border-b">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              {appConfig.name.charAt(0)}
            </div>
            <span className="font-semibold text-lg">{appConfig.name}</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button>Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground">
          <Shield className="h-3.5 w-3.5" />
          Enterprise AI Competitiveness Platform
        </div>
        <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          How AI-competitive is your enterprise?
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Take the diagnostic. Get your scorecard. Build your roadmap.
        </p>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          AIVI helps enterprise leaders measure, benchmark, and improve their
          organization&apos;s AI readiness across 6 critical dimensions.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/signup">
            <Button size="lg">
              Start Your Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              Sign in
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/50">
        <div className="mx-auto max-w-6xl px-4 py-24">
          <div className="text-center">
            <h2 className="text-3xl font-bold">
              From diagnostic to transformation
            </h2>
            <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
              A structured approach to understanding and improving your
              enterprise AI capabilities.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Brain,
                title: "AI Competitiveness Diagnostic",
                desc: "30 questions across 6 dimensions. Strategy, Data, Talent, Operations, Governance, and Culture. Complete in under 15 minutes.",
              },
              {
                icon: TrendingUp,
                title: "Transformation Roadmap",
                desc: "Prioritized 30/60/90-day action plan tailored to your weakest dimensions. High-impact, practical recommendations.",
              },
              {
                icon: BarChart3,
                title: "Operating Model Scorecard",
                desc: "Color-coded maturity levels from Beginner to Leader. Track progress across assessments over time.",
              },
              {
                icon: Target,
                title: "Industry Benchmarks",
                desc: "See where you stand relative to industry averages. Identify competitive gaps and opportunities.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border bg-background p-6"
              >
                <feature.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dimensions */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="text-center">
          <h2 className="text-3xl font-bold">6 dimensions of AI readiness</h2>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            A comprehensive framework covering every facet of enterprise AI
            maturity.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              name: "Strategy",
              color: "#6366f1",
              desc: "AI integration into business strategy and competitive positioning",
            },
            {
              name: "Data",
              color: "#06b6d4",
              desc: "Data infrastructure, quality, and accessibility for AI workloads",
            },
            {
              name: "Talent",
              color: "#f59e0b",
              desc: "AI talent density, upskilling, and organizational capability",
            },
            {
              name: "Operations",
              color: "#10b981",
              desc: "AI embedded into workflows, MLOps, and production systems",
            },
            {
              name: "Governance",
              color: "#ef4444",
              desc: "AI governance frameworks, risk management, and compliance",
            },
            {
              name: "Culture",
              color: "#8b5cf6",
              desc: "Organizational receptivity to AI adoption and experimentation",
            },
          ].map((dim) => (
            <div key={dim.name} className="flex items-start gap-3 rounded-lg border p-4">
              <div
                className="mt-0.5 h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: dim.color }}
              />
              <div>
                <h3 className="font-semibold">{dim.name}</h3>
                <p className="text-sm text-muted-foreground">{dim.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/50">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center">
          <h2 className="text-3xl font-bold">
            Ready to assess your AI competitiveness?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get your enterprise AI scorecard in under 15 minutes.
          </p>
          <Link href="/signup" className="mt-8 inline-block">
            <Button size="lg">
              Start Free Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 text-sm text-muted-foreground">
          <span>
            &copy; {new Date().getFullYear()} {appConfig.name}. All rights
            reserved.
          </span>
          <span>A 12 Cities venture</span>
        </div>
      </footer>
    </div>
  );
}
