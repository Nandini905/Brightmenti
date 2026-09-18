import React, { useState, useEffect } from 'react';
import { getStoredBookings, type StrategyBooking } from '../lib/bookingStore';
import ManagerNotificationModal from './ManagerNotificationModal';

export default function ManagerNotificationBadge() {
  const [bookings, setBookings] = useState<StrategyBooking[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBookingId, setActiveBookingId] = useState<string | undefined>(undefined);
  const [incomingAlert, setIncomingAlert] = useState<StrategyBooking | null>(null);

  const refresh = () => {
    setBookings(getStoredBookings());
  };

  useEffect(() => {
    refresh();

    const handleNewBooking = (e: any) => {
      const b: StrategyBooking = e.detail?.booking;
      refresh();
      if (b) {
        setIncomingAlert(b);
        setActiveBookingId(b.id);
      }
    };

    const handleUpdated = () => {
      refresh();
    };

    window.addEventListener('new_strategy_call_request', handleNewBooking);
    window.addEventListener('strategy_booking_updated', handleUpdated);
    return () => {
      window.removeEventListener('new_strategy_call_request', handleNewBooking);
      window.removeEventListener('strategy_booking_updated', handleUpdated);
    };
  }, []);

  const pendingCount = bookings.filter((b) => b.status === 'pending').length;

  return (
    <>
      {/* Real-time Manager Toast Alert upon Client Submission */}
      {incomingAlert && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 max-w-sm w-full p-4 rounded-2xl bg-[#171126] border border-[#7b5ac5] shadow-[0_16px_50px_rgba(123,90,197,0.4)] text-white animate-bounce-short">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-[12px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Manager Alert: New Request
              </span>
            </div>
            <button
              onClick={() => setIncomingAlert(null)}
              className="text-white/50 hover:text-white text-[14px] leading-none"
            >
              ✕
            </button>
          </div>

          <div className="mt-2 text-[13px] leading-snug">
            <strong className="text-white">{incomingAlert.name}</strong> from{' '}
            <strong className="text-[#be9bf8]">{incomingAlert.company}</strong> requested a Strategy Call ({incomingAlert.budget}).
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={() => {
                setActiveBookingId(incomingAlert.id);
                setIsModalOpen(true);
                setIncomingAlert(null);
              }}
              className="flex-1 py-1.5 px-3 rounded-lg bg-[#7b5ac5] hover:bg-[#8c6dd5] text-white text-[12px] font-semibold transition-colors cursor-pointer text-center"
            >
              Open Manager Terminal →
            </button>
            <button
              onClick={() => setIncomingAlert(null)}
              className="py-1.5 px-2.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white/70 text-[12px] transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Floating Manager Dashboard Quick Button (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40">
        <button
          onClick={() => {
            setActiveBookingId(undefined);
            setIsModalOpen(true);
          }}
          className="group flex items-center gap-2.5 px-3.5 py-2.5 rounded-full bg-[#181226]/90 hover:bg-[#201833] border border-[#7b5ac5]/40 hover:border-[#7b5ac5] text-white shadow-[0_12px_32px_rgba(123,90,197,0.3)] backdrop-blur-lg transition-all hover:scale-105 cursor-pointer"
          title="Open Manager Reception Portal"
        >
          <span className="flex h-2.5 w-2.5 relative">
            {pendingCount > 0 ? (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8c6dd5] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8c6dd5]"></span>
              </>
            ) : (
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
            )}
          </span>
          <span className="text-[12px] font-mono font-medium text-white/90">
            Manager Portal
          </span>
          {pendingCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-[#7b5ac5] text-white text-[10px] font-bold font-mono">
              {pendingCount}
            </span>
          )}
        </button>
      </div>

      {/* Modal Reception Terminal */}
      <ManagerNotificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialBookingId={activeBookingId}
      />
    </>
  );
}
