import React from 'react';
import { trackEvent } from '../lib/analytics';

export default function WhatsAppFloatingButton() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '';
  const message = encodeURIComponent('Hi Brightmenti team, I would like to discuss a project.');
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${message}` : 'https://wa.me/?text=' + message;

  const handleClick = () => {
    trackEvent('whatsapp_click', { source: 'floating_button' });
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      aria-label="Chat with Brightmenti on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-white font-medium text-[13px] shadow-[0_16px_30px_rgba(37,211,102,0.36)] hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7b5ac5]"
    >
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.589 1.221.771 1.394.858.173.086.274.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z" />
      </svg>
      <span className="hidden sm:inline font-semibold">Chat on WhatsApp ?</span>
    </a>
  );
}
