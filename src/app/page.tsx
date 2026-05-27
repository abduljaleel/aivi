import Link from "next/link";
import { appConfig } from "@/lib/config";

const ACCENT = "#5e7cff";

type Stone = {
  ts: string;
  agent: string;
  file: string;
  model: string;
  constraints: string;
  rationale: string;
  active?: boolean;
};

const stones: Stone[] = [
  {
    ts: "14:08:12",
    agent: "intent.parser",
    file: "—",
    model: "haiku-3.5",
    constraints: "none",
    rationale: "Resolve user intent: refactor auth module for SSO support.",
  },
  {
    ts: "14:08:47",
    agent: "strategist",
    file: "PLAN.md",
    model: "opus-4.7",
    constraints: "scope.locked",
    rationale: "Decompose into 4 steps. Touch only src/auth/*.",
  },
  {
    ts: "14:09:03",
    agent: "code.reader",
    file: "src/auth/session.ts",
    model: "sonnet-4.6",
    constraints: "read-only",
    rationale: "Existing session handler uses JWT — preserve interface for downstream consumers.",
  },
  {
    ts: "14:09:31",
    agent: "code.writer",
    file: "src/auth/sso.ts",
    model: "sonnet-4.6",
    constraints: "scope.locked, pii.never.logged",
    rationale: "New file. SAML-compliant assertion parser. No PII written to logs.",
    active: true,
  },
  {
    ts: "14:09:52",
    agent: "verifier",
    file: "src/auth/sso.test.ts",
    model: "sonnet-4.6",
    constraints: "must.pass.tests",
    rationale: "12 test cases pass. Edge case: malformed assertion returns null, not throws.",
  },
  {
    ts: "14:10:14",
    agent: "auditor",
    file: "—",
    model: "haiku-3.5",
    constraints: "audit.verbose",
    rationale: "Chain verified. All constraints satisfied. Provenance sealed and indexed.",
  },
];

