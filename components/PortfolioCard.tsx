import React from 'react';
import { Link } from 'react-router';
import PlaceholderBadge from './PlaceholderBadge';
import type { PortfolioProject } from '../content/portfolio';

interface PortfolioCardProps {
  project: PortfolioProject;
}

export default function PortfolioCard({ project }: PortfolioCardProps) {
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className="group block rounded-2xl bg-[#121214]/80 border border-white/[0.08] overflow-hidden hover:border-[#5B7FFF]/40 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#17171A]">
        <img
          src={project.thumbnail}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-transparent opacity-80" />
        
        {project.isPlaceholder && (
          <div className="absolute top-3 right-3">
            <PlaceholderBadge label="Case study coming soon" />
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
          {project.categories.slice(0, 3).map((cat, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-white/80"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="text-[12px] font-mono text-[#5B7FFF] uppercase tracking-wider mb-2">
          {project.industry}
        </div>
        <h3 className="font-display text-[18px] sm:text-[20px] font-bold text-[#F5F5F4] group-hover:text-[#5B7FFF] transition-colors mb-2 leading-snug">
          {project.title}
        </h3>
        <p className="text-[14px] text-[#9A9A9E] line-clamp-2 leading-relaxed">
          {project.shortDescription}
        </p>

        <div className="mt-4 flex items-center gap-1.5 text-[13px] font-semibold text-white/70 group-hover:text-white transition-colors">
          <span>Explore Architecture Blueprint</span>
          <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
