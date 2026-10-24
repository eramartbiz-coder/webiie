import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChartNoAxesColumn, CircleCheck, Heart, Monitor, Play, Smartphone, Users, X } from "lucide-react";
import { PROJECTS, WORK_FILTERS, WORK_STATS, type Project, type WorkFilter } from "../data/content";
import { IconBox, Pill, Section } from "../components/ui";
import { CountUp, Reveal, SpotCard } from "../components/Motion";

const STAT_ICONS = [Users, CircleCheck, ChartNoAxesColumn, Heart];

function ProjectModal({ p, onClose }: { p: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", key);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = prev;
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={p.name}>
      <button aria-label="Close" onClick={onClose} className="absolute inset-0 animate-pop bg-ink-950/80 backdrop-blur-sm" />
      <div className="glass relative z-10 grid max-h-[90vh] w-full max-w-4xl animate-pop overflow-y-auto rounded-3xl !bg-ink-900 md:grid-cols-2">
        <img src={p.image} alt={`${p.name} preview`} className="h-64 w-full object-cover md:h-full" />
        <div className="p-6 sm:p-8">
          <button ref={closeRef} onClick={onClose} aria-label="Close" className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 hover:bg-white/20"><X size={18} /></button>
          <p className="text-sm text-sky-300">{p.kind}</p>
          <h3 className="mt-1 text-3xl font-extrabold">{p.name}</h3>
          <p className="mt-3 text-white/70">{p.text}</p>
          <div className="mt-5 flex items-baseline gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
            <span className="gradient-text text-4xl font-extrabold"><CountUp value={p.result.value} /></span>
            <span className="text-sm text-white/70">{p.result.label}</span>
          </div>
          <h4 className="mt-6 font-semibold">What we built</h4>
          <ul className="mt-2 space-y-2 text-sm text-white/80">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-2"><CircleCheck size={16} className="mt-0.5 shrink-0 text-teal-300" /> {h}</li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            {p.stack.map((s) => <span key={s} className="rounded-full border border-blue-400/30 bg-blue-900/30 px-3 py-1 text-xs">{s}</span>)}
          </div>
          <Link to="/contact" onClick={onClose} className="btn-primary mt-7 w-full">Start a similar project <ArrowRight size={16} /></Link>
        </div>
      </div>
    </div>
  );
}

export default function Work() {
  const [filter, setFilter] = useState<WorkFilter>("All");
  const [active, setActive] = useState<Project | null>(null);
  const shown = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.filter === filter);
  const idx = WORK_FILTERS.indexOf(filter);
  const step = (d: number) => setFilter(WORK_FILTERS[(idx + d + WORK_FILTERS.length) % WORK_FILTERS.length]);
  const count = (f: WorkFilter) => (f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.filter === f).length);
  return (
    <Section bg="/assets/bg-wave.webp" className="py-20">
      <div className="grid items-start gap-12 lg:grid-cols-[.8fr_1.6fr]">
        <Reveal className="lg:pt-24">
          <Pill>Our Work</Pill>
          <h2 className="h-display mt-8">
            Real Projects.
            <br />
            Real <span className="gradient-text">Impact.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
            We design and develop modern websites, mobile apps and AI solutions that help businesses grow, automate and reach more customers.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <button onClick={() => setFilter("All")} className="btn-white">View All Projects <ArrowRight size={16} /></button>
            <button onClick={() => setActive(PROJECTS[0])} className="btn-outline"><Play size={18} className="rounded-full border border-white/80 p-0.5" /> Watch Case Study</button>
          </div>
        </Reveal>
        <div>
          <div className="mb-6 flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-1 rounded-full border border-white/10 bg-ink-900/70 p-1.5" role="tablist">
              {WORK_FILTERS.map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm transition ${filter === f ? "bg-brand-blue font-semibold shadow-glow" : "text-white/80 hover:bg-white/5"}`}
                >
                  {f}
                  <span className={`rounded-full px-1.5 text-xs ${filter === f ? "bg-white/25" : "bg-white/10 text-white/60"}`}>{count(f)}</span>
                </button>
              ))}
            </div>
            <div className="hidden gap-3 sm:flex">
              <button onClick={() => step(-1)} aria-label="Previous filter" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-ink-900/70 hover:bg-white/10"><ArrowLeft size={18} /></button>
              <button onClick={() => step(1)} aria-label="Next filter" className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/40 bg-ink-800 hover:bg-white/10"><ArrowRight size={18} /></button>
            </div>
          </div>
          {shown.length ? (
            <div key={filter} className="grid gap-5 md:grid-cols-3">
              {shown.map((p, i) => (
                <div key={p.name} className="animate-fadeUp" style={{ animationDelay: `${i * 90}ms` }}>
                  <SpotCard tilt className="glass group h-full cursor-pointer overflow-hidden rounded-2xl">
                    <article onClick={() => setActive(p)} className="h-full">
                      <div className="aspect-[4/3] overflow-hidden"><img src={p.image} alt={`${p.name} preview`} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className={`flex items-center gap-2 text-sm ${p.kind === "Mobile App" ? "text-violet-300" : "text-sky-300"}`}>
                              {p.kind === "Mobile App" ? <Smartphone size={16} /> : <Monitor size={16} />} {p.kind}
                            </p>
                            <h3 className="mt-1 text-xl font-bold">{p.name}</h3>
                          </div>
                          <button aria-label={`View ${p.name} details`} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-blue-400/40 bg-ink-800 transition group-hover:bg-brand-blue"><ArrowRight size={18} /></button>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-white/70">{p.text}</p>
                      </div>
                    </article>
                  </SpotCard>
                </div>
              ))}
            </div>
          ) : (
            <div key={filter} className="glass animate-fadeUp rounded-2xl p-10 text-center text-white/70">
              No {filter.toLowerCase()} projects published yet. <Link to="/contact" className="text-brand-cyan underline">Start the first one.</Link>
            </div>
          )}
        </div>
      </div>
      <Reveal>
        <dl className="glass mt-14 grid gap-6 rounded-3xl p-6 sm:grid-cols-2 lg:grid-cols-4 lg:p-8">
          {WORK_STATS.map((s, i) => {
            const Icon = STAT_ICONS[i];
            return (
              <div key={s.label} className={`flex items-center gap-5 ${i ? "lg:border-l lg:border-white/10 lg:pl-8" : ""}`}>
                <IconBox tone={s.tone} size="lg"><Icon size={26} /></IconBox>
                <div>
                  <dt className="text-3xl font-bold"><CountUp value={s.value} /></dt>
                  <dd className="text-white/90">{s.label}</dd>
                  <dd className="text-sm text-white/60">{s.text}</dd>
                </div>
              </div>
            );
          })}
        </dl>
      </Reveal>
      {active && <ProjectModal p={active} onClose={() => setActive(null)} />}
    </Section>
  );
}
