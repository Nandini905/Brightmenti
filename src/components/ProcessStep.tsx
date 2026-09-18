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
        <div className="hidden md:block absolute left-[27px] top-[56px] bottom-0 w-[1px] bg-[#dccff2] group-hover:bg-[#7d5fc0] transition-colors" />
      )}
      <div className="flex-shrink-0 flex items-center justify-center h-14 w-14 rounded-2xl bg-[#f8f4fb] border border-[#d7caeb] text-[16px] font-mono font-bold text-[#7d5fc0] shadow-[0_10px_24px_rgba(125,95,192,0.08)] group-hover:border-[#7d5fc0] transition-colors">
        {step}
      </div>
      <div className="flex-grow">
        <h3 className="font-display text-[20px] sm:text-[24px] font-extrabold text-[#1f1630] mb-2 tracking-[-0.04em]">
          {title}
        </h3>
        <p className="text-[15px] sm:text-[16px] text-[#5b4f6d] leading-relaxed max-w-2xl mb-4">
          {description}
        </p>
        {deliverables.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {deliverables.map((item, idx) => (
              <span key={idx} className="inline-flex items-center text-[12px] font-mono px-3 py-1 rounded-md bg-[#f8f4fb] border border-[#e6dff4] text-[#2d1d3a]">
                ? {item}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
