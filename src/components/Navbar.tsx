import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import { NAV_LINKS } from "../data/content";
import { useScroll } from "../hooks/useUi";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { y, dir, progress } = useScroll();
  const scrolled = y > 24;
  const hidden = dir === "down" && y > 400 && !open;
  return (
    <header className={`sticky top-0 z-50 border-b transition-all duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"} ${scrolled ? "border-white/10 bg-ink-950/90 shadow-[0_10px_40px_-20px_rgba(11,92,255,.6)] backdrop-blur-xl" : "border-transparent bg-ink-950/50 backdrop-blur-md"}`}>
      <div aria-hidden className="absolute inset-x-0 top-0 h-0.5 origin-left bg-grad-text" style={{ transform: `scaleX(${progress})` }} />
      <div className={`mx-auto flex max-w-[1280px] items-center justify-between px-5 transition-all duration-300 sm:px-8 ${scrolled ? "h-16" : "h-20"}`}>
        <Link to="/" onClick={() => setOpen(false)} aria-label="Webiie home">
          <img src="/assets/logo.png" alt="Webiie" className={`w-auto transition-all duration-300 ${scrolled ? "h-8" : "h-9 sm:h-10"}`} />
        </Link>
        <nav className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                `group relative py-6 text-[15px] transition ${isActive ? "text-brand-cyan" : "text-white/85 hover:text-white"}`
              }
            >
              {({ isActive }) => (
                <>
                  {l.label}
                  <span className={`absolute inset-x-0 bottom-0 h-0.5 origin-left bg-brand-cyan transition-transform duration-300 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`} />
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/contact" className="btn-primary hidden !py-3 sm:inline-flex">
            Start a Project <ArrowRight size={16} />
          </Link>
          <button className="rounded-lg border border-white/10 p-2.5 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      <nav className={`grid overflow-hidden transition-all duration-300 lg:hidden ${open ? "grid-rows-[1fr] border-t border-white/5" : "grid-rows-[0fr]"}`}>
        <div className="min-h-0 overflow-hidden">
          <div className="flex flex-col gap-1 px-5 pb-5 pt-3">
            {NAV_LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={() => setOpen(false)} className={({ isActive }) => `rounded-lg px-3 py-3 ${isActive ? "bg-white/5 text-brand-cyan" : "text-white/85"}`}>
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Start a Project <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
