import React from 'react';
import { useLocation } from 'react-router';
import Button from './Button';
import { trackEvent } from '../lib/analytics';

export default function StickyMobileCTA() {
  const { pathname } = useLocation();

  if (pathname === '/book-a-strategy-call') {
    return null;
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
  const message = encodeURIComponent('Hi Brightmenti, I would like to discuss a project.');
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${message}` : 'https://wa.me/?text=' + message;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0A0A0B]/95 border-t border-white/[0.1] backdrop-blur-xl px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_24px_rgba(0,0,0,0.8)] flex items-center gap-3">
      <Button
        to="/contact"
        variant="primary"
        size="sm"
        className="flex-1 !py-3 text-[14px]"
      >
        Start a Project ?
      </Button>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('whatsapp_click', { source: 'sticky_mobile_cta' })}
        className="inline-flex items-center justify-center px-4 py-3 rounded-lg bg-white/[0.08] text-[#F5F5F4] border border-white/[0.12] text-[13px] font-medium"
      >
        WhatsApp
      </a>
    </div>
  );
}
