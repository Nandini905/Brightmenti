import React from 'react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import IndustryCard from '../components/IndustryCard';
import PlaceholderBadge from '../components/PlaceholderBadge';
import { INDUSTRIES } from '../content/industries';

const PHILOSOPHY = [
  {
    num: '01',
    statement: 'Code is only as valuable as the revenue and operational leverage it facilitates.',
    context: 'We do not build technology for decorative novelty. Every repository, schema, and API endpoint is architected to compound conversion throughput, lower CAC, or eliminate manual labor.'
  },
  {
    num: '02',
    statement: 'Growth without technical infrastructure is unsustainable; traffic on a leaky funnel wastes capital.',
    context: 'Pouring performance ad spend into fragile storefronts or slow-loading websites destroys margins. High-velocity customer acquisition demands sub-second page performance and rock-solid checkout flows.'
  },
  {
    num: '03',
    statement: 'Simplicity and architectural precision outperform bloated complexity every time.',
    context: 'We aggressively eliminate technical debt, bloated third-party plugins, and fragmented manual spreadsheets in favor of clean, maintainable, production-tested software systems.'
  }
];

const PRINCIPLES = [
  {
    title: 'First-Principles Engineering',
    desc: 'We break complex growth and software challenges down to their fundamental truths rather than copying outdated agency playbooks.'
  },
  {
    title: 'The Unified Ecosystem Doctrine',
    desc: 'No component exists in a vacuum. Ad creative, landing pages, CRM automations, and cloud servers must operate as a synchronized feedback loop.'
  },
  {
    title: 'Relentless Speed Over Bureaucracy',
    desc: 'Ambitious ventures cannot wait months for committee approvals. We deploy high-velocity engineering sprints with weekly deliverables.'
  },
  {
    title: 'Radical Transparency & Telemetry',
    desc: 'Zero obscured metrics or vanity reports. You receive direct access to production codebases, live dashboards, and deterministic telemetry.'
  },
  {
    title: 'Long-Term Compounding Value',
    desc: 'We build durable digital assets and automated retention workflows that continue generating enterprise value long after initial deployment.'
  }
];

export default function About() {
  return (
    <div className="space-y-24 sm:space-y-32 py-12 sm:py-20 pb-24">
      {/* 1. HERO */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12px] font-mono uppercase tracking-[0.18em] text-[#5B7FFF] mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5B7FFF]" />
          About Brightmenti
        </div>

        <h1 className="font-display text-[36px] sm:text-[52px] md:text-[68px] font-extrabold tracking-tight text-[#F5F5F4] leading-[1.06] max-w-4xl mx-auto">
          Engineering-First Growth, Technology & Creative Architecture
        </h1>

        <p className="mt-6 text-[18px] sm:text-[20px] text-[#9A9A9E] leading-relaxed max-w-2xl mx-auto">
          We bridge the chasm between serious software engineering and aggressive digital acquisition, building unified growth engines for high-trajectory companies.
        </p>
      </section>

      {/* 2. OUR STORY */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-14 rounded-3xl bg-[#121214] border border-white/[0.08] max-w-4xl mx-auto space-y-6 text-[16px] sm:text-[18px] text-[#9A9A9E] leading-relaxed">
          <h2 className="font-display text-[26px] sm:text-[32px] font-bold text-[#F5F5F4] mb-4">
            Why Brightmenti was created
          </h2>
          <p>
            The modern digital services industry is fundamentally broken into two isolated camps: marketing agencies with zero technical depth who treat code as an afterthought, and traditional software consultancies who have never managed a customer acquisition funnel or conversion rate experiment.
          </p>
          <p>
            Founders are forced to play project manager across five disconnected vendors. Attribution leaks between ad platforms and storefronts. Custom features get outsourced to low-bid offshore developers. Automations break without anyone noticing.
          </p>
          <p className="text-white font-medium">
            Brightmenti was established to eliminate this fragmentation. We operate as an integrated technical and growth partner?bringing code-level engineering, full-funnel marketing, and commercial production under one unified roof.
          </p>
          <div className="pt-4 flex items-center gap-3">
            <PlaceholderBadge label="Zero Fabricated Statistics" />
            <span className="text-[13px] font-mono text-white/50">Verified production standards only.</span>
          </div>
        </div>
      </section>

      {/* 3. PHILOSOPHY (3 Statements) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Core Philosophy"
          title="Three axioms that govern how we build"
          description="These three principles guide every technical architecture decision, advertising dollar spent, and software system we deploy."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PHILOSOPHY.map((item) => (
            <div
              key={item.num}
              className="p-8 rounded-2xl bg-[#121214]/80 border border-white/[0.08] hover:border-[#5B7FFF]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[14px] font-bold text-[#5B7FFF]">
                  {item.num}
                </span>
                <h3 className="font-display text-[18px] sm:text-[20px] font-bold text-[#F5F5F4] mt-3 mb-4 leading-snug">
                  "{item.statement}"
                </h3>
              </div>
              <p className="text-[14px] text-[#9A9A9E] leading-relaxed pt-4 border-t border-white/[0.06]">
                {item.context}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CAPABILITIES OVERVIEW (Industries / Audience Focus) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Target Verticals"
          title="Who we partner with"
          description="We work with ambitious leadership teams ready to establish market authority through superior digital infrastructure."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INDUSTRIES.map((ind) => (
            <IndustryCard key={ind.id} industry={ind} />
          ))}
        </div>
      </section>

      {/* 5. HOW WE THINK (5 Principles) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          eyebrow="Engineering Doctrine"
          title="How we think & operate"
          description="Our institutional guidelines for velocity, architectural decisions, and client communication."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRINCIPLES.map((principle, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 rounded-2xl bg-[#121214]/60 border border-white/[0.08]"
            >
              <div className="text-[12px] font-mono text-[#5B7FFF] uppercase tracking-wider mb-2">
                Principle 0{idx + 1}
              </div>
              <h3 className="font-display text-[18px] sm:text-[20px] font-bold text-[#F5F5F4] mb-3">
                {principle.title}
              </h3>
              <p className="text-[14px] text-[#9A9A9E] leading-relaxed">
                {principle.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#17171A] to-[#121214] border border-white/[0.12] text-center shadow-[0_0_60px_rgba(91,127,255,0.12)]">
          <h2 className="font-display text-[32px] sm:text-[44px] font-bold text-[#F5F5F4]">
            Build with an engineering-led growth partner
          </h2>
          <p className="mt-4 text-[16px] sm:text-[18px] text-[#9A9A9E] max-w-xl mx-auto leading-relaxed">
            Reserve a strategic consultation with our lead architects to discuss your technical stack, bottlenecks, and expansion trajectory.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button to="/book-a-strategy-call" variant="primary" size="lg">
              Book a Strategy Call ?
            </Button>
            <Button to="/contact" variant="secondary" size="lg">
              Start a Project ?
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
