import React, { useState, useEffect } from 'react';
import {
  type StrategyBooking,
  getStoredBookings,
  updateBookingStatus,
  getFormattedManagerSummary,
  generateGoogleCalendarUrl,
  downloadICSFile
} from '../lib/bookingStore';

interface ManagerNotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBookingId?: string;
}

export default function ManagerNotificationModal({
  isOpen,
  onClose,
  initialBookingId
}: ManagerNotificationModalProps) {
  const [bookings, setBookings] = useState<StrategyBooking[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const loadBookings = () => {
    const list = getStoredBookings();
    setBookings(list);
    if (initialBookingId && list.some((b) => b.id === initialBookingId)) {
      setSelectedId(initialBookingId);
    } else if (list.length > 0 && !selectedId) {
      setSelectedId(list[0].id);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadBookings();
    }
  }, [isOpen, initialBookingId]);

  useEffect(() => {
    const handleUpdate = () => {
      loadBookings();
    };
    window.addEventListener('new_strategy_call_request', handleUpdate);
    window.addEventListener('strategy_booking_updated', handleUpdate);
    return () => {
      window.removeEventListener('new_strategy_call_request', handleUpdate);
      window.removeEventListener('strategy_booking_updated', handleUpdate);
    };
  }, []);

  if (!isOpen) return null;

  const currentBooking = bookings.find((b) => b.id === selectedId) || bookings[0];

  const handleCopySummary = () => {
    if (!currentBooking) return;
    const text = getFormattedManagerSummary(currentBooking);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleStatusChange = (newStatus: StrategyBooking['status']) => {
    if (!currentBooking) return;
    updateBookingStatus(currentBooking.id, newStatus);
    loadBookings();
    setActionSuccess(`Status updated to ${newStatus.toUpperCase()}`);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleAcceptAndSendInvite = () => {
    if (!currentBooking) return;
    updateBookingStatus(currentBooking.id, 'accepted', 'Calendar invitation confirmed and queued for dispatch.');
    loadBookings();
    
    // Open google calendar link in new tab or download ICS
    window.open(generateGoogleCalendarUrl(currentBooking), '_blank');
    setActionSuccess('Session Accepted! Calendar invitation opened.');
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const handleContactWhatsApp = () => {
    if (!currentBooking) return;
    const cleanPhone = currentBooking.phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello ${currentBooking.name}, this is Brightmenti Executive Strategy Team regarding your Strategy Session request for ${currentBooking.company}. We are ready to coordinate your 30-minute technical architecture call.`
    );
    updateBookingStatus(currentBooking.id, 'contacted');
    loadBookings();
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  const handleSendEmail = () => {
    if (!currentBooking) return;
    const subject = encodeURIComponent(`Brightmenti Strategy Session Confirmation — ${currentBooking.company}`);
    const body = encodeURIComponent(
      `Hi ${currentBooking.name},\n\nThank you for requesting a Strategy Session with Brightmenti.\n\n` +
      `We reviewed your objective:\n"${currentBooking.goal}"\n\n` +
      `We have reserved your preferred window: ${currentBooking.preferredTime}.\n\n` +
      `Please let us know if this time works best, or reply to adjust the schedule.\n\n` +
      `Best regards,\nBrightmenti Strategy Management Team`
    );
    updateBookingStatus(currentBooking.id, 'contacted');
    loadBookings();
    window.location.href = `mailto:${currentBooking.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-[#110e1a] border border-[#7b5ac5]/30 shadow-[0_24px_80px_rgba(123,90,197,0.35)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#181424]">
          <div className="flex items-center gap-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7b5ac5] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#8c6dd5]"></span>
            </span>
            <div>
              <h2 className="text-[17px] font-bold text-white flex items-center gap-2">
                Manager Reception Portal
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#7b5ac5]/20 text-[#be9bf8] border border-[#7b5ac5]/30">
                  Live Dispatch
                </span>
              </h2>
              <p className="text-[12px] text-[#9A9A9E]">Incoming Strategy Call Submissions & Client Relationship Management</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white/80 hover:text-white flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto flex flex-col md:flex-row">
          {/* Left Sidebar: Submissions Queue */}
          <div className="w-full md:w-72 border-b md:border-b-0 md:border-r border-white/[0.08] bg-[#14101e] p-4 flex flex-col gap-2 max-h-56 md:max-h-none overflow-y-auto">
            <div className="text-[11px] font-mono text-[#be9bf8] uppercase tracking-wider mb-1 flex items-center justify-between">
              <span>Submissions Queue ({bookings.length})</span>
            </div>

            {bookings.length === 0 ? (
              <div className="p-4 text-center text-[13px] text-white/40">
                No strategy call requests logged yet. Submit the "Book a Strategy Call" form to test!
              </div>
            ) : (
              bookings.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedId(b.id)}
                  className={`text-left p-3 rounded-xl border transition-all text-[13px] cursor-pointer ${
                    b.id === currentBooking?.id
                      ? 'bg-[#7b5ac5]/20 border-[#7b5ac5] text-white shadow-[0_4px_16px_rgba(123,90,197,0.25)]'
                      : 'bg-white/[0.03] border-white/[0.06] text-white/70 hover:bg-white/[0.07]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-white truncate">{b.name}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded capitalize ${
                        b.status === 'accepted'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : b.status === 'contacted'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : b.status === 'declined'
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-white/50 truncate">{b.company} • {b.industry}</div>
                  <div className="text-[10px] font-mono text-white/40 mt-1">
                    {new Date(b.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Right Main Area: Manager Received Request Terminal & Action Panel */}
          {currentBooking ? (
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              {actionSuccess && (
                <div className="p-3 rounded-xl bg-emerald-900/40 border border-emerald-500/40 text-emerald-300 text-[13px] flex items-center justify-between animate-fadeIn">
                  <span>✓ {actionSuccess}</span>
                  <button onClick={() => setActionSuccess(null)} className="text-emerald-400 font-bold ml-2">×</button>
                </div>
              )}

              {/* Exact Manager ASCII / Structured Terminal Card */}
              <div className="p-5 rounded-2xl bg-[#09070f] border border-[#7b5ac5]/30 font-mono text-[13px] text-[#e3d7fa] shadow-inner relative overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-[#7b5ac5]/25 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 inline-block"></span>
                    <span className="font-bold text-white tracking-wide">MANAGER RECEIVES:</span>
                  </div>
                  <button
                    onClick={handleCopySummary}
                    className="px-2.5 py-1 rounded bg-[#7b5ac5]/30 hover:bg-[#7b5ac5]/50 text-white text-[11px] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? '✓ Copied!' : '📋 Copy Summary'}
                  </button>
                </div>

                <div className="space-y-1.5 leading-relaxed">
                  <div className="text-white font-bold text-[14px]">New Strategy Call Request</div>
                  <div className="text-[#8c6dd5] tracking-tighter">────────────────────────────────────────</div>
                  <div className="grid grid-cols-[130px_1fr] gap-2">
                    <span className="text-white/50">Name:</span>
                    <span className="text-white font-semibold">{currentBooking.name}</span>

                    <span className="text-white/50">Company:</span>
                    <span className="text-white font-semibold">{currentBooking.company}</span>

                    <span className="text-white/50">Industry:</span>
                    <span className="text-[#be9bf8]">{currentBooking.industry}</span>

                    <span className="text-white/50">Budget:</span>
                    <span className="text-emerald-400 font-bold">{currentBooking.budget}</span>

                    <span className="text-white/50">Preferred Time:</span>
                    <span className="text-amber-300">{currentBooking.preferredTime}</span>

                    <span className="text-white/50">Objective:</span>
                    <span className="text-white/90 bg-white/[0.04] p-2 rounded border border-white/[0.06] block break-words">
                      {currentBooking.goal}
                    </span>

                    <span className="text-white/50">Phone:</span>
                    <span className="text-white">{currentBooking.phone}</span>

                    <span className="text-white/50">Email:</span>
                    <span className="text-white">{currentBooking.email}</span>

                    {currentBooking.website && (
                      <>
                        <span className="text-white/50">Website:</span>
                        <a href={currentBooking.website} target="_blank" rel="noreferrer" className="text-[#8c6dd5] underline">
                          {currentBooking.website}
                        </a>
                      </>
                    )}
                  </div>
                  <div className="text-[#8c6dd5] tracking-tighter pt-2">────────────────────────────────────────</div>
                  <div className="text-[11px] text-white/40 pt-1 flex items-center justify-between">
                    <span>ID: {currentBooking.id}</span>
                    <span>Received: {new Date(currentBooking.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Manager Accept & Contact Actions */}
              <div className="space-y-3">
                <div className="text-[12px] font-mono uppercase tracking-wider text-[#be9bf8] font-bold">
                  Manager Actions: Accept / Contact Client
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Action 1: Accept & Send Calendar Invite */}
                  <button
                    onClick={handleAcceptAndSendInvite}
                    className="p-3.5 rounded-xl bg-gradient-to-r from-[#7b5ac5] to-[#6040a8] hover:from-[#8c6dd5] hover:to-[#714bc4] text-white font-semibold text-[13px] flex flex-col items-center justify-center gap-1.5 shadow-[0_8px_20px_rgba(123,90,197,0.3)] transition-all cursor-pointer"
                  >
                    <span className="text-lg">📅</span>
                    <span>Accept & Send Invite</span>
                  </button>

                  {/* Action 2: Contact via WhatsApp */}
                  <button
                    onClick={handleContactWhatsApp}
                    className="p-3.5 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 font-semibold text-[13px] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span className="text-lg">💬</span>
                    <span>Contact on WhatsApp</span>
                  </button>

                  {/* Action 3: Direct Email Client */}
                  <button
                    onClick={handleSendEmail}
                    className="p-3.5 rounded-xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-200 font-semibold text-[13px] flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span className="text-lg">✉️</span>
                    <span>Email Client</span>
                  </button>
                </div>

                {/* Secondary tools: ICS Download & Status toggle */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-[12px]">
                  <div className="flex items-center gap-2">
                    <span className="text-white/60">Update Status:</span>
                    {(['pending', 'accepted', 'contacted', 'declined'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => handleStatusChange(st)}
                        className={`px-2.5 py-1 rounded text-[11px] font-mono uppercase transition-colors cursor-pointer ${
                          currentBooking.status === st
                            ? 'bg-[#7b5ac5] text-white font-bold'
                            : 'bg-white/[0.05] text-white/50 hover:bg-white/[0.1] hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => downloadICSFile(currentBooking)}
                    className="text-[#be9bf8] hover:text-white underline font-mono text-[11px] cursor-pointer"
                  >
                    Download .ICS Invite
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 p-12 text-center text-white/40 flex items-center justify-center">
              Select a booking request from the left queue to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
