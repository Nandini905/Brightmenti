import React from 'react';
import { Link } from 'react-router';
import type { Service } from '../content/services';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="relative flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#121214]/80 border border-white/[0.08] hover:border-[#5B7FFF]/40 transition-all duration-300 hover:-translate-y-1 group backdrop-blur-md overflow-hidden">
      <div className="absolute -right-20 -top-20 w-48 h-48 rounded-full bg-[#5B7FFF]/5 blur-3xl group-hover:bg-[#5B7FFF]/15 transition-all duration-500 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between gap-4 mb-6">
          <span className="font-mono text-[13px] font-bold text-[#5B7FFF] px-2.5 py-1 rounded-md bg-[#5B7FFF]/10 border border-[#5B7FFF]/20">
            {service.category}
          </span>
          <span className="text-[12px] font-mono text-[#9A9A9E] uppercase tracking-wider">
            Full-Stack
          </span>
        </div>

        <h3 className="font-display text-[20px] sm:text-[22px] font-bold text-[#F5F5F4] tracking-tight mb-3 group-hover:text-[#5B7FFF] transition-colors">
          {service.title}
        </h3>

        <p className="text-[14px] sm:text-[15px] text-[#9A9A9E] leading-relaxed mb-6">
          {service.shortDescription}
        </p>

        {service.strongStatement && (
          <div className="p-3 mb-6 rounded-lg bg-[#5B7FFF]/5 border border-[#5B7FFF]/15 text-[13px] text-[#F5F5F4] font-medium leading-snug">
            ?? {service.strongStatement}
          </div>
        )}

        <ul className="space-y-2 mb-8">
          {service.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-[13px] text-white/80">
              <svg className="w-4 h-4 text-[#5B7FFF] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
        <Link
          to={`/services#${service.id}`}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#5B7FFF] hover:text-white transition-colors"
        >
          <span>View category architecture</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
