import React from 'react';
import { Link } from 'react-router';
import PlaceholderBadge from './PlaceholderBadge';
import Button from './Button';
import type { PortfolioProject } from '../content/portfolio';

interface CaseStudyLayoutProps {
  project: PortfolioProject;
}

export default function CaseStudyLayout({ project }: CaseStudyLayoutProps) {
  return (
    <div className="min-h-screen py-16 sm:py-24">
      {/* Breadcrumb */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 mb-8">
        <div className="flex items-center gap-2 text-[13px] font-mono text-[#9A9A9E]">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/portfolio" className="hover:text-white transition-colors">Portfolio</Link>
          <span>/</span>
          <span className="text-[#5B7FFF] truncate">{project.title}</span>
        </div>
      </div>

      {/* Hero Header */}
      <header className="max-w-[1240px] mx-auto px-4 sm:px-6 pb-12 border-b border-white/[0.08]">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12px] font-mono uppercase tracking-wider text-[#5B7FFF]">
            {project.industry}
          </div>
          {project.isPlaceholder && (
            <PlaceholderBadge label="Case study coming soon" />
          )}
        </div>

        <h1 className="font-display text-[32px] sm:text-[44px] md:text-[56px] font-extrabold tracking-tight text-[#F5F5F4] leading-[1.08] max-w-4xl">
          {project.title}
        </h1>

        <p className="mt-6 text-[17px] sm:text-[20px] text-[#9A9A9E] leading-relaxed max-w-3xl">
          {project.shortDescription}
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.categories.map((cat, idx) => (
            <span key={idx} className="text-[12px] font-mono px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/80">
              {cat}
            </span>
          ))}
          {project.servicesProvided.map((svc, idx) => (
            <span key={idx} className="text-[12px] font-mono px-3 py-1 rounded-md bg-[#5B7FFF]/10 border border-[#5B7FFF]/20 text-[#5B7FFF]">
              ? {svc}
            </span>
          ))}
        </div>
      </header>

      {/* Main Image */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 my-12">
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[#17171A]">
          <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </div>

      {/* Case Study Core Sections */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          <div className="lg:col-span-2 space-y-12">
            {project.challenge && (
              <section>
                <div className="text-[13px] font-mono uppercase text-[#5B7FFF] tracking-widest mb-2">01 / The Challenge</div>
                <h2 className="font-display text-[24px] sm:text-[28px] font-bold text-[#F5F5F4] mb-3">
                  Operational & Technical Bottlenecks
                </h2>
                <p className="text-[16px] text-[#9A9A9E] leading-relaxed">
                  {project.challenge}
                </p>
              </section>
            )}

            {project.approach && (
              <section>
                <div className="text-[13px] font-mono uppercase text-[#5B7FFF] tracking-widest mb-2">02 / Strategic Approach</div>
                <h2 className="font-display text-[24px] sm:text-[28px] font-bold text-[#F5F5F4] mb-3">
                  Architectural Engineering Blueprint
                </h2>
                <p className="text-[16px] text-[#9A9A9E] leading-relaxed">
                  {project.approach}
                </p>
              </section>
            )}

            {project.whatWeBuilt && (
              <section>
                <div className="text-[13px] font-mono uppercase text-[#5B7FFF] tracking-widest mb-2">03 / What We Built</div>
                <h2 className="font-display text-[24px] sm:text-[28px] font-bold text-[#F5F5F4] mb-3">
                  Engineered Solution & Components
                </h2>
                <p className="text-[16px] text-[#9A9A9E] leading-relaxed">
                  {project.whatWeBuilt}
                </p>
              </section>
            )}

            {project.solution && (
              <section>
                <div className="text-[13px] font-mono uppercase text-[#5B7FFF] tracking-widest mb-2">04 / Integration & Delivery</div>
                <h2 className="font-display text-[24px] sm:text-[28px] font-bold text-[#F5F5F4] mb-3">
                  Production Rollout & Synchronization
                </h2>
                <p className="text-[16px] text-[#9A9A9E] leading-relaxed">
                  {project.solution}
                </p>
              </section>
            )}

            {/* Results Section (Protected with zero fake metrics) */}
            <section className="p-8 rounded-2xl bg-[#121214] border border-white/[0.08]">
              <div className="text-[13px] font-mono uppercase text-[#5B7FFF] tracking-widest mb-2">05 / Verified Impact</div>
              <h2 className="font-display text-[24px] sm:text-[28px] font-bold text-[#F5F5F4] mb-3">
                Measurable System Results
              </h2>
              {project.isPlaceholder ? (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-[#9A9A9E] text-[15px]">
                  <PlaceholderBadge label="Case study results coming soon." />
                  <span>Quantitative telemetry currently undergoing audit & NDA review.</span>
                </div>
              ) : (
                <p className="text-[16px] text-[#9A9A9E] leading-relaxed">
                  {project.result || 'Case study results coming soon.'}
                </p>
              )}
            </section>
          </div>

          {/* Right Column: Meta info & CTA */}
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-[#121214] border border-white/[0.08]">
              <h3 className="font-display text-[18px] font-bold text-[#F5F5F4] mb-4">
                Services Delivered
              </h3>
              <ul className="space-y-3">
                {project.servicesProvided.map((service, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-[14px] text-white/80">
                    <span className="text-[#5B7FFF] font-bold">?</span>
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-[#121214] border border-white/[0.08]">
              <h3 className="font-display text-[18px] font-bold text-[#F5F5F4] mb-2">
                Need similar architecture?
              </h3>
              <p className="text-[14px] text-[#9A9A9E] mb-6 leading-relaxed">
                We design and build production-grade web systems and automations tailored to your operational scale.
              </p>
              <div className="space-y-3">
                <Button to="/book-a-strategy-call" variant="primary" size="md" className="w-full">
                  Book a Strategy Call ?
                </Button>
                <Button to="/contact" variant="secondary" size="md" className="w-full">
                  Start a Project ?
                </Button>
              </div>
            </div>
          </div>
        </div>

        {project.gallery && project.gallery.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/[0.08]">
            <h3 className="font-display text-[22px] font-bold text-[#F5F5F4] mb-6">
              Architecture & Interface Gallery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((img, idx) => (
                <div key={idx} className="aspect-[16/10] rounded-xl overflow-hidden border border-white/[0.08] bg-[#17171A]">
                  <img src={img} alt={`${project.title} gallery asset ${idx + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
