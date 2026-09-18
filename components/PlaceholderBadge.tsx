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
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-medium tracking-wide uppercase bg-white/[0.04] text-white/70 border border-white/[0.1] backdrop-blur-sm ${className}`}
      title="Verified operational data pending official disclosure"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
      {label}
    </span>
  );
}
