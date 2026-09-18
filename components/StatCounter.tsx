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
    <div className="relative p-6 sm:p-8 rounded-2xl bg-[#121214]/60 border border-white/[0.08] backdrop-blur-md hover:border-white/[0.16] transition-colors group">
      <div className="flex items-baseline justify-between gap-2 mb-2">
        <div className="font-display text-[38px] sm:text-[48px] font-extrabold tracking-tight text-[#F5F5F4] group-hover:text-[#5B7FFF] transition-colors">
          {value}
        </div>
        {isPlaceholder && <PlaceholderBadge label="Estimated" />}
      </div>
      <div className="text-[15px] sm:text-[16px] font-semibold text-[#F5F5F4] mb-1">
        {label}
      </div>
      {subtext && (
        <div className="text-[13px] text-[#9A9A9E] leading-relaxed">
          {subtext}
        </div>
      )}
    </div>
  );
}
