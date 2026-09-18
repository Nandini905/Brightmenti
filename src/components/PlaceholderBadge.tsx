import React from 'react';

interface PlaceholderBadgeProps {
  label?: string;
  className?: string;
}

export default function PlaceholderBadge({
  label = 'Case study coming soon',
  className = ''
}: PlaceholderBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide uppercase bg-white/80 text-[#2d1d3a] border border-[#d7caeb] backdrop-blur-sm shadow-[0_8px_18px_rgba(125,95,192,0.05)] ${className}`}
      title="Verified operational data pending official disclosure"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#7d5fc0] animate-pulse" />
      {label}
    </span>
  );
}