export default function LandingPage() {
  return (
    <div
      className="flex min-h-screen flex-col bg-[#08090d] text-[#d4d4d8]"
      style={{ fontFamily: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif" }}
    >
      {/* ──────────────────────────────────────────────────────────────
          NAV
      ────────────────────────────────────────────────────────────── */}
      <header className="border-b border-[#16181d]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: ACCENT, boxShadow: `0 0 8px ${ACCENT}` }}
            />
            <span
              className="text-base tracking-wide text-[#fafafa]"
              style={{ fontFamily: "'Cormorant Garamond', 'Iowan Old Style', Georgia, serif", fontWeight: 600 }}
            >
              Cairn
            </span>
            <span
              className="text-[10px] uppercase tracking-[0.25em] text-[#52525b] hidden sm:inline"
              style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
            >
              · London
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-xs text-[#71717a] hover:text-[#fafafa] transition-colors"
              style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
            >
              sign in
            </Link>
            <Link
              href="/signup"
              className="text-xs border px-4 py-1.5 transition-colors"
              style={{
                fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
                borderColor: `${ACCENT}66`,
                color: ACCENT,
              }}
            >
              get started
            </Link>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────────────
          HERO
      ────────────────────────────────────────────────────────────── */}
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-28 pb-16 text-center">
        <div className="flex items-center gap-2 mb-10">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: ACCENT, boxShadow: `0 0 10px ${ACCENT}` }}
          />
          <span
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ color: ACCENT, fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
          >
            Governance Layer · Provenance Sealed
          </span>
        </div>

        <h1
          className="text-7xl sm:text-8xl lg:text-[10rem] tracking-tight text-white leading-none"
          style={{ fontFamily: "'Cormorant Garamond', 'Iowan Old Style', Georgia, serif", fontWeight: 500 }}
        >
          Cairn
        </h1>

        <p className="mt-8 max-w-2xl text-xl sm:text-2xl text-[#d4d4d8] leading-snug">
          Causal provenance graph for every agent decision.
        </p>
        <p
          className="mt-6 text-sm text-[#71717a]"
          style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
        >
          From London — where audit meets law.
        </p>

        <div
          className="mt-10 inline-block border-l-2 pl-4 py-1 text-left text-sm text-[#a1a1aa] max-w-md"
          style={{ borderColor: `${ACCENT}80` }}
        >
          &ldquo;Why did the AI change that file? Nobody knows.&rdquo;
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          CAUSAL CHAIN STRIP
      ────────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#16181d]">
        <div className="mx-auto max-w-5xl px-6 py-16">
          <p
            className="text-[10px] uppercase tracking-[0.3em] text-[#71717a] mb-8 text-center"
            style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
          >
            The causal chain
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-xs sm:text-sm">
            {["User intent", "Strategy plan", "File decision", "Constraint check", "Edit", "Verified"].map(
              (label, idx, arr) => (
                <div key={label} className="flex items-center gap-3">
                  <span
                    className="px-3 py-1.5 border rounded-sm"
                    style={{
                      fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
                      borderColor: `${ACCENT}33`,
                      color: idx === arr.length - 1 ? ACCENT : "#a1a1aa",
                      background: idx === arr.length - 1 ? `${ACCENT}10` : "transparent",
                    }}
                  >
                    {label}
                  </span>
                  {idx < arr.length - 1 && (
                    <span
                      style={{ color: ACCENT, fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
                    >
                      →
                    </span>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          CAIRN — stacked stones
      ────────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#16181d]">
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
              <span
                className="text-[10px] uppercase tracking-[0.25em] text-[#71717a]"
                style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
              >
                provenance.cairn / session #41a7
              </span>
            </div>
            <span
              className="text-[10px] uppercase tracking-[0.25em] text-[#52525b]"
              style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
            >
              6 stones · sealed
            </span>
          </div>

          {/* The stacked stones — each progressively wider at top, narrower at base = inverted cairn?
              Real cairns vary; we'll do a natural-looking stack: small top, biggest middle, smaller base. */}
          <div className="mx-auto flex flex-col-reverse items-center gap-1 max-w-3xl">
            {stones.map((s, idx) => {
              // Vary widths to look like real stones: narrower at top of stack
              const widths = ["72%", "92%", "100%", "96%", "88%", "78%"];
              const w = widths[idx] ?? "90%";
              const active = s.active;
              return (
                <div
                  key={s.ts}
                  className="relative border bg-[#0a0c11] px-5 py-3 transition-colors hover:border-[#5e7cff]/40"
                  style={{
                    width: w,
                    borderColor: active ? ACCENT : "#16181d",
                    boxShadow: active ? `0 0 28px ${ACCENT}35` : undefined,
                    borderRadius: idx % 2 === 0 ? "14px 18px 12px 16px" : "16px 12px 18px 14px",
                  }}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span
                      className="text-[10px] uppercase tracking-[0.2em]"
                      style={{
                        color: active ? ACCENT : "#52525b",
                        fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
                      }}
                    >
                      {s.ts}
                    </span>
                    <span
                      className="text-xs text-white"
                      style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
                    >
                      {s.agent}
                    </span>
                    <span
                      className="text-[10px] text-[#71717a]"
                      style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
                    >
                      · {s.file}
                    </span>
                    <span
                      className="ml-auto text-[10px] text-[#52525b]"
                      style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
                    >
                      model: {s.model}
                    </span>
                  </div>
                  <div
                    className="mt-1 text-[10px] text-[#71717a]"
                    style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
                  >
                    constraints: <span style={{ color: ACCENT }}>{s.constraints}</span>
                  </div>
                  <div className="mt-1.5 text-xs text-[#a1a1aa] leading-relaxed">{s.rationale}</div>
                </div>
              );
            })}
          </div>

          <p
            className="mt-10 text-center text-[11px] text-[#52525b]"
            style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
          >
            stack reads bottom-up · every stone replayable · every alternative logged
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          FEATURE ROW
      ────────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#16181d]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Decision recorded",
                desc: "Every choice the agent made — who, when, why, with what model.",
              },
              {
                label: "Alternatives logged",
                desc: "Not just what was done — what was considered and rejected.",
              },
              {
                label: "Constraints captured",
                desc: "Which guardrails were active at the moment of each decision.",
              },
              {
                label: "Causal chain queryable",
                desc: "Ask why any change happened. Walk the graph back to first cause.",
              },
            ].map((f) => (
              <div
                key={f.label}
                className="border border-[#16181d] bg-[#0a0c11] p-5 hover:border-[#5e7cff]/40 transition-colors"
              >
                <div
                  className="text-[10px] uppercase tracking-[0.2em] mb-3"
                  style={{ color: ACCENT, fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
                >
                  ▸ feature
                </div>
                <div className="text-white text-sm font-medium mb-2">{f.label}</div>
                <div className="text-xs text-[#71717a] leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          STATS / PROMISE
      ────────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#16181d]" style={{ background: "#06070a" }}>
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p
            className="text-[10px] uppercase tracking-[0.3em] text-[#71717a] mb-6"
            style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
          >
            The promise
          </p>
          <p
            className="text-2xl sm:text-3xl text-white leading-snug"
            style={{ fontFamily: "'Cormorant Garamond', 'Iowan Old Style', Georgia, serif", fontWeight: 500 }}
          >
            Every decision since deployment, replayable.
            <br />
            <span style={{ color: ACCENT }}>Even from six months ago.</span>
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          CTA
      ────────────────────────────────────────────────────────────── */}
      <section className="border-t border-[#16181d]">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <p
            className="text-[10px] uppercase tracking-[0.3em] text-[#71717a] mb-6"
            style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
          >
            Start the cairn
          </p>
          <Link
            href="/signup"
            className="inline-block border px-8 py-3 text-sm transition-all duration-200"
            style={{
              fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
              borderColor: ACCENT,
              color: ACCENT,
              boxShadow: `0 0 20px ${ACCENT}30`,
            }}
          >
            $ cairn record →
          </Link>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────────────
          FOOTER
      ────────────────────────────────────────────────────────────── */}
      <footer className="border-t border-[#16181d]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="text-xs text-[#52525b]"
            style={{ fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace" }}
          >
            <span
              className="text-[#a1a1aa]"
              style={{ fontFamily: "'Cormorant Garamond', 'Iowan Old Style', Georgia, serif", fontWeight: 600, fontSize: "0.9rem" }}
            >
              {appConfig.name}
            </span>
            <span className="mx-2">·</span>
            <span>London</span>
            <span className="mx-2">·</span>
            <span>cairn.co.uk</span>
          </div>
          <a
            href="https://abduljaleel.xyz/aletheia/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] px-3 py-1.5 border transition-colors"
            style={{
              fontFamily: "'JetBrains Mono', 'SF Mono', Menlo, monospace",
              borderColor: `${ACCENT}40`,
              color: ACCENT,
            }}
          >
            Part of the Aletheia stack ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
