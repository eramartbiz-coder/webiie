import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, ChartNoAxesColumn, Check, Clock, Code, MessageSquare, Pause, Play, Rocket, Target, Users, Zap, type LucideIcon } from "lucide-react";
import { STEPS } from "../data/content";
import { Pill, Section, Swoosh } from "../components/ui";
import { Reveal } from "../components/Motion";
import { useInterval, useReducedMotion } from "../hooks/useUi";

const STEP_ICONS: LucideIcon[] = [MessageSquare, Target, Code, Rocket, ChartNoAxesColumn];
const STEP_BG = ["from-violet-500 to-purple-700", "from-blue-500 to-blue-700", "from-violet-500 to-indigo-700", "from-sky-500 to-blue-700", "from-violet-500 to-purple-800"];

export function ProcessSteps() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useInterval(() => setActive((a) => (a + 1) % STEPS.length), paused || reduced ? null : 3200);
  const pct = (active / (STEPS.length - 1)) * 100;
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[.8fr_2.2fr]">
      <Reveal>
        <Pill>Our Process</Pill>
        <h2 className="h-display mt-8">
          From Idea to{" "}
          <span className="relative inline-block">
            <span className="gradient-text">Impact</span>
            <Swoosh className="absolute -bottom-2 left-0" />
          </span>
        </h2>
        <p className="mt-8 max-w-sm text-lg leading-relaxed text-white/70">We follow a clear and collaborative process to turn your ideas into powerful digital solutions.</p>
        <div className="mt-8 flex items-center gap-3">
          <Link to="/process" className="btn-white">Our Process <ArrowRight size={16} /></Link>
          <button onClick={() => setPaused((p) => !p)} aria-label={paused ? "Play steps" : "Pause steps"} className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-ink-900/70 hover:bg-white/10">
            {paused ? <Play size={18} /> : <Pause size={18} />}
          </button>
        </div>
        <p className="mt-6 text-sm text-white/60" aria-live="polite">Step {active + 1} of {STEPS.length}: <span className="text-white">{STEPS[active].title}</span></p>
      </Reveal>
      <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-5" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div aria-hidden className="absolute left-7 right-7 top-6 hidden border-t border-dashed border-blue-400/40 lg:block">
          <div className="absolute -top-px left-0 h-0.5 bg-grad-text shadow-[0_0_12px_#3b6bff] transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
        {STEPS.map((s, i) => {
          const Icon = STEP_ICONS[i];
          const on = i === active;
          const done = i < active;
          return (
            <li key={s.title}>
              <button onClick={() => { setActive(i); setPaused(true); }} onFocus={() => setActive(i)} aria-current={on ? "step" : undefined} className="block w-full text-left">
                <span className={`relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-full border text-lg font-bold transition-all duration-500 lg:ml-1 ${on ? "scale-110 border-brand-cyan bg-brand-blue shadow-glow" : done ? "border-blue-400/70 bg-blue-700/60" : "border-blue-400/40 bg-ink-800"}`}>
                  {done ? <Check size={20} /> : String(i + 1).padStart(2, "0")}
                </span>
                <div className={`glass h-[19rem] rounded-2xl p-5 transition-all duration-500 ${on ? "-translate-y-2 !border-brand-cyan/60 shadow-glow" : "opacity-80"}`}>
                  <span className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br transition-transform duration-500 ${STEP_BG[i]} ${on ? "scale-110 rotate-6" : ""}`}><Icon size={26} /></span>
                  <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{s.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span key={t} className={`rounded-full border px-3 py-1 text-xs transition ${on ? "border-brand-cyan/50 bg-brand-blue/30" : "border-blue-400/30 bg-blue-900/30"}`}>{t}</span>
                    ))}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

const PERKS = [
  { Icon: Check, title: "Free Consultation", text: "Discuss your ideas with our experts", cls: "bg-teal-600/50 text-teal-200" },
  { Icon: Clock, title: "Fast Response", text: "We usually reply within 24 hours", cls: "bg-violet-600/60" },
  { Icon: Users, title: "Dedicated Support", text: "Your project, our priority", cls: "bg-blue-600/60" },
];

export function StartProjectBanner() {
  return (
    <Reveal>
      <div className="glass relative isolate overflow-hidden rounded-3xl p-6 sm:p-10">
        <img src="/assets/bg-mountain.webp" alt="" aria-hidden className="pointer-events-none absolute inset-0 -z-10 h-full w-full animate-float object-cover opacity-90" />
        <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Pill><Zap size={14} className="text-brand-cyan" /> Let’s Build Something Great</Pill>
            <h2 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">Ready to Start Your <span className="gradient-text">Project?</span></h2>
            <p className="mt-4 max-w-lg text-lg text-white/70">Let’s discuss your ideas and turn them into a powerful digital solution that helps you grow faster.</p>
            <div className="mt-7 flex flex-wrap gap-4">
              <Link to="/contact" className="btn-primary">Start a Project <ArrowRight size={16} /></Link>
              <Link to="/contact" className="btn-outline"><CalendarDays size={18} /> Schedule a Call</Link>
            </div>
          </div>
          <ul className="space-y-5 lg:border-l lg:border-white/10 lg:pl-10">
            {PERKS.map(({ Icon, title, text, cls }) => (
              <li key={title} className="group flex items-center gap-4">
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition group-hover:scale-110 ${cls}`}><Icon size={24} /></span>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="text-sm text-white/70">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

export default function Process() {
  return (
    <Section bg="/assets/bg-arcs.webp" className="py-20">
      <ProcessSteps />
      <div className="mt-14"><StartProjectBanner /></div>
    </Section>
  );
}
