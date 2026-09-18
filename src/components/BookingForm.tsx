import React, { useState } from 'react';
import { BUDGET_OPTIONS, validateBookingForm, type BookingFormData } from '../lib/validation';
import { trackEvent } from '../lib/analytics';
import {
  createStrategyBooking,
  type StrategyBooking,
  generateGoogleCalendarUrl,
  downloadICSFile
} from '../lib/bookingStore';
import Button from './Button';

export default function BookingForm() {
  const calEmbedUrl = import.meta.env.VITE_CAL_EMBED_URL;

  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    industry: 'D2C & E-Commerce',
    goal: '',
    budget: BUDGET_OPTIONS[1],
    preferredTime: 'Morning (09:00 - 12:00 EST)'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedRecord, setBookedRecord] = useState<StrategyBooking | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [isManagerModalOpen, setIsManagerModalOpen] = useState(false);

  if (calEmbedUrl) {
    return (
      <div className="w-full rounded-3xl overflow-hidden bg-[#121214] border border-white/[0.08] min-h-[650px]">
        <iframe
          src={calEmbedUrl}
          title="Brightmenti Strategy Session Scheduler"
          className="w-full h-[650px] border-0"
          loading="lazy"
        />
      </div>
    );
  }

  const handleFieldChange = (field: keyof BookingFormData, value: string) => {
    if (!hasStarted) {
      setHasStarted(true);
      trackEvent('booking_started');
    }
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBookingForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create and persist booking in store & trigger manager notifications
      const newBooking = createStrategyBooking(formData);

      // 2. Dispatch to backend API
      await fetch('/api/lead?type=booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'booking', data: formData })
      }).catch(() => null);

      setBookedRecord(newBooking);
      trackEvent('booking_completed', {
        industry: formData.industry,
        preferredTime: formData.preferredTime
      });
    } catch {
      // Fallback
      const fallbackBooking = createStrategyBooking(formData);
      setBookedRecord(fallbackBooking);
    } finally {
      setIsSubmitting(false);
    }
  };

  // CLIENT CONFIRMATION SCREEN
  if (bookedRecord) {
    return (
      <>
        <div className="p-8 sm:p-12 rounded-3xl bg-[#12101c]/90 border border-[#7b5ac5]/30 text-center max-w-2xl mx-auto backdrop-blur-2xl shadow-[0_20px_70px_rgba(123,90,197,0.18)] animate-fadeIn">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[12px] font-mono uppercase tracking-[0.16em] text-emerald-400 mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            Booking Request Confirmed • Manager Notified
          </div>

          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#7b5ac5]/20 to-[#6040a8]/30 border border-[#7b5ac5]/50 text-[#be9bf8] flex items-center justify-center mx-auto mb-4 text-3xl font-bold shadow-[0_8px_24px_rgba(123,90,197,0.3)]">
            ✓
          </div>

          <h3 className="font-display text-[26px] sm:text-[32px] font-bold text-[#F5F5F4] mb-2 tracking-tight">
            Strategy Session Logged
          </h3>
          
          <p className="text-[15px] sm:text-[16px] text-[#b0a4c4] leading-relaxed mb-6 max-w-lg mx-auto">
            Thank you, <strong className="text-white">{bookedRecord.name}</strong>. Your request for <strong className="text-white">{bookedRecord.company}</strong> has been transmitted directly to our Managing Director.
          </p>

          {/* Submission Details Summary Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0d0917] border border-[#7b5ac5]/20 text-left mb-8 space-y-3 font-mono text-[13px]">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-[11px] text-white/50">
              <span>REFERENCE ID: <strong className="text-[#be9bf8]">{bookedRecord.id}</strong></span>
              <span>{new Date(bookedRecord.createdAt).toLocaleDateString()}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white/80">
              <div>
                <span className="text-white/40 block text-[11px]">CLIENT:</span>
                <span className="font-semibold text-white">{bookedRecord.name}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[11px]">COMPANY & INDUSTRY:</span>
                <span className="font-semibold text-white">{bookedRecord.company} ({bookedRecord.industry})</span>
              </div>
              <div>
                <span className="text-white/40 block text-[11px]">PREFERRED WINDOW:</span>
                <span className="text-amber-300">{bookedRecord.preferredTime}</span>
              </div>
              <div>
                <span className="text-white/40 block text-[11px]">ALLOCATED BUDGET:</span>
                <span className="text-emerald-400 font-bold">{bookedRecord.budget}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/[0.06]">
              <span className="text-white/40 block text-[11px] mb-1">OBJECTIVE:</span>
              <p className="text-white/90 bg-white/[0.03] p-2.5 rounded-lg border border-white/[0.05] leading-snug">
                {bookedRecord.goal}
              </p>
            </div>
          </div>

          {/* Next Steps Workflow */}
          <div className="mb-8 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-left">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[#be9bf8] mb-3 font-bold">
              What Happens Next:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[12px] text-white/70">
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="font-bold text-white mb-0.5">1. Routing</div>
                <div>Manager receives request notification.</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="font-bold text-white mb-0.5">2. Architect Review</div>
                <div>Technical lead maps preliminary sprint.</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                <div className="font-bold text-white mb-0.5">3. Calendar Invite</div>
                <div>Meeting link sent to {bookedRecord.email}.</div>
              </div>
            </div>
          </div>

          {/* Client Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => window.open(generateGoogleCalendarUrl(bookedRecord), '_blank')}
              className="px-4 py-2.5 rounded-xl bg-[#7b5ac5] hover:bg-[#8c6dd5] text-white font-medium text-[13px] transition-all flex items-center gap-2 cursor-pointer shadow-[0_8px_20px_rgba(123,90,197,0.3)]"
            >
              <span>📅</span>
              <span>Add to Google Calendar</span>
            </button>

            <button
              onClick={() => downloadICSFile(bookedRecord)}
              className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-medium text-[13px] border border-white/[0.1] transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>📥</span>
              <span>Download .ICS</span>
            </button>

            <Button
              onClick={() => {
                setBookedRecord(null);
                setFormData({
                  name: '',
                  company: '',
                  email: '',
                  phone: '',
                  website: '',
                  industry: 'D2C & E-Commerce',
                  goal: '',
                  budget: BUDGET_OPTIONS[1],
                  preferredTime: 'Morning (09:00 - 12:00 EST)'
                });
              }}
              variant="secondary"
              size="md"
            >
              Book Another Session
            </Button>
          </div>
        </div>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-10 rounded-3xl bg-[#121214]/80 border border-white/[0.08] backdrop-blur-xl space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="bk-name" className="block text-[13px] font-medium text-[#F5F5F4] mb-2">
            Full Name <span className="text-[#5B7FFF]">*</span>
          </label>
          <input
            id="bk-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-3 rounded-xl bg-[#17171A] border border-white/[0.1] text-white placeholder-white/30 focus:border-[#5B7FFF] focus:outline-none transition-colors text-[14px]"
          />
          {errors.name && <p className="mt-1.5 text-[12px] text-red-400 font-mono">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="bk-company" className="block text-[13px] font-medium text-[#F5F5F4] mb-2">
            Company / Brand <span className="text-[#5B7FFF]">*</span>
          </label>
          <input
            id="bk-company"
            type="text"
            required
            value={formData.company}
            onChange={(e) => handleFieldChange('company', e.target.value)}
            placeholder="ABC Retail"
            className="w-full px-4 py-3 rounded-xl bg-[#17171A] border border-white/[0.1] text-white placeholder-white/30 focus:border-[#5B7FFF] focus:outline-none transition-colors text-[14px]"
          />
          {errors.company && <p className="mt-1.5 text-[12px] text-red-400 font-mono">{errors.company}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="bk-email" className="block text-[13px] font-medium text-[#F5F5F4] mb-2">
            Work Email Address <span className="text-[#5B7FFF]">*</span>
          </label>
          <input
            id="bk-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            placeholder="john@abc.com"
            className="w-full px-4 py-3 rounded-xl bg-[#17171A] border border-white/[0.1] text-white placeholder-white/30 focus:border-[#5B7FFF] focus:outline-none transition-colors text-[14px]"
          />
          {errors.email && <p className="mt-1.5 text-[12px] text-red-400 font-mono">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="bk-phone" className="block text-[13px] font-medium text-[#F5F5F4] mb-2">
            Phone / WhatsApp <span className="text-[#5B7FFF]">*</span>
          </label>
          <input
            id="bk-phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            placeholder="+1 (555) 019-2834"
            className="w-full px-4 py-3 rounded-xl bg-[#17171A] border border-white/[0.1] text-white placeholder-white/30 focus:border-[#5B7FFF] focus:outline-none transition-colors text-[14px]"
          />
          {errors.phone && <p className="mt-1.5 text-[12px] text-red-400 font-mono">{errors.phone}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="bk-website" className="block text-[13px] font-medium text-[#F5F5F4] mb-2">
            Website URL (Optional)
          </label>
          <input
            id="bk-website"
            type="url"
            value={formData.website}
            onChange={(e) => handleFieldChange('website', e.target.value)}
            placeholder="https://abc.com"
            className="w-full px-4 py-3 rounded-xl bg-[#17171A] border border-white/[0.1] text-white placeholder-white/30 focus:border-[#5B7FFF] focus:outline-none transition-colors text-[14px]"
          />
        </div>

        <div>
          <label htmlFor="bk-industry" className="block text-[13px] font-medium text-[#F5F5F4] mb-2">
            Industry Vertical <span className="text-[#5B7FFF]">*</span>
          </label>
          <select
            id="bk-industry"
            value={formData.industry}
            onChange={(e) => handleFieldChange('industry', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#17171A] border border-white/[0.1] text-white focus:border-[#5B7FFF] focus:outline-none transition-colors text-[14px]"
          >
            <option value="E-Commerce">E-Commerce</option>
            <option value="D2C & E-Commerce">D2C & E-Commerce</option>
            <option value="SaaS & Cloud Software">SaaS & Cloud Software</option>
            <option value="Fintech & Web3">Fintech & Web3</option>
            <option value="Healthcare & Wellness">Healthcare & Wellness</option>
            <option value="Professional Services & Advisory">Professional Services & Advisory</option>
            <option value="Enterprise & Supply Chain">Enterprise & Supply Chain</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="bk-budget" className="block text-[13px] font-medium text-[#F5F5F4] mb-2">
            Target Budget Allocation <span className="text-[#5B7FFF]">*</span>
          </label>
          <select
            id="bk-budget"
            value={formData.budget}
            onChange={(e) => handleFieldChange('budget', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#17171A] border border-white/[0.1] text-white focus:border-[#5B7FFF] focus:outline-none transition-colors text-[14px]"
          >
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="bk-time" className="block text-[13px] font-medium text-[#F5F5F4] mb-2">
            Preferred Time Window <span className="text-[#5B7FFF]">*</span>
          </label>
          <select
            id="bk-time"
            value={formData.preferredTime}
            onChange={(e) => handleFieldChange('preferredTime', e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#17171A] border border-white/[0.1] text-white focus:border-[#5B7FFF] focus:outline-none transition-colors text-[14px]"
          >
            <option value="Morning (09:00 - 12:00 EST)">Morning (09:00 - 12:00 EST)</option>
            <option value="Afternoon (12:00 - 16:00 EST)">Afternoon (12:00 - 16:00 EST)</option>
            <option value="Late Afternoon (16:00 - 18:00 EST)">Late Afternoon (16:00 - 18:00 EST)</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="bk-goal" className="block text-[13px] font-medium text-[#F5F5F4] mb-2">
          Primary Strategy Objective <span className="text-[#5B7FFF]">*</span>
        </label>
        <textarea
          id="bk-goal"
          required
          rows={3}
          value={formData.goal}
          onChange={(e) => handleFieldChange('goal', e.target.value)}
          placeholder="What is the single most critical challenge or architecture need you would like to solve in this session?"
          className="w-full px-4 py-3 rounded-xl bg-[#17171A] border border-white/[0.1] text-white placeholder-white/30 focus:border-[#5B7FFF] focus:outline-none transition-colors text-[14px]"
        />
        {errors.goal && <p className="mt-1.5 text-[12px] text-red-400 font-mono">{errors.goal}</p>}
      </div>

      <div className="pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {isSubmitting ? 'Confirming Availability...' : 'Book a Strategy Call ?'}
        </Button>
      </div>
    </form>
  );
}
