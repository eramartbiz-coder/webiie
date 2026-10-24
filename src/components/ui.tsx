import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { TONES } from "../data/content";

type Tone = keyof typeof TONES;

export function Pill({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 rounded-full border border-blue-400/30 bg-ink-900/70 px-4 py-2 text-sm text-white/90 ${className}`}>
      <span className="h-2 w-2 rounded-full bg-brand-cyan shadow-[0_0_10px_#00d4ff]" />
      {children}
    </span>
  );
}

export function Swoosh({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 300 12" preserveAspectRatio="none" className={`pointer-events-none h-2.5 w-full ${className}`} fill="none">
      <defs>
        <linearGradient id="sw" x1="0" x2="1">
          <stop offset="0" stopColor="#0b5cff" />
          <stop offset="1" stopColor="#c04dff" />
        </linearGradient>
      </defs>
      <path d="M2 9 C 80 2, 200 2, 298 6" stroke="url(#sw)" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconBox({ tone, children, size = "md" }: { tone: Tone; children: ReactNode; size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? "h-14 w-14 rounded-2xl" : size === "sm" ? "h-9 w-9 rounded-lg" : "h-12 w-12 rounded-xl";
  return <span className={`inline-flex shrink-0 items-center justify-center text-white shadow-lg ${dim} ${TONES[tone].icon}`}>{children}</span>;
}

export function RoundArrow({ tone = "blue", to }: { tone?: Tone; to?: string }) {
  const cls = `inline-flex h-10 w-10 items-center justify-center rounded-full border bg-ink-900/60 transition hover:bg-white/10 ${TONES[tone].ring}`;
  return to ? (
    <Link to={to} className={cls} aria-label="Learn more">
      <ArrowRight size={18} />
    </Link>
  ) : (
    <span className={cls}>
      <ArrowRight size={18} />
    </span>
  );
}

export function BgImage({ src, className = "" }: { src: string; className?: string }) {
  return <img src={src} alt="" aria-hidden className={`pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover ${className}`} />;
}

export function Section({ children, bg, className = "", id }: { children: ReactNode; bg?: string; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative isolate overflow-hidden ${className}`}>
      {bg && <BgImage src={bg} />}
      <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-8">{children}</div>
    </section>
  );
}
