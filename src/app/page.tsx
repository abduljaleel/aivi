"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/* ─────────────────────────────────────────────────────────────────
   Intersection Observer hook
───────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─────────────────────────────────────────────────────────────────
   Radar Chart SVG — animated pulsing hero visual
───────────────────────────────────────────────────────────────── */
function RadarChart() {
  const dimensions = [
    { name: "Strategy", angle: -90, score: 0.72 },
    { name: "Data", angle: -30, score: 0.45 },
    { name: "Talent", angle: 30, score: 0.38 },
    { name: "Operations", angle: 90, score: 0.61 },
    { name: "Governance", angle: 150, score: 0.55 },
    { name: "Culture", angle: 210, score: 0.49 },
  ];
  const cx = 200, cy = 200, maxR = 140;
  const levels = [0.25, 0.5, 0.75, 1.0];

  function polar(angleDeg: number, radius: number) {
    const rad = (angleDeg * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  const dataPoints = dimensions.map((d) => polar(d.angle, maxR * d.score));
  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <svg viewBox="0 0 400 400" className="w-full h-full">
      <style>{`
        @keyframes radar-pulse {
          0%, 100% { opacity: 0.12; transform-origin: 200px 200px; transform: scale(1); }
          50% { opacity: 0.20; transform-origin: 200px 200px; transform: scale(1.03); }
        }
        .radar-fill { animation: radar-pulse 3s ease-in-out infinite; }
        @keyframes radar-dot {
          0%, 100% { r: 4; }
          50% { r: 6; }
        }
        .radar-dot { animation: radar-dot 3s ease-in-out infinite; }
      `}</style>

      {/* Grid rings */}
      {levels.map((l) => (
        <polygon
          key={l}
          points={dimensions
            .map((d) => { const p = polar(d.angle, maxR * l); return `${p.x},${p.y}`; })
            .join(" ")}
          fill="none"
          stroke="#4338ca"
          strokeWidth="0.5"
          opacity={0.12}
        />
      ))}

      {/* Axes */}
      {dimensions.map((d) => {
        const end = polar(d.angle, maxR);
        return (
          <line
            key={d.name}
            x1={cx} y1={cy} x2={end.x} y2={end.y}
            stroke="#4338ca"
            strokeWidth="0.5"
            opacity={0.1}
          />
        );
      })}

      {/* Data polygon — pulsing */}
      <polygon
        points={dataPath}
        fill="#4338ca"
        className="radar-fill"
        stroke="#4338ca"
        strokeWidth="2"
        strokeOpacity={0.5}
      />

      {/* Data dots — pulsing */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x} cy={p.y}
          r="4"
          fill="#4338ca"
          className="radar-dot"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}

      {/* Labels */}
      {dimensions.map((d) => {
        const p = polar(d.angle, maxR + 28);
        return (
          <text
            key={d.name}
            x={p.x} y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#6366f1"
            fontSize="11"
            fontWeight="500"
            letterSpacing="0.05em"
          >
            {d.name}
          </text>
        );
      })}
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Animated progress bar component
───────────────────────────────────────────────────────────────── */
function ScoreBar({
  label,
  score,
  color,
  delay,
  visible,
}: {
  label: string;
  score: number;
  color: string;
  delay: number;
  visible: boolean;
}) {
  return (
    <div className="flex items-center gap-4 sm:gap-6">
      <span className="w-28 sm:w-32 text-right text-sm font-medium text-gray-500 shrink-0">
        {label}
      </span>
      <div className="flex-1 relative h-3 rounded-full bg-gray-100 overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 rounded-full transition-all ease-out"
          style={{
            width: visible ? `${score}%` : "0%",
            backgroundColor: color,
            transitionDuration: "1.2s",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
      <span
        className="w-12 text-right text-sm font-semibold tabular-nums transition-all duration-700"
        style={{
          color,
          opacity: visible ? 1 : 0,
          transitionDelay: `${delay + 400}ms`,
        }}
      >
        {score}%
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────
   Dimension data
───────────────────────────────────────────────────────────────── */
const dimensions = [
  {
    name: "Strategy",
    score: 72,
    color: "#4338ca",
    question: "Do you have an AI strategy aligned with business goals?",
    desc: "Alignment between AI initiatives and core business objectives.",
  },
  {
    name: "Data",
    score: 45,
    color: "#4f46e5",
    question: "Is your data infrastructure ready for AI workloads?",
    desc: "Quality, accessibility, and governance of organizational data.",
  },
  {
    name: "Talent",
    score: 38,
    color: "#6366f1",
    question: "Do you have the AI talent to execute your strategy?",
    desc: "Skills, hiring, and upskilling across the organization.",
  },
  {
    name: "Operations",
    score: 61,
    color: "#7c3aed",
    question: "Are AI workflows embedded in daily operations?",
    desc: "Integration of AI into business processes and workflows.",
  },
  {
    name: "Governance",
    score: 55,
    color: "#8b5cf6",
    question: "Do you have policies for responsible AI deployment?",
    desc: "Risk management, ethics, compliance, and oversight frameworks.",
  },
  {
    name: "Culture",
    score: 49,
    color: "#a78bfa",
    question: "Is your organization culturally ready for AI adoption?",
    desc: "Leadership buy-in, experimentation mindset, and change readiness.",
  },
];

/* ─────────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────────── */
export default function LandingPage() {
  const scoreSection = useInView(0.1);
  const processSection = useInView(0.15);
  const dimensionSection = useInView(0.1);
  const proofSection = useInView(0.2);
  const ctaSection = useInView(0.2);

  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-indigo-100">
      {/* ═══════════════════════════════════════════════════════════
          NAV
      ═══════════════════════════════════════════════════════════ */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-white text-sm font-bold"
              style={{ background: "#4338ca" }}
            >
              A
            </div>
            <span className="font-semibold text-lg tracking-tight text-gray-900">AIVI</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-gray-400 hover:text-gray-700 transition-colors px-3 py-2"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ background: "#4338ca" }}
            >
              Start free diagnostic
            </Link>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════
          HERO — The question + pulsing radar chart
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Radar as background visual */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] lg:w-[700px] lg:h-[700px] opacity-[0.08]">
            <RadarChart />
          </div>
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-[1.1]">
            How ready is your
            <br />
            enterprise for AI?
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Measure your AI competitiveness across 6 dimensions.
            <br className="hidden sm:block" />
            Get your radar. Build your roadmap.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-medium text-white transition-all hover:shadow-lg hover:shadow-indigo-200"
              style={{ background: "#4338ca" }}
            >
              Start free diagnostic
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="#sample"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-8 py-4 text-base font-medium text-gray-500 transition-all hover:border-indigo-300 hover:text-indigo-600"
            >
              See sample report
            </Link>
          </div>
        </div>

        {/* Foreground radar — smaller, centered below CTA */}
        <div className="relative mx-auto mt-16 w-72 h-72 sm:w-80 sm:h-80">
          <RadarChart />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          LIVE SCORE PREVIEW — 6 animated progress bars
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-20 px-6 border-y border-gray-100"
        style={{ background: "#fafaff" }}
        ref={scoreSection.ref}
      >
        <div className="mx-auto max-w-2xl">
          <p className="text-center text-xs font-medium tracking-[0.2em] uppercase text-indigo-400 mb-2">
            Sample Assessment
          </p>
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-12">
            Your AI Readiness Radar
          </h2>

          <div className="flex flex-col gap-5">
            {dimensions.map((d, i) => (
              <ScoreBar
                key={d.name}
                label={d.name}
                score={d.score}
                color={d.color}
                delay={i * 150}
                visible={scoreSection.visible}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          3-STEP PROCESS — Giant numbered circles
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 px-6" ref={processSection.ref}>
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {[
              {
                num: "①",
                title: "Assess in 10 minutes",
                desc: "Answer targeted questions across Strategy, Data, Talent, Operations, Governance, and Culture.",
              },
              {
                num: "②",
                title: "Get your radar",
                desc: "Receive a visual scorecard with maturity levels, dimensional breakdowns, and industry benchmarks.",
              },
              {
                num: "③",
                title: "Build your roadmap",
                desc: "Get a prioritized 30/60/90-day transformation plan tailored to your weakest dimensions.",
              },
            ].map((step, i) => (
              <div
                key={step.title}
                className="flex flex-col items-center text-center transition-all duration-700 ease-out"
                style={{
                  opacity: processSection.visible ? 1 : 0,
                  transform: processSection.visible ? "translateY(0)" : "translateY(30px)",
                  transitionDelay: `${i * 200}ms`,
                }}
              >
                <span
                  className="flex items-center justify-center w-20 h-20 rounded-full text-4xl mb-6"
                  style={{
                    background: "linear-gradient(135deg, #4338ca 0%, #6366f1 100%)",
                    color: "white",
                  }}
                >
                  {step.num}
                </span>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-xs">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Connecting line on desktop */}
          <div className="hidden md:block relative -mt-[7.5rem] mb-12 mx-auto" style={{ maxWidth: "66%", height: "2px" }}>
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, #4338ca 0%, #6366f1 50%, #a78bfa 100%)", opacity: 0.15 }} />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          DIMENSION DEEP-DIVE — 2x3 grid of cards
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-24 px-6 border-y border-gray-100"
        style={{ background: "#fafaff" }}
        ref={dimensionSection.ref}
      >
        <div className="mx-auto max-w-5xl">
          <p className="text-center text-xs font-medium tracking-[0.2em] uppercase text-indigo-400 mb-2">
            6 Dimensions
          </p>
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-900 mb-14">
            What we measure
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {dimensions.map((d, i) => (
              <div
                key={d.name}
                className="rounded-2xl border border-gray-100 bg-white p-7 transition-all duration-700 ease-out hover:shadow-lg hover:shadow-indigo-50 hover:border-indigo-100 group"
                style={{
                  opacity: dimensionSection.visible ? 1 : 0,
                  transform: dimensionSection.visible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${i * 100}ms`,
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                  <h3 className="text-base font-semibold text-gray-900">{d.name}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">{d.desc}</p>
                <div className="rounded-lg bg-gray-50 px-4 py-3 group-hover:bg-indigo-50 transition-colors">
                  <p className="text-xs text-gray-500 italic leading-relaxed">
                    &ldquo;{d.question}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SOCIAL PROOF BAR
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-16 px-6" ref={proofSection.ref}>
        <div
          className="mx-auto max-w-4xl text-center transition-all duration-700"
          style={{
            opacity: proofSection.visible ? 1 : 0,
          }}
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-medium text-indigo-500">Trusted benchmark</span>
          </div>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
            Benchmarked against 200+ enterprises
            <br className="hidden sm:block" />
            across 6 industries
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-gray-300 font-medium tracking-wide">
            {["Financial Services", "Healthcare", "Manufacturing", "Retail", "Technology", "Energy"].map(
              (industry) => (
                <span key={industry}>{industry}</span>
              )
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════════════════════ */}
      <section
        className="py-24 px-6 border-t border-gray-100"
        style={{ background: "linear-gradient(180deg, #fafaff 0%, #f0eeff 100%)" }}
        ref={ctaSection.ref}
      >
        <div
          className="mx-auto max-w-3xl text-center transition-all duration-700 ease-out"
          style={{
            opacity: ctaSection.visible ? 1 : 0,
            transform: ctaSection.visible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Find out where you stand.
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            Free. 10 minutes. Immediate results.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-medium text-white transition-all hover:shadow-lg hover:shadow-indigo-200"
              style={{ background: "#4338ca" }}
            >
              Start free diagnostic
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href="#sample"
              className="inline-flex items-center gap-2 text-base font-medium text-indigo-500 hover:text-indigo-700 transition-colors"
            >
              See sample report
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FOOTER — Trust strip
      ═══════════════════════════════════════════════════════════ */}
      <footer className="border-t border-gray-100 py-8 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-xs text-gray-300">
              <span>Your data is never shared.</span>
              <span>Assessment takes 10 minutes.</span>
              <span>Results are immediate.</span>
            </div>
            <div className="flex items-center gap-6 text-xs text-gray-300">
              <span>&copy; {new Date().getFullYear()} AIVI</span>
              <span>A 12 Cities venture</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
