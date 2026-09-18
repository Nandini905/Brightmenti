import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router';
import Button from './Button';

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Contact', to: '/contact' }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3 bg-[rgba(248,243,255,0.84)] backdrop-blur-xl border-b border-[#dcc9f2] shadow-[0_16px_40px_rgba(86,62,118,0.08)]'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display font-extrabold text-[20px] tracking-[-0.04em] text-[#1d1630] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7b5ac5] rounded-lg"
        >
          <span className="flex items-center justify-center h-9 w-9 rounded-2xl bg-gradient-to-br from-[#7b5ac5] to-[#6040a8] text-white shadow-[0_14px_26px_rgba(97,64,168,0.25)] group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </span>
          <span>brightmenti</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7b5ac5] rounded px-1.5 py-1 ${
                  isActive ? 'text-[#1d1630] font-semibold' : 'text-[#5e4d6d] hover:text-[#1d1630]'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          <Button to="/contact" variant="ghost" size="sm">
            Start a Project ?
          </Button>
          <Button
            to="/book-a-strategy-call"
            variant="primary"
            size="sm"
            trackingEvent="book_strategy_call_click"
            trackingProps={{ location: 'header' }}
          >
            Book a Strategy Call ?
          </Button>
        </div>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center h-10 w-10 rounded-xl bg-white/80 border border-[#dcc9f2] text-[#1d1630] shadow-[0_8px_18px_rgba(86,62,118,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7b5ac5]"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[rgba(249,243,255,0.96)] border-b border-[#dcc9f2] px-4 py-6 backdrop-blur-2xl shadow-[0_16px_30px_rgba(86,62,118,0.08)]">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-[16px] font-medium transition-colors ${
                    isActive ? 'bg-[#7b5ac5]/10 text-[#6040a8]' : 'text-[#5e4d6d] hover:text-[#1d1630]'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-4 mt-2 border-t border-[#e9def8] flex flex-col gap-3">
              <Button
                to="/book-a-strategy-call"
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Book a Strategy Call ?
              </Button>
              <Button
                to="/contact"
                variant="secondary"
                size="md"
                className="w-full"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Start a Project ?
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
