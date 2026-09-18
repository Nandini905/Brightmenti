import React from 'react';
import { Link } from 'react-router';
import type { Service } from '../content/services';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group relative flex flex-col justify-between p-6 sm:p-8 rounded-[28px] bg-[rgba(255,255,255,0.75)] border border-[#e6d9f8] transition-all duration-300 hover:-translate-y-1 hover:border-[#c9b4ec] backdrop-blur-md overflow-hidden shadow-[0_18px_38px_rgba(87,62,118,0.06)]">
      <div className="absolute -right-16 -top-16 w-44 h-44 rounded-full bg-[#efe2ff] blur-3xl group-hover:bg-[#e7d7ff] transition-all duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4 mb-6">
          <span className="font-mono text-[13px] font-bold text-[#6040a8] px-2.5 py-1 rounded-md bg-[#f3ebff] border border-[#dcc9f2]">
            {service.category}
          </span>
          <span className="text-[12px] font-mono text-[#7a6c88] uppercase tracking-wider">
            Full-Stack
          </span>
        </div>

        <h3 className="font-display text-[20px] sm:text-[22px] font-extrabold text-[#1d1630] tracking-[-0.04em] mb-3 group-hover:text-[#6040a8] transition-colors">
          {service.title}
        </h3>

        <p className="text-[14px] sm:text-[15px] text-[#5e4d6d] leading-relaxed mb-6">
          {service.shortDescription}
        </p>

        {service.strongStatement && (
          <div className="p-3 mb-6 rounded-xl bg-[#f5effd] border border-[#dcc9f2] text-[13px] text-[#1d1630] font-medium leading-snug">
            “{service.strongStatement}”
          </div>
        )}

        <ul className="space-y-2 mb-8">
          {service.bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-[13px] text-[#2d1d3a]">
              <svg className="w-4 h-4 text-[#6040a8] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative z-10 pt-4 border-t border-[#efe4ff] flex items-center justify-between">
        <Link to={`/services#${service.id}`} className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#6040a8] hover:text-[#4a2f93] transition-colors">
          <span>View category architecture</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
