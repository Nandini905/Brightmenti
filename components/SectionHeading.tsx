import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = ''
}: SectionHeadingProps) {
  const alignmentClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`max-w-3xl mb-12 md:mb-16 ${alignmentClass} ${className}`}>
      {eyebrow && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12px] font-mono uppercase tracking-[0.18em] text-[#5B7FFF] mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5B7FFF]" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-[28px] sm:text-[36px] md:text-[48px] font-bold tracking-tight text-[#F5F5F4] leading-[1.1]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[16px] sm:text-[18px] text-[#9A9A9E] leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
