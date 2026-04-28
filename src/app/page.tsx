import Link from "next/link";
import { Button } from "@/components/ui/button";
import { appConfig } from "@/lib/config";
import {
  ArrowRight,
  BarChart3,
  Brain,
  Target,
  TrendingUp,
  Shield,
  CheckCircle,
} from "lucide-react";

function RadarChart() {
  const dimensions = [
    { name: "Strategy", angle: -90, score: 0.82 },
    { name: "Data", angle: -30, score: 0.65 },
    { name: "Talent", angle: 30, score: 0.48 },
    { name: "Operations", angle: 90, score: 0.72 },
    { name: "Governance", angle: 150, score: 0.55 },
    { name: "Culture", angle: 210, score: 0.68 },
  ];
  const cx = 150, cy = 150, maxR = 100;
  const levels = [0.25, 0.5, 0.75, 1.0];

  function polarToCart(angleDeg: number, radius: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  return (
    <svg viewBox="0 0 300 300" className="w-full max-w-xs mx-auto">
      {/* Grid rings */}
      {levels.map((l) => (
        <polygon
          key={l}
          points={dimensions.map((d) => {
            const p = polarToCart(d.angle, maxR * l);
            return `${p.x},${p.y}`;
          }).join(" ")}
          fill="none"
          stroke="#e0e0f0"
          strokeWidth="0.5"
          opacity={0.5}
        />
      ))}
      {/* Axes */}
      {dimensions.map((d) => {
        const end = polarToCart(d.angle, maxR);
        return <line key={d.name} x1={cx} y1={cy} x2={end.x} y2={end.y} stroke="#e0e0f0" strokeWidth="0.5" opacity={0.4} />;
      })}
      {/* Data polygon */}
      <polygon
        points={dimensions.map((d) => {
          const p = polarToCart(d.angle, maxR * d.score);
          return `${p.x},${p.y}`;
        }).join(" ")}
        fill="#4338ca"
        fillOpacity={0.15}
        stroke="#4338ca"
        strokeWidth="2"
      />
      {/* Data points */}
      {dimensions.map((d) => {
        const p = polarToCart(d.angle, maxR * d.score);
        return <circle key={d.name} cx={p.x} cy={p.y} r="4" fill="#4338ca" />;
      })}
      {/* Labels */}
      {dimensions.map((d) => {
        const p = polarToCart(d.angle, maxR + 22);
        return (
          <text key={d.name} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" className="text-[10px] fill-gray-500 font-medium">
            {d.name}
          </text>
        );
      })}
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900">
      {/* Nav */}
      <header className="border-b border-gray-100">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#4338ca] text-white text-sm font-bold">
              A
            </div>
            <span className="font-semibold text-lg text-gray-900">AIVI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-500 hover:text-gray-900">Sign in</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[#4338ca] hover:bg-[#3730a3] text-white">Get started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-1.5 text-sm text-[#4338ca] font-medium">
          <Shield className="h-3.5 w-3.5" />
          Enterprise AI Competitiveness Platform
        </div>
        <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
          How AI-competitive is your enterprise?
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-gray-500">
          AIVI helps enterprise leaders measure, benchmark, and improve their
          organization&apos;s AI readiness across 6 critical dimensions.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/signup">
            <Button size="lg" className="bg-[#4338ca] hover:bg-[#3730a3] text-white px-8 h-12">
              Take the free diagnostic
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline" className="border-gray-200 text-gray-600 hover:border-[#4338ca] hover:text-[#4338ca] h-12">
              Sign in
            </Button>
          </Link>
        </div>
        {/* Radar preview */}
        <div className="mt-16 w-full max-w-sm mx-auto">
          <RadarChart />
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-center text-3xl font-bold text-gray-900">How it works</h2>
          <p className="text-center mt-3 text-gray-500 max-w-xl mx-auto">From diagnostic to transformation in three steps.</p>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {[
              { step: "1", title: "Assess", desc: "Answer 30 questions across 6 dimensions. Strategy, Data, Talent, Operations, Governance, and Culture. Complete in under 15 minutes." },
              { step: "2", title: "Score", desc: "Get your AI Competitiveness Radar with color-coded maturity levels. See exactly where you stand from Beginner to Leader." },
              { step: "3", title: "Transform", desc: "Receive a prioritized 30/60/90-day transformation roadmap tailored to your weakest dimensions with high-impact recommendations." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#4338ca] text-white text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-bold text-gray-900">Everything you need to compete</h2>
          <p className="text-center mt-3 text-gray-500 max-w-2xl mx-auto">
            A structured approach to understanding and improving your enterprise AI capabilities.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Brain, title: "AI Competitiveness Radar", desc: "Visual scorecard across 6 dimensions with maturity levels from Beginner to Leader." },
              { icon: TrendingUp, title: "Transformation Roadmap", desc: "Prioritized 30/60/90-day action plan tailored to your weakest dimensions." },
              { icon: BarChart3, title: "Operating Model Scorecard", desc: "Track progress across assessments over time with detailed breakdowns." },
              { icon: Target, title: "Industry Benchmarks", desc: "See where you stand relative to industry averages and identify competitive gaps." },
            ].map((feature) => (
              <div key={feature.title} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
                  <feature.icon className="h-5 w-5 text-[#4338ca]" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col items-center text-center gap-6">
            <div className="flex items-center gap-2 text-[#4338ca]">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium tracking-wide uppercase">Trusted by enterprises</span>
            </div>
            <p className="text-2xl font-semibold text-gray-900">Used by enterprises across 6 industries</p>
            <div className="flex gap-8 mt-4 text-sm text-gray-400 font-medium tracking-wide">
              <span>Financial Services</span>
              <span>Healthcare</span>
              <span>Manufacturing</span>
              <span>Retail</span>
              <span>Technology</span>
              <span>Energy</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900">Ready to assess your AI competitiveness?</h2>
          <p className="mt-4 text-lg text-gray-500">Get your enterprise AI scorecard in under 15 minutes.</p>
          <Link href="/signup" className="mt-8 inline-block">
            <Button size="lg" className="bg-[#4338ca] hover:bg-[#3730a3] text-white px-8 h-12">
              Start Free Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 text-sm text-gray-400">
          <span>&copy; {new Date().getFullYear()} AIVI. All rights reserved.</span>
          <span>A 12 Cities venture</span>
        </div>
      </footer>
    </div>
  );
}
