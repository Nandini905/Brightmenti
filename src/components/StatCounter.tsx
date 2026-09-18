import React from 'react';
import PlaceholderBadge from './PlaceholderBadge';

interface StatCounterProps {
  value: string;
  label: string;
  subtext?: string;
  isPlaceholder?: boolean;
}

export default function StatCounter({
  value,
  label,
  subtext,
  isPlaceholder = false
}: StatCounterProps) {
  return (
    <div className="relative p-6 sm:p-8 rounded-[26px] bg-white/75 border border-[#e6dff4] backdrop-blur-md hover:border-[#c5afd9] transition-colors group shadow-[0_14px_28px_rgba(96,72,128,0.05)]">
      <div className="flex items-baseline justify-between gap-2 mb-2">
        <div className="font-display text-[38px] sm:text-[48px] font-extrabold tracking-[-0.06em] text-[#1f1630] group-hover:text-[#7d5fc0] transition-colors">
          {value}
        </div>
        {isPlaceholder && <PlaceholderBadge label="Estimated" />}
      </div>
      <div className="text-[15px] sm:text-[16px] font-semibold text-[#2d1d3a] mb-1">
        {label}
      </div>
      {subtext && (
        <div className="text-[13px] text-[#5b4f6d] leading-relaxed">
          {subtext}
        </div>
      )}
    </div>
  );
}
