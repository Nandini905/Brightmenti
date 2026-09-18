import React from 'react';
import type { Industry } from '../content/industries';

interface IndustryCardProps {
  industry: Industry;
}

export default function IndustryCard({ industry }: IndustryCardProps) {
  return (
    <div className="p-6 sm:p-8 rounded-[26px] bg-white/70 border border-[#e6dff4] hover:border-[#c5afd9] transition-all group shadow-[0_12px_30px_rgba(96,72,128,0.04)]">
      <div className="font-display text-[20px] font-extrabold text-[#1f1630] mb-2 group-hover:text-[#7d5fc0] transition-colors">
        {industry.name}
      </div>
      <div className="text-[13px] font-mono text-[#7d5fc0] mb-4">
        {industry.tagline}
      </div>
      <p className="text-[14px] text-[#5b4f6d] leading-relaxed mb-6">
        {industry.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {industry.capabilities.map((cap, idx) => (
          <span key={idx} className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#f8f4fb] border border-[#e6dff4] text-[#2d1d3a]">
            {cap}
          </span>
        ))}
      </div>
    </div>
  );
}
