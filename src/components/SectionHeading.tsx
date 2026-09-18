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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/75 border border-[#dcc9f2] text-[12px] font-mono uppercase tracking-[0.18em] text-[#6040a8] mb-4 shadow-[0_10px_26px_rgba(123,90,197,0.06)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#7b5ac5]" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-[28px] sm:text-[36px] md:text-[46px] font-extrabold tracking-[-0.05em] text-[#1d1630] leading-[1.05]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[16px] sm:text-[18px] text-[#5e4d6d] leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
