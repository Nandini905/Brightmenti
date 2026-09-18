import React from 'react';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';
import StatCounter from '../components/StatCounter';
import ProcessStep from '../components/ProcessStep';
import ServiceCard from '../components/ServiceCard';
import PortfolioCard from '../components/PortfolioCard';
import EcosystemDiagram from '../components/EcosystemDiagram';
import { SERVICES } from '../content/services';
import { PORTFOLIO_PROJECTS } from '../content/portfolio';
import { STATS } from '../content/stats';

const CAPABILITIES = [
  'Digital Marketing & Paid Growth',
  'Web & Headless Shopify',
  'WhatsApp Cloud API Automation',
  'Custom Software & SaaS',
  'iOS & Android Mobile Apps',
  'Brand Identity & Design Systems',
  'Full-Funnel CRO Optimization',
  'Cloud Infrastructure & DevOps',
  'Commercial Production House'
];

const PAIN_POINTS = [
  {
    title: 'Siloed Agencies',
    desc: 'Marketers who cannot write a line of code, and developers who have never looked at CAC or conversion funnels.'
  },
  {
    title: 'Fragmented Tech Stacks',
    desc: 'Half-integrated tools, broken webhooks, and unreliable data pipelines bleeding attribution across channels.'
  },
  {
    title: 'Sluggish Conversion',
    desc: 'Bloated themes and heavy scripts causing 4+ second load times that destroy paid traffic ROI.'
  },
  {
    title: 'Manual Workflow Drudgery',
    desc: 'Customer support and operational teams drowning in repetitive tasks that should run autonomously.'
  },
  {
    title: 'Fragile Legacy Code',
    desc: 'Custom software full of technical debt, abandoned by past contractors with zero documentation.'
  },
  {
    title: 'Unleveraged WhatsApp Loops',
    desc: 'Treating instant messaging as an afterthought rather than a compounding conversational commerce engine.'
  },
  {
    title: 'Generic Aesthetic Fatigue',
    desc: 'Cookie-cutter website templates that fail to build authority or trust with high-ticket enterprise buyers.'
  },
  {
    title: 'Leaking Ad Spend',
    desc: 'Scaling ad budgets into broken landing pages with zero personalization or dynamic checkout logic.'
  },
  {
    title: 'Unstable Infrastructure',
    desc: 'Servers crashing or throttling during promotional flash drops and high-velocity traffic surges.'
  }
];

const PILLARS = [
  {
    num: '01',
    title: 'Engineering-Led Thinking',
    desc: 'We approach growth with the rigor of software architecture: clean abstractions, deterministic telemetry, and scalable systems.'
  },
  {
    num: '02',
    title: 'Unified Ecosystem Execution',
    desc: 'Your storefront, CRM, ad channels, WhatsApp bots, and cloud servers operate as one synchronized revenue engine.'
  },
  {
    num: '03',
    title: 'Zero-Fluff Accountability',
    desc: 'No vanity metrics or decorative slideshows. We track contribution margin, conversion throughput, and uptime SLA.'
  },
  {
    num: '04',
    title: 'High-Velocity Sprint Cadence',
    desc: 'Rapid iteration cycles with institutional-grade quality. We move from technical audit to production deployment in weeks.'
  },
  {
    num: '05',
    title: 'Enterprise Scalability',
    desc: 'Engineered from day one to handle 10x traffic surges, automated high-volume retention, and multi-region edge reliability.'
  }
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery & Technical Audit',
    description: 'We conduct a comprehensive diagnostic of your existing architecture, codebases, conversion funnels, and operational bottlenecks.',
    deliverables: ['Tech Stack Audit', 'Funnel Friction Analysis', 'Architecture Gap Assessment']
  },
  {
    step: '02',
    title: 'Architectural Blueprint & Strategy',
    description: 'We construct a deterministic engineering and growth roadmap, selecting optimal frameworks, APIs, and retention workflows.',
    deliverables: ['System Architecture Diagram', 'GTM Growth Plan', 'Milestone Schedule']
  },
  {
    step: '03',
    title: 'High-Velocity Build & Integration',
    description: 'Full-stack engineering of web platforms, custom middleware, WhatsApp automations, and ad creative suites in dedicated sprints.',
    deliverables: ['Next.js/Shopify Codebase', 'API Webhook Pipelines', 'Design System Library']
  },
  {
    step: '04',
    title: 'Rigorous Testing & Optimization',
    description: 'Stress testing, cross-device responsiveness verification, checkout audit, and end-to-end security compliance validation.',
    deliverables: ['Performance Benchmark >90', 'Security Hardening', 'Telemetry Verification']
  },
  {
    step: '05',
    title: 'Launch, Automation & Compounding Scale',
    description: 'Zero-downtime production deployment, real-time observability telemetry, and continuous experimentation loops for compounding scale.',
    deliverables: ['Production Edge Deploy', '24/7 Monitoring Dashboard', 'Growth Optimization Sprints']
  }
];

