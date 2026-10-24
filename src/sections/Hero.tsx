import { useState, type MouseEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, ChartNoAxesColumn, Heart, Monitor, MoveUpRight, Play, Smartphone, Zap } from "lucide-react";
import { Pill, Section, Swoosh } from "../components/ui";
import { CountUp } from "../components/Motion";
import { useReducedMotion, useTypewriter } from "../hooks/useUi";

const QUICK = [
  { Icon: Monitor, label: "Website Development", cls: "border-blue-400/40 bg-blue-600/20 text-sky-300" },
  { Icon: Smartphone, label: "Mobile App Development", cls: "border-violet-400/40 bg-violet-600/20 text-fuchsia-300" },
  { Icon: Brain, label: "AI & Automation Solutions", cls: "border-teal-400/40 bg-teal-500/20 text-teal-300" },
  { Icon: ChartNoAxesColumn, label: "Digital Strategy & Support", cls: "border-red-400/40 bg-red-600/20 text-orange-400" },
];

const WORDS = ["Websites", "Mobile Apps", "AI Automation", "Digital Strategy"];
const STATS = [
  { v: "50+", l: "Websites" },
  { v: "30+", l: "Mobile Apps" },
  { v: "100+", l: "Happy Clients" },
];

function Chip({ children, className = "", depth, x, y }: { children: React.ReactNode; className?: string; depth: number; x: number; y: number }) {
  return (
    <div style={{ transform: `translate(${x * depth}px, ${y * depth}px)` }} className={`absolute transition-transform duration-200 ease-out ${className}`}>
      <div className="glass flex animate-float items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium leading-tight shadow-glow">{children}</div>
    </div>
  );
}

export default function Hero() {
  const word = useTypewriter(WORDS);
  const reduced = useReducedMotion();
  const [m, setM] = useState({ x: 0, y: 0 });
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const r = e.currentTarget.getBoundingClientRect();
    setM({ x: ((e.clientX - r.left) / r.width - 0.5) * 2, y: ((e.clientY - r.top) / r.height - 0.5) * 2 });
  };
  return (
    <Section bg="/assets/bg-hero.webp" className="pb-16 pt-14 lg:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
        <div>
          <Pill>Digital Solutions for Growing Businesses</Pill>
          <h1 className="h-display mt-8 !text-5xl sm:!text-6xl lg:!text-[4.5rem]">
            Ideas to Impact
            <br />
            with{" "}
            <span className="relative inline-block">
              <span className="gradient-text">Webiie</span>
              <Swoosh className="absolute -bottom-2 left-0" />
            </span>
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/70">
            We build modern websites, mobile apps and AI-powered solutions that help startups and growing companies work smarter and grow faster.
          </p>
          <p className="mt-5 h-8 text-xl font-semibold" aria-live="off">
            <span className="text-white/60">We build </span>
            <span className="gradient-text">{word}</span>
            <span className="ml-0.5 inline-block h-5 w-0.5 translate-y-0.5 animate-blink bg-brand-cyan" />
          </p>
          <div className="mt-7 flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary">
              Start a Project <ArrowRight size={16} />
            </Link>
            <Link to="/our-work" className="btn-outline">
              <Play size={18} className="rounded-full border border-white/80 p-0.5" /> Watch Our Work
            </Link>
          </div>
          <dl className="mt-8 flex gap-8">
            {STATS.map((s) => (
              <div key={s.l}>
                <dt className="text-2xl font-bold"><CountUp value={s.v} /></dt>
                <dd className="text-sm text-white/60">{s.l}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {QUICK.map(({ Icon, label, cls }) => (
              <Link to="/services" key={label} className="group flex flex-col items-start gap-3">
                <span className={`flex h-14 w-14 items-center justify-center rounded-full border transition duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:shadow-glow ${cls}`}>
                  <Icon size={24} />
                </span>
                <span className="text-sm leading-snug text-white/90 transition group-hover:text-white">{label}</span>
              </Link>
            ))}
          </div>
        </div>
        <div onMouseMove={onMove} onMouseLeave={() => setM({ x: 0, y: 0 })} className="relative mx-auto w-full max-w-[760px] pb-16 pt-16 sm:pt-20">
          <img
            src="/assets/mockup.png"
            alt="Webiie website and mobile app preview"
            style={{ transform: `perspective(1200px) rotateY(${m.x * 6}deg) rotateX(${-m.y * 4}deg)` }}
            className="relative w-full transition-transform duration-200 ease-out drop-shadow-[0_30px_60px_rgba(11,92,255,.45)]"
          />
          <Chip x={m.x} y={m.y} depth={-18} className="left-0 top-0 sm:left-2">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600/60"><Zap size={20} /></span>
            Modern<br />Technology
          </Chip>
          <Chip x={m.x} y={m.y} depth={22} className="right-0 top-14 hidden sm:block">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-500"><MoveUpRight size={20} /></span>
            Scalable<br />Solutions
          </Chip>
          <Chip x={m.x} y={m.y} depth={-26} className="bottom-0 right-0">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-600/70"><Heart size={20} fill="currentColor" /></span>
            Long-term<br />Partnership
          </Chip>
        </div>
      </div>
    </Section>
  );
}
