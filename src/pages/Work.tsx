import { useState } from "react";
import { Arrow, CtaBand, PageHero, Pill, Reveal } from "../ui";

const FILTERS = ["All", "Websites", "Shopify", "E-commerce", "Software", "Mobile Apps", "Automation", "Marketing", "Creative"];

type Project = {
  title: string;
  industry: string;
  cats: string[];
  img: string;
  desc: string;
  placeholder?: boolean;
};

const PROJECTS: Project[] = [
  { title: "Lumen Skincare", industry: "D2C Beauty", cats: ["Shopify", "E-commerce", "Marketing"], img: "photo-1556228578-8c89e6adf883", desc: "Headless Shopify rebuild with subscription flow and paid-growth engine." },
  { title: "Northwind Logistics", industry: "Operations", cats: ["Software", "Automation"], img: "photo-1519389950473-47ba0277781c", desc: "Internal dispatch dashboard and workflow automation across 4 tools." },
  { title: "Cadence Fitness", industry: "Health & Fitness", cats: ["Mobile Apps", "Websites"], img: "photo-1571902943202-507ec2618e8f", desc: "Cross-platform training app with coaching and progress tracking." },
  { title: "Atlas Realty", industry: "Real Estate", cats: ["Websites", "Marketing"], img: "photo-1560518883-ce09059eeffa", desc: "Conversion-focused site and lead-gen funnel with CRM sync." },
  { title: "Brightbot Support", industry: "SaaS", cats: ["Automation", "Software"], img: "photo-1531482615713-2afd69097998", desc: "WhatsApp automation that resolves 60% of tickets before a human." },
  { title: "Vellum Studio", industry: "Creative", cats: ["Creative", "Websites"], img: "photo-1626785774573-4b799315345d", desc: "Brand identity, art direction and portfolio site for a design studio." },
];

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function Work() {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.cats.includes(active));

  return (
    <>
      <PageHero
        eyebrow="Our Work"
        title={<>Built to <span className="text-[var(--color-accent)]">perform.</span></>}
        sub="A look at the systems we design and ship. Case studies marked as placeholders are launching soon — real numbers only when verified."
      />

      <div className="rounded-t-[2.5rem] bg-[var(--color-panel)]">
        <div className="mx-auto max-w-[1240px] px-4 py-14 sm:px-6">
          {/* Filter bar */}
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                aria-pressed={active === f}
                className={`rounded-full px-4 py-2 text-[14px] font-medium transition-all ${
                  active === f
                    ? "bg-[var(--color-accent)] text-white shadow-[0_8px_20px_-8px_rgba(106,53,217,.6)]"
                    : "bg-white text-[var(--color-mute)] ring-1 ring-[var(--color-lavender-deep)] hover:text-[var(--color-plum)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {shown.length === 0 ? (
            <div className="mt-12 rounded-3xl bg-white p-16 text-center ring-1 ring-[var(--color-lavender-deep)]/60">
              <p className="font-display text-2xl font-bold text-[var(--color-plum)]">Case studies coming soon</p>
              <p className="mt-2 text-[15px] text-[var(--color-mute)]">We're preparing work in this category. Check back shortly.</p>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((p, idx) => (
                <Reveal key={p.title} delay={(idx % 3) * 70}>
                  <a href={`/work/${slug(p.title)}`} className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-[var(--color-lavender-deep)]/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_-30px_rgba(61,31,110,.5)]">
                    <div className="relative h-48 overflow-hidden bg-[var(--color-lavender)]">
                      <img
                        src={`https://images.unsplash.com/${p.img}?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=800&h=500`}
                        alt={`${p.title} — ${p.industry}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {p.placeholder && (
                        <span className="absolute left-3 top-3 rounded-full bg-[var(--color-plum)] px-3 py-1 text-[11px] font-semibold text-white">Placeholder</span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[12px] font-semibold uppercase tracking-wider text-[var(--color-accent)]">{p.industry}</p>
                      <h3 className="mt-1 font-display text-xl font-bold text-[var(--color-plum)]">{p.title}</h3>
                      <p className="mt-2 flex-1 text-[14px] leading-relaxed text-[var(--color-mute)]">{p.desc}</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {p.cats.map((c) => (
                          <span key={c} className="rounded-full bg-[var(--color-accent-soft)] px-2.5 py-1 text-[11px] font-medium text-[var(--color-accent)]">{c}</span>
                        ))}
                      </div>
                      <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--color-accent)]">
                        View case study <Arrow className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          )}
        </div>

        <CtaBand />
      </div>
    </>
  );
}