export default function Home() {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      <section className="relative pt-12 sm:pt-16 lg:pt-20 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_top,_rgba(123,90,197,0.16),_transparent_46%)]" />
        <div className="absolute left-1/2 top-28 -translate-x-1/2 h-[440px] w-[440px] rounded-full bg-[rgba(236,224,255,0.8)] blur-3xl" />
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative">
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 border border-[#dcc9f2] text-[12px] font-mono text-[#2b1d3a] shadow-[0_10px_30px_rgba(123,90,197,0.06)] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Accepting Select Q2/Q3 Projects ? 4 Discovery Slots Available</span>
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-w-2xl">
              <h1 className="font-display text-[40px] sm:text-[56px] md:text-[66px] lg:text-[78px] font-extrabold tracking-[-0.06em] text-[#1d1630] leading-[0.96] mb-6">
                Build. Automate. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7b5ac5] via-[#5e4d6d] to-[#8c6dd5]">
                  Market. Scale.
                </span>
              </h1>

              <p className="text-[17px] sm:text-[20px] text-[#5e4d6d] leading-relaxed max-w-xl mb-10">
                Brightmenti engineers unified digital ecosystems: high-converting web software, headless Shopify architectures, automated WhatsApp engines, and compounding growth campaigns.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button to="/book-a-strategy-call" variant="primary" size="lg" icon trackingEvent="book_strategy_call_click" trackingProps={{ location: 'hero' }}>
                  Book a Strategy Call ?
                </Button>
                <Button to="/contact" variant="secondary" size="lg" trackingEvent="start_project_click" trackingProps={{ location: 'hero' }}>
                  Start a Project ?
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="editorial-shell p-5 sm:p-7">
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-[#e8dafd] blur-xl" />
                <div className="absolute -left-8 bottom-10 h-24 w-24 rounded-full bg-[#f3d8f2] blur-xl" />
                <div className="relative rounded-[28px] bg-[linear-gradient(180deg,#f8f3ff_0%,#f0e7ff_100%)] border border-[#dcc9f2] p-4 sm:p-5 shadow-[0_24px_60px_rgba(94,70,128,0.08)]">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#6040a8]">Ecosystem</div>
                      <div className="mt-2 font-display text-[22px] font-extrabold text-[#1d1630]">Brightmenti OS</div>
                    </div>
                    <div className="rounded-full border border-[#dcc9f2] bg-white px-3 py-1 text-[10px] font-mono uppercase tracking-[0.16em] text-[#6040a8]">Live</div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white border border-[#ecdefa] p-4 shadow-[0_12px_26px_rgba(91,63,121,0.04)]">
                      <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#7a6c88]">Growth</div>
                      <div className="mt-4 font-display text-[30px] font-extrabold tracking-[-0.05em] text-[#1d1630]">42%</div>
                      <div className="mt-1 text-[12px] text-[#5e4d6d]">channel velocity lift</div>
                    </div>
                    <div className="rounded-2xl bg-[#f4eeff] border border-[#dcc9f2] p-4 shadow-[0_12px_26px_rgba(91,63,121,0.04)]">
                      <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#7a6c88]">Automation</div>
                      <div className="mt-4 font-display text-[30px] font-extrabold tracking-[-0.05em] text-[#1d1630]">24/7</div>
                      <div className="mt-1 text-[12px] text-[#5e4d6d]">operational coverage</div>
                    </div>
                    <div className="sm:col-span-2 rounded-2xl bg-[#1d1630] p-4 text-white">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#d5c5f5]">Stack</div>
                          <div className="mt-2 text-[15px] font-medium">Web + Shopify + CRM + WhatsApp</div>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
                          <svg viewBox="0 0 24 24" className="h-4 w-4 text-[#d5c5f5]" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-5 -left-5 rounded-[20px] border border-[#dcc9f2] bg-white/80 p-3 shadow-[0_20px_30px_rgba(91,63,121,0.08)] backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f1e7ff] text-[#6040a8]">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12h16M12 4v16" /></svg>
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#7a6c88]">Connected</div>
                    <div className="text-[13px] font-semibold text-[#1d1630]">Unified growth engine</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 sm:mt-20">
            {STATS.map((stat, idx) => (
              <StatCounter key={idx} value={stat.value} label={stat.label} subtext={stat.subtext} isPlaceholder={stat.isPlaceholder} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-6 border-y border-[#dcc9f2] bg-[rgba(255,255,255,0.45)] backdrop-blur-md overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar py-2">
            {CAPABILITIES.map((cap, idx) => (
              <div key={idx} className="flex-shrink-0 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#dcc9f2] text-[13px] font-mono text-[#2d1d3a] whitespace-nowrap shadow-[0_8px_18px_rgba(123,90,197,0.04)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7b5ac5]" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="The Growth Bottleneck" title="Why fragmented digital agencies fail modern companies" description="Most companies hire one agency for ads, a separate shop for code, a freelance designer for branding, and manage automations on spreadsheets. The result is zero synergy and leaking revenue." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAIN_POINTS.map((pt, idx) => (
            <div key={idx} className="p-6 rounded-[24px] bg-white/75 border border-[#e6dff4] hover:border-[#c5afd9] transition-all shadow-[0_12px_30px_rgba(96,72,128,0.04)] group">
              <div className="flex items-center gap-2 text-[#8b5d63] font-mono text-[13px] mb-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f3ecff] text-[#6040a8]">{idx + 1}</span>
                <span className="font-semibold">{pt.title}</span>
              </div>
              <p className="text-[14px] text-[#5e4d6d] leading-relaxed">{pt.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 rounded-[32px] bg-[linear-gradient(135deg,#fff_0%,#f5eeff_50%,#fff_100%)] border border-[#dcc9f2] text-center shadow-[0_22px_45px_rgba(94,70,128,0.08)]">
          <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-[#6040a8] mb-2">The Solution</p>
          <h3 className="font-display text-[26px] sm:text-[32px] font-extrabold text-[#1d1630]">Brightmenti brings the pieces together.</h3>
          <p className="text-[15px] text-[#5e4d6d] max-w-xl mx-auto mt-2">One engineering and growth partner unifying your software, checkout architecture, conversational workflows, and acquisition loops.</p>
          <div className="mt-6">
            <Button to="/services" variant="primary" size="md">Explore the 10 Disciplines ?</Button>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="Specialized Capabilities" title="Engineered disciplines designed to compound" description="Every service category is built to operate either as an institutional-grade standalone engagement or as an integrated component of your overarching growth engine." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <EcosystemDiagram />
      </section>

      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#dcc9f2] text-[12px] font-mono uppercase tracking-[0.18em] text-[#6040a8] mb-3 shadow-[0_10px_25px_rgba(123,90,197,0.06)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7b5ac5]" />
              Selected Architectures
            </div>
            <h2 className="font-display text-[28px] sm:text-[36px] md:text-[44px] font-extrabold text-[#1d1630] tracking-[-0.05em]">Featured Case Studies</h2>
          </div>
          <Button to="/portfolio" variant="secondary" size="md">View All Work & Filters ?</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_PROJECTS.slice(0, 3).map((project) => (
            <PortfolioCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-[32px] bg-[rgba(255,255,255,0.72)] border border-[#e6dff4] relative overflow-hidden shadow-[0_18px_40px_rgba(94,70,128,0.08)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(123,90,197,0.12),_transparent_30%)]" />
          <div className="relative z-10 max-w-2xl mb-8">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f3edf8] border border-[#dcc9f2] text-[12px] font-mono uppercase tracking-[0.18em] text-[#6040a8] mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7b5ac5]" />
              Discipline 10 / Media Studio
            </span>
            <h2 className="font-display text-[30px] sm:text-[40px] font-extrabold text-[#1d1630] leading-tight">Commercial Production House</h2>
            <p className="text-[16px] text-[#5e4d6d] mt-3 leading-relaxed">High-converting brand cinematography, studio editorial photography, 3D product motion, and vertical video suites engineered specifically to maximize ad click-through rates.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#e6dff4] bg-[#f0e7fa]">
              <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=600&h=450" alt="Studio Cinematography" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#e6dff4] bg-[#f0e7fa]">
              <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=600&h=450" alt="Editorial Photography" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="aspect-[4/3] rounded-xl overflow-hidden border border-[#e6dff4] bg-[#f0e7fa] sm:col-span-2 lg:col-span-1">
              <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=600&h=450" alt="Product Direction" loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="Our Standard" title="The 5 Pillars of Brightmenti" description="We built Brightmenti to be the technical and growth partner we wished existed when running venture-backed technology companies." />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PILLARS.map((pillar) => (
            <div key={pillar.num} className="p-6 sm:p-8 rounded-[24px] bg-white/75 border border-[#e6dff4] hover:border-[#c5afd9] transition-all shadow-[0_12px_30px_rgba(96,72,128,0.04)]">
              <span className="font-mono text-[14px] font-bold text-[#6040a8]">{pillar.num}</span>
              <h3 className="font-display text-[20px] font-extrabold text-[#1d1630] mt-3 mb-2">{pillar.title}</h3>
              <p className="text-[14px] text-[#5e4d6d] leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading eyebrow="Methodology" title="A deterministic path from discovery to scale" description="How we engage with your leadership team: transparent milestones, high velocity, and production-tested delivery." />

        <div className="max-w-3xl">
          {PROCESS_STEPS.map((step, idx) => (
            <ProcessStep key={step.step} step={step.step} title={step.title} description={step.description} deliverables={step.deliverables} isLast={idx === PROCESS_STEPS.length - 1} />
          ))}
        </div>
      </section>

      <section className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="relative p-10 sm:p-16 rounded-[32px] bg-[linear-gradient(135deg,#f9f4ff_0%,#f2e9ff_50%,#f8f2ff_100%)] border border-[#dcc9f2] text-center overflow-hidden shadow-[0_22px_48px_rgba(94,70,128,0.08)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(123,90,197,0.12),_transparent_45%)]" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-[#dcc9f2] text-[12px] font-mono uppercase tracking-[0.18em] text-[#6040a8] mb-4">Immediate Engagement</span>
            <h2 className="font-display text-[32px] sm:text-[48px] font-extrabold text-[#1d1630] leading-tight">Ready to engineer your digital growth ecosystem?</h2>
            <p className="mt-4 text-[16px] sm:text-[18px] text-[#5e4d6d] leading-relaxed">Schedule a technical strategy consultation with our directors to audit your bottlenecks and map a high-velocity execution plan.</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button to="/book-a-strategy-call" variant="primary" size="lg" trackingEvent="book_strategy_call_click" trackingProps={{ location: 'final_cta' }}>Book a Strategy Call ?</Button>
              <Button href="https://wa.me/?text=Hi%20Brightmenti,%20I%20would%20like%20to%20discuss%20a%20project." variant="secondary" size="lg" trackingEvent="whatsapp_click" trackingProps={{ location: 'final_cta' }}>Chat on WhatsApp ?</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
