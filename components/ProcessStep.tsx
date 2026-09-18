import React from 'react';

interface ProcessStepProps {
  step: string;
  title: string;
  description: string;
  deliverables?: string[];
  isLast?: boolean;
}

export default function ProcessStep({
  step,
  title,
  description,
  deliverables = [],
  isLast = false
}: ProcessStepProps) {
  return (
    <div className="relative flex flex-col md:flex-row gap-6 md:gap-10 pb-12 last:pb-0 group">
      {!isLast && (
        <div className="hidden md:block absolute left-[27px] top-[56px] bottom-0 w-[1px] bg-white/[0.08] group-hover:bg-[#5B7FFF]/40 transition-colors" />
      )}
      <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-2xl bg-[#17171A] border border-white/[0.12] text-[16px] font-mono font-bold text-[#5B7FFF] shadow-[0_0_20px_rgba(91,127,255,0.1)] group-hover:border-[#5B7FFF] transition-colors">
        {step}
      </div>
      <div className="flex-grow">
        <h3 className="font-display text-[20px] sm:text-[24px] font-bold text-[#F5F5F4] mb-2 tracking-tight">
          {title}
        </h3>
        <p className="text-[15px] sm:text-[16px] text-[#9A9A9E] leading-relaxed max-w-2xl mb-4">
          {description}
        </p>
        {deliverables.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {deliverables.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-[12px] font-mono px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-white/80"
              >
                ? {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
