import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";
import { Arrow, NAV, Pill } from "./ui";

function Logo({ small = false }: { small?: boolean }) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-display font-bold text-[var(--color-plum)] ${small ? "text-lg" : "text-xl"}`}>
      <span className={`grid place-items-center rounded-full bg-[var(--color-accent)] text-white ${small ? "h-7 w-7" : "h-8 w-8"}`}>
        <svg viewBox="0 0 24 24" className={small ? "h-3.5 w-3.5" : "h-4 w-4"} fill="currentColor"><path d="M12 2 4 7v10l8 5 8-5V7z" /></svg>
      </span>
      brightmenti
    </Link>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-full font-sans text-[var(--color-ink)]">
      <div className="mx-auto max-w-[1240px] px-4 pt-4 sm:px-6">
        <header className="sticky top-4 z-40 flex items-center justify-between rounded-full bg-white/70 px-3 py-2.5 pl-6 shadow-[0_10px_40px_-20px_rgba(61,31,110,.5)] ring-1 ring-white/60 backdrop-blur-xl">
          <Logo />
          <nav className="hidden items-center gap-7 text-[14px] font-medium md:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `transition-colors ${isActive ? "text-[var(--color-plum)]" : "text-[var(--color-mute)] hover:text-[var(--color-plum)]"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Pill to="/contact" className="!px-5 !py-2.5 !text-[14px]">Start a Project <Arrow className="h-3.5 w-3.5" /></Pill>
            <button
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full ring-1 ring-[var(--color-lavender-deep)] md:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-[var(--color-plum)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </header>

        {open && (
          <div className="mt-2 flex flex-col gap-1 rounded-3xl bg-white/80 p-3 ring-1 ring-white/60 backdrop-blur-xl md:hidden">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-[15px] font-medium ${isActive ? "bg-[var(--color-accent-soft)] text-[var(--color-plum)]" : "text-[var(--color-mute)]"}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      <main>
        <Outlet />
      </main>

      <footer className="mx-auto max-w-[1240px] px-4 pb-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-[var(--color-lavender-deep)] pt-8 sm:flex-row">
          <Logo small />
          <div className="flex flex-wrap justify-center gap-6 text-[14px] text-[var(--color-mute)]">
            {NAV.map((n) => (
              <Link key={n.to} to={n.to} className="hover:text-[var(--color-plum)]">{n.label}</Link>
            ))}
          </div>
          <p className="text-[13px] text-[var(--color-mute)]">© 2026 Brightmenti. Build. Automate. Market. Scale.</p>
        </div>
      </footer>
    </div>
  );
}
