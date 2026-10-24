import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, MessageSquare, Plus, ShieldCheck, Star } from "lucide-react";
import { FAQS, TESTIMONIALS } from "../data/content";
import { Pill, Section } from "../components/ui";
import { Reveal } from "../components/Motion";
import { useInterval, useReducedMotion } from "../hooks/useUi";

const initials = (n: string) => n.split(" ").map((p) => p[0]).join("");
const AVATAR = ["from-sky-500 to-blue-700", "from-fuchsia-500 to-violet-700", "from-teal-400 to-blue-600"];

export function Testimonials() {
  const reduced = useReducedMotion();
  const [start, setStart] = useState(0);
  const [hover, setHover] = useState(false);
  const n = TESTIMONIALS.length;
  const go = (d: number) => setStart((s) => (s + d + n) % n);
  useInterval(() => go(1), hover || reduced ? null : 5000);
  const items = [0, 1, 2].map((k) => TESTIMONIALS[(start + k) % n]);
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[.8fr_2fr]">
      <Reveal>
        <Pill>Client Testimonials</Pill>
        <h2 className="h-display mt-8">
          Trusted by <span className="gradient-text">Growing Businesses</span>
        </h2>
        <p className="mt-6 max-w-sm text-lg leading-relaxed text-white/70">Startups and growing companies trust Webiie for our quality, communication and results. Here’s what some of our clients say.</p>
        <div className="mt-7 flex items-center gap-3">
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-ink-900/70 hover:bg-white/10"><ArrowLeft size={18} /></button>
          <button onClick={() => go(1)} aria-label="Next testimonial" className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/40 bg-ink-800 hover:bg-white/10"><ArrowRight size={18} /></button>
          <div className="ml-3 flex gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button key={t.name} onClick={() => setStart(i)} aria-label={`Show testimonial from ${t.name}`} className={`h-2 rounded-full transition-all duration-300 ${i === start ? "w-8 bg-brand-cyan" : "w-2 bg-white/25 hover:bg-white/50"}`} />
            ))}
          </div>
        </div>
      </Reveal>
      <div key={start} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="grid gap-5 md:grid-cols-3">
        {items.map((t, i) => (
          <figure key={t.name} style={{ animationDelay: `${i * 80}ms` }} className={`glass flex animate-fadeUp flex-col rounded-2xl p-6 transition hover:-translate-y-1 hover:border-white/25 ${i === 0 ? "!border-violet-400/40 shadow-glow" : ""}`}>
            <div className="flex items-start justify-between">
              <span aria-hidden className="text-6xl font-black leading-none text-brand-blue">“</span>
              <span className="flex gap-0.5 text-yellow-400" aria-label="5 out of 5 stars">
                {[0, 1, 2, 3, 4].map((s) => <Star key={s} size={16} fill="currentColor" />)}
              </span>
            </div>
            <blockquote className="mt-2 text-lg leading-relaxed">{t.quote}</blockquote>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
              <span className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br text-lg font-bold ${AVATAR[(start + i) % 3]}`}>{initials(t.name)}</span>
              <span>
                <span className="block font-bold">{t.name}</span>
                <span className="text-sm text-white/60">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <Pill>Frequently Asked Questions</Pill>
          <h3 className="mt-3 text-3xl font-extrabold">Quick Answers</h3>
        </div>
        <button onClick={() => setOpen(open === -1 ? null : -1)} className="hidden rounded-lg border border-blue-400/40 px-4 py-2 text-sm hover:bg-white/5 sm:block">{open === -1 ? "Collapse all" : "Expand all"}</button>
      </div>
      <ul className="mt-5 space-y-2.5">
        {FAQS.map((f, i) => {
          const isOpen = open === -1 || open === i;
          return (
            <li key={f.q} className={`rounded-xl border bg-ink-800/70 transition-colors ${isOpen ? "border-blue-400/50" : "border-white/10"}`}>
              <button className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left" aria-expanded={isOpen} onClick={() => setOpen(open === i ? null : i)}>
                <span>{f.q}</span>
                <Plus size={18} className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45 text-brand-cyan" : ""}`} />
              </button>
              <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                <p className="min-h-0 overflow-hidden px-4 text-sm leading-relaxed text-white/70"><span className="block pb-4">{f.a}</span></p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const PERKS = [
  { Icon: MessageSquare, label: "Free Consultation", cls: "bg-indigo-700/60" },
  { Icon: Clock, label: "Quick Response", cls: "bg-violet-700/60" },
  { Icon: ShieldCheck, label: "No Obligation Discussion", cls: "bg-teal-600/50 text-teal-200" },
];

const FLOW = ["Ideas", "Strategy", "Solution", "Growth"];

export function ProjectInMind() {
  const [step, setStep] = useState(0);
  useInterval(() => setStep((s) => (s + 1) % FLOW.length), 1800);
  return (
    <Reveal>
      <div className="glass grid gap-10 rounded-3xl p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr_1.2fr]">
        <div>
          <Pill>Let’s Work Together</Pill>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tight sm:text-5xl">Have a <span className="gradient-text">Project in Mind?</span></h2>
          <p className="mt-4 text-lg text-white/70">Let’s discuss your ideas and build a powerful digital solution that helps your business grow.</p>
          <ul className="mt-7 flex flex-wrap gap-6">
            {PERKS.map(({ Icon, label, cls }) => (
              <li key={label} className="flex max-w-[9rem] items-center gap-3 text-sm">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${cls}`}><Icon size={22} /></span>
                {label}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary">Start a Project <ArrowRight size={16} /></Link>
            <Link to="/contact" className="btn-outline"><CalendarDays size={18} /> Schedule a Call</Link>
          </div>
        </div>
        <div className="relative hidden min-h-[320px] lg:block">
          <img src="/assets/chat.webp" alt="" aria-hidden className="absolute inset-0 h-full w-full animate-float object-contain [mask-image:radial-gradient(ellipse_62%_62%_at_50%_48%,black_55%,transparent_100%)]" />
          <p className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 rounded-full border border-white/10 bg-ink-900/80 px-4 py-3 text-sm">
            {FLOW.map((f, i) => (
              <span key={f} className="flex items-center gap-2">
                <span className={`transition-colors duration-500 ${i === step ? "font-semibold text-brand-cyan" : "text-white/70"}`}>{f}</span>
                {i < FLOW.length - 1 && <ArrowRight size={14} />}
              </span>
            ))}
          </p>
        </div>
        <Faq />
      </div>
    </Reveal>
  );
}

export default function TestimonialsSection() {
  return (
    <Section bg="/assets/bg-wave.webp" className="py-20">
      <Testimonials />
      <div className="mt-14"><ProjectInMind /></div>
    </Section>
  );
}
