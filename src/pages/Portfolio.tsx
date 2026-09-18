import React, { useState } from 'react';
import PortfolioCard from '../components/PortfolioCard';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import PlaceholderBadge from '../components/PlaceholderBadge';
import { PORTFOLIO_PROJECTS } from '../content/portfolio';
import { trackEvent } from '../lib/analytics';

const FILTERS = [
  'All',
  'Websites',
  'Shopify',
  'E-commerce',
  'Software',
  'Mobile Apps',
  'Automation',
  'Marketing',
  'Creative'
] as const;

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    trackEvent('portfolio_filter_used', { filter });
  };

  const filteredProjects = PORTFOLIO_PROJECTS.filter((project) => {
    if (activeFilter === 'All') return true;
    return project.categories.includes(activeFilter as any);
  });

  return (
    <div className="space-y-16 sm:space-y-24 py-12 sm:py-20 pb-24">
      {/* Header */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12px] font-mono uppercase tracking-[0.18em] text-[#5B7FFF] mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5B7FFF]" />
          Production Work & Architectures
        </div>

        <h1 className="font-display text-[36px] sm:text-[52px] md:text-[68px] font-extrabold tracking-tight text-[#F5F5F4] leading-[1.06] max-w-4xl mx-auto">
          Proven Architectures. Scalable Systems.
        </h1>

        <p className="mt-6 text-[18px] sm:text-[20px] text-[#9A9A9E] leading-relaxed max-w-2xl mx-auto">
          Explore our selected headless commerce storefronts, custom web software platforms, WhatsApp automations, and compounding paid growth systems.
        </p>

        <div className="mt-4 flex items-center justify-center gap-3">
          <PlaceholderBadge label="Case Studies Under Verified Review" />
        </div>
      </section>

      {/* Filter Bar (Client-side filtering, no full reload) */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-2">
          {FILTERS.map((f) => {
            const isActive = activeFilter === f;
            return (
              <button
                key={f}
                onClick={() => handleFilterChange(f)}
                className={`px-4 py-2 rounded-full text-[13px] font-mono transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#5B7FFF] text-white font-bold shadow-[0_0_20px_rgba(91,127,255,0.4)]'
                    : 'bg-white/[0.04] text-[#9A9A9E] hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <PortfolioCard key={project.slug} project={project} />
            ))}
          </div>
        ) : (
          <div className="p-16 rounded-3xl bg-[#121214] border border-white/[0.08] text-center max-w-lg mx-auto">
            <PlaceholderBadge label="Case studies coming soon" className="mb-4" />
            <h3 className="font-display text-[20px] font-bold text-white mb-2">
              Case studies coming soon
            </h3>
            <p className="text-[14px] text-[#9A9A9E]">
              We are currently finalizing verified case study documentation and client NDA disclosures for this category.
            </p>
          </div>
        )}
      </section>

      {/* Bottom CTA */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-b from-[#17171A] to-[#121214] border border-white/[0.12] text-center shadow-[0_0_60px_rgba(91,127,255,0.12)]">
          <h2 className="font-display text-[32px] sm:text-[44px] font-bold text-[#F5F5F4]">
            Have a custom architecture challenge?
          </h2>
          <p className="mt-4 text-[16px] sm:text-[18px] text-[#9A9A9E] max-w-xl mx-auto leading-relaxed">
            Let's evaluate your existing systems and construct a tailored blueprint for your venture.
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
