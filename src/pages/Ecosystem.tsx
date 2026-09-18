import { useState } from "react";
import { Arrow, CtaBand, PageHero, Pill, Reveal } from "../ui";

const NODES = [
  { id: "site", t: "Website & Store", d: "The front door — fast, on-brand and built to convert.", x: 50, y: 12 },
  { id: "marketing", t: "Marketing Engine", d: "Ads, SEO and content feeding a steady stream of demand.", x: 85, y: 40 },
  { id: "automation", t: "WhatsApp & Automation", d: "Conversations and workflows that run without you.", x: 72, y: 82 },
  { id: "software", t: "Custom Software", d: "The internal tools and logic your business runs on.", x: 28, y: 82 },
  { id: "data", t: "Data & Analytics", d: "One source of truth so every decision is measurable.", x: 15, y: 40 },
];

export default function Ecosystem() {
  const [active, setActive] = useState("site");
  const activeNode = NODES.find((n) => n.id === active)!;

  return (
    <>
      <PageHero
        eyebrow="Connected Digital Ecosystem"
        title={<>Everything talks to <span className="text-[var(--color-accent)]">everything.</span></>}
        sub="Most agencies leave you with disconnected tools. We build one system where your site, marketing, automation and software share the same source of truth."
      />

      <div className="rounded-t-[2.5rem] bg-[var(--color-panel)]">
        <div className="mx-auto grid max-w-[1240px] items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
          {/* Diagram */}
          <Reveal>
            <div className="relative aspect-square w-full rounded-[2.5rem] bg-[var(--color-lavender)] p-4">
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
                {NODES.map((n) => (
                  <line
                    key={n.id}
                    x1="50" y1="50" x2={n.x} y2={n.y}
                    stroke={active === n.id ? "#6a35d9" : "#c9b8f5"}
                    strokeWidth={active === n.id ? "0.8" : "0.4"}
                    strokeDasharray="2 2"
                  />
                ))}
              </svg>

              {/* center hub */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-plum)] px-5 py-4 text-center text-white shadow-xl">
                <p className="font-display text-sm font-bold">brightmenti</p>
                <p className="text-[10px] opacity-70">core</p>
              </div>

              {NODES.map((n) => (
                <button
                  key={n.id}
                  onMouseEnter={() => setActive(n.id)}
                  onFocus={() => setActive(n.id)}
                  onClick={() => setActive(n.id)}
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl px-3 py-2 text-center text-[11px] font-semibold shadow-md transition-all ${
                    active === n.id
                      ? "scale-110 bg-[var(--color-accent)] text-white"
                      : "bg-white text-[var(--color-plum)] hover:scale-105"
                  }`}
                >
                  {n.t}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Detail */}
          <Reveal delay={100}>
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[.2em] text-[var(--color-accent)]">The connected node</p>
              <h2 className="mt-3 font-display text-[34px] font-bold leading-tight text-[var(--color-plum)] sm:text-[42px]">{activeNode.t}</h2>
              <p className="mt-4 text-[17px] leading-relaxed text-[var(--color-mute)]">{activeNode.d}</p>

              <div className="mt-8 space-y-3">
                {NODES.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => setActive(n.id)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors ${
                      active === n.id ? "bg-[var(--color-accent-soft)]" : "hover:bg-[var(--color-lavender)]"
                    }`}
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${active === n.id ? "bg-[var(--color-accent)]" : "bg-[var(--color-lavender-deep)]"}`} />
                    <span className={`text-[15px] font-medium ${active === n.id ? "text-[var(--color-plum)]" : "text-[var(--color-mute)]"}`}>{n.t}</span>
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <Pill to="/services">Explore the services <Arrow className="h-4 w-4" /></Pill>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Benefits */}
        <div className="mx-auto max-w-[1240px] px-4 pb-16 sm:px-6">
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              { t: "No silos", d: "One team owns the whole stack, so nothing gets lost in handoffs." },
              { t: "Compounding growth", d: "Each channel strengthens the next instead of leaking value." },
              { t: "Measurable everywhere", d: "Shared data means every decision is backed by real numbers." },
            ].map((b, i) => (
              <Reveal key={b.t} delay={i * 80}>
                <div className="h-full rounded-3xl bg-white p-7 ring-1 ring-[var(--color-lavender-deep)]/60">
                  <h3 className="font-display text-xl font-bold text-[var(--color-plum)]">{b.t}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-[var(--color-mute)]">{b.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <CtaBand />
      </div>
    </>
  );
}
