import React from 'react';
import { useParams, Link } from 'react-router';
import CaseStudyLayout from '../components/CaseStudyLayout';
import Button from '../components/Button';
import { PORTFOLIO_PROJECTS } from '../content/portfolio';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-24 text-center">
        <div className="max-w-md p-8 rounded-3xl bg-[#121214] border border-white/[0.08]">
          <span className="text-[12px] font-mono text-[#5B7FFF] uppercase tracking-widest">
            404 / Architecture Blueprint
          </span>
          <h1 className="font-display text-[28px] font-bold text-[#F5F5F4] mt-2 mb-4">
            Case Study Not Found
          </h1>
          <p className="text-[15px] text-[#9A9A9E] mb-6">
            The requested case study slug does not exist or has been archived under client confidentiality.
          </p>
          <Button to="/portfolio" variant="primary" size="md">
            Return to Work Directory ?
          </Button>
        </div>
      </div>
    );
  }

  return <CaseStudyLayout project={project} />;
}
