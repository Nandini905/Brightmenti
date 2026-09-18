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
          ? 'py-3 bg-[#0A0A0B]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-display font-bold text-[20px] tracking-tight text-[#F5F5F4] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B7FFF] rounded-lg"
        >
          <span className="flex items-center justify-center h-8 w-8 rounded-lg bg-[#5B7FFF] text-white shadow-[0_0_16px_rgba(91,127,255,0.4)] group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </span>
          <span>brightmenti</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] font-medium">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B7FFF] rounded px-1.5 py-1 ${
                  isActive ? 'text-white font-semibold' : 'text-[#9A9A9E] hover:text-white'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Header CTA */}
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

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center h-10 w-10 rounded-xl bg-white/[0.05] border border-white/[0.1] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B7FFF]"
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

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0B]/98 border-b border-white/[0.1] px-4 py-6 backdrop-blur-2xl">
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-[16px] font-medium transition-colors ${
                    isActive ? 'bg-[#5B7FFF]/10 text-[#5B7FFF]' : 'text-[#9A9A9E] hover:text-white'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-4 mt-2 border-t border-white/[0.08] flex flex-col gap-3">
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
