import React from 'react';
import { Link } from 'react-router';
import { trackEvent, type AnalyticsEvent } from '../lib/analytics';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  trackingEvent?: AnalyticsEvent;
  trackingProps?: Record<string, any>;
  icon?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  onClick,
  className = '',
  type = 'button',
  disabled = false,
  trackingEvent,
  trackingProps,
  icon = false,
}: ButtonProps) {
  const handleClick = () => {
    if (trackingEvent) {
      trackEvent(trackingEvent, trackingProps);
    }
    if (onClick) onClick();
  };

  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7b5ac5] disabled:opacity-50 disabled:pointer-events-none cursor-pointer select-none';

  const sizeStyles = {
    sm: 'text-[13px] px-3.5 py-2 rounded-full gap-1.5',
    md: 'text-[14px] px-5 py-2.5 rounded-full gap-2',
    lg: 'text-[15px] px-6 py-3.5 rounded-full gap-2.5 tracking-tight'
  }[size];

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#7b5ac5] to-[#5d3dad] text-white shadow-[0_18px_34px_rgba(97,64,168,0.22)] hover:shadow-[0_22px_40px_rgba(97,64,168,0.28)] hover:-translate-y-0.5 active:translate-y-0',
    secondary:
      'bg-white text-[#1d1630] border border-[#dfd0f5] hover:bg-[#f7f1ff] hover:border-[#ccb3ec] backdrop-blur-md shadow-[0_10px_20px_rgba(111,84,147,0.05)]',
    outline:
      'bg-transparent text-[#1d1630] border border-[#d9caed] hover:bg-white/70 hover:border-[#c5afd8]',
    ghost:
      'bg-transparent text-[#5e4d6d] hover:text-[#1d1630] hover:bg-white/70'
  }[variant];

  const combinedClass = `${baseStyles} ${sizeStyles} ${variantStyles} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <svg
          className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} onClick={handleClick} className={`group ${combinedClass}`}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        onClick={handleClick}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={`group ${combinedClass}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={`group ${combinedClass}`}
    >
      {content}
    </button>
  );
}
