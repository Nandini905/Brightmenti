import React from 'react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { SERVICES } from '../content/services';

export default function Services() {
  const scrollToCategory = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-20 sm:space-y-28 py-12 sm:py-20 pb-24">
      {/* Hero Header */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12px] font-mono uppercase tracking-[0.18em] text-[#5B7FFF] mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5B7FFF]" />
          Full-Stack Capabilities
        </div>

        <h1 className="font-display text-[36px] sm:text-[52px] md:text-[68px] font-extrabold tracking-tight text-[#F5F5F4] leading-[1.06] max-w-4xl mx-auto">
          10 Specialized Disciplines. One Unified Growth Ecosystem.
        </h1>

        <p className="mt-6 text-[18px] sm:text-[20px] text-[#9A9A9E] leading-relaxed max-w-2xl mx-auto">
          Explore our complete technical, automation, creative, and performance marketing architecture. Each category operates with institutional rigor.
        </p>
      </section>

      {/* Sticky In-Page Anchor Navigation Bar */}
      <div className="sticky top-16 z-30 py-3 bg-[#0A0A0B]/90 backdrop-blur-xl border-y border-white/[0.08]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 overflow-x-auto no-scrollbar flex items-center gap-2">
          {SERVICES.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToCategory(s.id)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] text-[12px] font-mono text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <span className="text-[#5B7FFF] font-bold">{s.category}</span>
              <span>{s.title.split('&')[0].trim()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 10 Detailed Category Sections */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 space-y-16 sm:space-y-24">
        {SERVICES.map((service, index) => (
          <section
            key={service.id}
            id={service.id}
            className="scroll-mt-32 p-8 sm:p-12 rounded-3xl bg-[#121214]/80 border border-white/[0.08] relative overflow-hidden backdrop-blur-md"
          >
            {/* Ambient accent gradient */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#5B7FFF]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 sm:gap-12 relative z-10">
              {/* Left Column: Number, Title, Overview, Strong Statement */}
              <div className="lg:max-w-xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[14px] font-mono font-bold text-[#5B7FFF] px-2.5 py-1 rounded bg-[#5B7FFF]/10 border border-[#5B7FFF]/20">
                    Category {service.category}
                  </span>
                  <span className="text-[12px] font-mono text-[#9A9A9E] uppercase tracking-wider">
                    Institutional Standard
                  </span>
                </div>

                <h2 className="font-display text-[28px] sm:text-[36px] font-bold text-[#F5F5F4] tracking-tight mb-4">
                  {service.title}
                </h2>

                <p className="text-[16px] sm:text-[17px] text-[#9A9A9E] leading-relaxed mb-6">
                  {service.shortDescription}
                </p>

                {/* Standalone Strong Statement (Preserved strictly as required) */}
                {service.strongStatement && (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-[#5B7FFF]/15 to-transparent border border-[#5B7FFF]/30 mb-8">
                    <div className="text-[11px] font-mono text-[#5B7FFF] uppercase tracking-wider mb-1 font-semibold">
                      Architectural Mandate
                    </div>
                    <p className="text-[15px] sm:text-[16px] font-medium text-[#F5F5F4] leading-snug">
                      "{service.strongStatement}"
                    </p>
                  </div>
                )}

                <div className="pt-2">
                  <Button to={service.ctaHref} variant="primary" size="md">
                    {service.ctaLabel}
                  </Button>
                </div>
              </div>

              {/* Right Column: Architectural Deliverables */}
              <div className="flex-1 lg:max-w-md bg-[#17171A]/70 p-6 sm:p-8 rounded-2xl border border-white/[0.08]">
                <h3 className="font-mono text-[13px] uppercase tracking-wider text-white font-bold mb-4 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#5B7FFF]" />
                  Engineered Deliverables
                </h3>

                <ul className="space-y-3.5">
                  {service.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3 text-[14px] text-white/80 leading-relaxed">
                      <svg
                        className="w-4 h-4 text-[#5B7FFF] flex-shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Bottom CTA Band */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#17171A] to-[#121214] border border-white/[0.12] text-center shadow-[0_0_60px_rgba(91,127,255,0.12)]">
          <h2 className="font-display text-[32px] sm:text-[44px] font-bold text-[#F5F5F4]">
            Unify your tech stack under one partner
          </h2>
          <p className="mt-4 text-[16px] sm:text-[18px] text-[#9A9A9E] max-w-xl mx-auto leading-relaxed">
            Schedule a strategy consultation to map which disciplines your business requires for next-phase acceleration.
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
