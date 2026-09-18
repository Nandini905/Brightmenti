import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function Pill({
  children,
  variant = "solid",
  className = "",
  to,
}: {
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  className?: string;
  to?: string;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-all duration-200 active:scale-[.97]";
  const styles =
    variant === "solid"
      ? "bg-[var(--color-accent)] text-white shadow-[0_10px_30px_-8px_rgba(106,53,217,.55)] hover:shadow-[0_14px_36px_-8px_rgba(106,53,217,.7)] hover:-translate-y-0.5"
      : "bg-white/70 text-[var(--color-grape)] ring-1 ring-[var(--color-lavender-deep)] hover:bg-white";
  const cls = `${base} ${styles} ${className}`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return <button className={cls}>{children}</button>;
}

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setShown(true), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      {children}
    </div>
  );
}

/** Section eyebrow + heading block, reused across pages. */
export function PageHero({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-[1240px] px-4 pt-14 pb-8 text-center sm:px-6 lg:pt-20">
      <Reveal>
        <p className="text-[12px] font-semibold uppercase tracking-[.2em] text-[var(--color-accent)]">{eyebrow}</p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-[44px] font-bold leading-[1.04] tracking-tight text-[var(--color-plum)] sm:text-[60px]">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-[var(--color-mute)]">{sub}</p>
        {children && <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>}
      </Reveal>
    </section>
  );
}

/** Purple glow CTA band shared by every page. */
export function CtaBand() {
  return (
    <div className="mx-auto max-w-[1240px] px-4 pb-24 sm:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[var(--color-plum)] px-8 py-16 text-center sm:px-12">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[var(--color-accent)]/40 blur-2xl" />
          <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-[#a06bff]/30 blur-2xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-[34px] font-bold leading-tight text-white sm:text-[48px]">
              Let's build the system your growth deserves
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[17px] text-white/70">
              Book a strategy call and we'll map the fastest path from where you are to where you want to scale.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Pill to="/contact" className="!bg-white !text-[var(--color-plum)]">Book a Strategy Call <Arrow className="h-4 w-4" /></Pill>
              <button className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold text-white ring-1 ring-white/30 transition-colors hover:bg-white/10">
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export const NAV = [
  { label: "Services", to: "/services" },
  { label: "Work", to: "/work" },
  { label: "Ecosystem", to: "/ecosystem" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const HERO_IMG =
  "https://images.unsplash.com/photo-1561577724-507645521eaa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

export const AVATARS = [
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=120&h=120",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=120&h=120",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=120&h=120",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=120&h=120",
];

export const SERVICES = [
  { t: "Digital Marketing", d: "Performance campaigns, SEO and content that compound.", i: "M3 3v18h18M7 14l3-3 3 3 5-6" },
  { t: "Web & Shopify", d: "Fast, conversion-first storefronts and sites.", i: "M4 5h16v14H4zM4 9h16" },
  { t: "Custom Software", d: "Web apps and platforms built to your logic.", i: "M8 6 3 12l5 6M16 6l5 6-5 6M13 4l-2 16" },
  { t: "WhatsApp Automation", d: "Turn conversations into a revenue engine.", i: "M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.2A9 9 0 1 0 12 3z" },
  { t: "Mobile Apps", d: "Native-feel apps for iOS and Android.", i: "M7 3h10v18H7zM11 18h2" },
  { t: "Production House", d: "Video, photography and brand creative.", i: "M4 6h12v12H4zM16 9l4-2v10l-4-2" },
];
