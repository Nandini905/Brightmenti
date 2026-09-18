import React from 'react';
import { Link } from 'react-router';
import Button from './Button';
import { SERVICES } from '../content/services';

export default function Footer() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '';
  const message = encodeURIComponent('Hi Brightmenti, I would like to discuss a project.');
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${message}` : 'https://wa.me/?text=' + message;

  return (
    <footer className="bg-[#f7f1ff] border-t border-[#dcc9f2] pt-16 pb-24 md:pb-16 text-[#5e4d6d]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#dcc9f2]">
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 font-display font-bold text-[20px] text-[#1d1630]">
              <span className="flex items-center justify-center h-9 w-9 rounded-2xl bg-gradient-to-br from-[#7b5ac5] to-[#6040a8] text-white shadow-[0_14px_26px_rgba(97,64,168,0.18)]">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </span>
              <span>brightmenti</span>
            </Link>
            <p className="font-mono text-[13px] text-[#6040a8] font-semibold">
              Build. Automate. Market. Scale.
            </p>
            <p className="text-[14px] leading-relaxed max-w-sm text-[#5e4d6d]">
              Engineering unified digital ecosystems for modern founders, high-volume D2C brands, and scalable enterprises.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[12px] font-mono text-[#4f3c64]">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Operational Status: Accepting Select Q2/Q3 Projects</span>
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[12px] uppercase tracking-wider text-[#1d1630] font-bold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              <li><Link to="/" className="hover:text-[#1d1630] transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#1d1630] transition-colors">About</Link></li>
              <li><Link to="/services" className="hover:text-[#1d1630] transition-colors">Services Hub</Link></li>
              <li><Link to="/portfolio" className="hover:text-[#1d1630] transition-colors">Work & Case Studies</Link></li>
              <li><Link to="/contact" className="hover:text-[#1d1630] transition-colors">Contact</Link></li>
              <li><Link to="/book-a-strategy-call" className="hover:text-[#1d1630] transition-colors">Book Strategy Call</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-mono text-[12px] uppercase tracking-wider text-[#1d1630] font-bold mb-4">
              Disciplines
            </h4>
            <ul className="space-y-2.5 text-[14px]">
              {SERVICES.slice(0, 6).map((svc) => (
                <li key={svc.id}>
                  <Link to={`/services#${svc.id}`} className="hover:text-[#1d1630] transition-colors">
                    {svc.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-[#6040a8] hover:underline font-semibold">
                  All 10 Services ?
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-mono text-[12px] uppercase tracking-wider text-[#1d1630] font-bold mb-4">
              Connect
            </h4>
            <Button to="/book-a-strategy-call" variant="primary" size="sm" className="w-full">
              Book a Strategy Call ?
            </Button>
            <Button to="/contact" variant="secondary" size="sm" className="w-full">
              Start a Project ?
            </Button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-4 py-2.5 rounded-full bg-white border border-[#dcc9f2] text-[#1d1630] hover:bg-[#f3ebff] transition-colors text-[13px] font-medium"
            >
              Chat on WhatsApp ?
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#5e4d6d]">
          <p>? 2026 Brightmenti. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[12px]">
            <span className="hover:text-[#1d1630] cursor-default">Privacy Policy</span>
            <span className="hover:text-[#1d1630] cursor-default">Terms of Service</span>
            <span className="hover:text-[#1d1630] cursor-default">Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
