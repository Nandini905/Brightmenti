import React from 'react';
import BookingForm from '../components/BookingForm';

export default function Booking() {
  return (
    <div className="min-h-screen py-12 sm:py-20 pb-24">
      {/* Header */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12px] font-mono uppercase tracking-[0.18em] text-[#5B7FFF] mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5B7FFF]" />
          Executive Consultation
        </div>

        <h1 className="font-display text-[36px] sm:text-[48px] md:text-[56px] font-extrabold tracking-tight text-[#F5F5F4] leading-[1.08] max-w-3xl mx-auto">
          Book a Strategy Call
        </h1>

        <p className="mt-4 text-[16px] sm:text-[18px] text-[#9A9A9E] max-w-xl mx-auto leading-relaxed">
          Direct, zero-fluff 30-minute technical session. We diagnose existing operational bottlenecks and map high-velocity implementation sprints.
        </p>
      </section>

      {/* Main Booking Interface */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <BookingForm />

        {/* Supporting Notes (Minimal distraction) */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-[13px] font-bold text-white mb-1">Direct Engineering Leads</div>
            <div className="text-[12px] text-[#9A9A9E]">You speak with architects, not account reps.</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-[13px] font-bold text-white mb-1">Confidential & Protected</div>
            <div className="text-[12px] text-[#9A9A9E]">Mutual NDA executed automatically.</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="text-[13px] font-bold text-white mb-1">Actionable Blueprint</div>
            <div className="text-[12px] text-[#9A9A9E]">Receive immediate technical clarity.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
