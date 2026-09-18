import React from 'react';
import { Link } from 'react-router';
import ContactForm from '../components/ContactForm';
import Button from '../components/Button';

export default function Contact() {
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '';
  const message = encodeURIComponent('Hi Brightmenti team, I would like to discuss a project.');
  const whatsappUrl = whatsappNumber ? `https://wa.me/${whatsappNumber}?text=${message}` : 'https://wa.me/?text=' + message;

  return (
    <div className="space-y-16 sm:space-y-24 py-12 sm:py-20 pb-24">
      {/* Header */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[12px] font-mono uppercase tracking-[0.18em] text-[#5B7FFF] mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5B7FFF]" />
          Direct Ingestion Pipeline
        </div>

        <h1 className="font-display text-[36px] sm:text-[52px] md:text-[68px] font-extrabold tracking-tight text-[#F5F5F4] leading-[1.06] max-w-4xl mx-auto">
          Start a Project with Brightmenti
        </h1>

        <p className="mt-6 text-[18px] sm:text-[20px] text-[#9A9A9E] leading-relaxed max-w-2xl mx-auto">
          Submit your project requirements, technical constraints, or growth objectives. Our engineering leads review all submissions and respond within 24 hours.
        </p>
      </section>

      {/* Form Container */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6">
        <ContactForm />

        {/* Alternative Actions: Booking & WhatsApp */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-[#121214] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="text-[12px] font-mono text-[#5B7FFF] uppercase tracking-wider mb-2">
                Real-Time Session
              </div>
              <h3 className="font-display text-[18px] font-bold text-white mb-2">
                Need an immediate consultation?
              </h3>
              <p className="text-[14px] text-[#9A9A9E] mb-4">
                Schedule a 30-minute architecture discovery call directly with our technical director.
              </p>
            </div>
            <Button to="/book-a-strategy-call" variant="secondary" size="sm">
              Book a Strategy Call ?
            </Button>
          </div>

          <div className="p-6 rounded-2xl bg-[#121214] border border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="text-[12px] font-mono text-emerald-400 uppercase tracking-wider mb-2">
                Direct Messaging
              </div>
              <h3 className="font-display text-[18px] font-bold text-white mb-2">
                Prefer instant messaging?
              </h3>
              <p className="text-[14px] text-[#9A9A9E] mb-4">
                Connect directly with our team on WhatsApp for quick inquiries or scoping questions.
              </p>
            </div>
            <Button href={whatsappUrl} variant="secondary" size="sm">
              Chat on WhatsApp ?
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
