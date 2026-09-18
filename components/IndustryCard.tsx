import React from 'react';
import type { Industry } from '../content/industries';

interface IndustryCardProps {
  industry: Industry;
}

export default function IndustryCard({ industry }: IndustryCardProps) {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-[#121214]/60 border border-white/[0.08] hover:border-white/[0.2] transition-all group">
      <div className="font-display text-[20px] font-bold text-[#F5F5F4] mb-2 group-hover:text-[#5B7FFF] transition-colors">
        {industry.name}
      </div>
      <div className="text-[13px] font-mono text-[#5B7FFF] mb-4">
        {industry.tagline}
      </div>
      <p className="text-[14px] text-[#9A9A9E] leading-relaxed mb-6">
        {industry.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {industry.capabilities.map((cap, idx) => (
          <span
            key={idx}
            className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-white/70"
          >
            {cap}
          </span>
        ))}
      </div>
    </div>
  );
}
