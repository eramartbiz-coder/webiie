import { Link } from "react-router-dom";
import { ArrowRight, Brain, ChartNoAxesColumn, Box, Monitor, Smartphone, Users, type LucideIcon } from "lucide-react";
import { SERVICES, SERVICE_STATS, TONES, TRUSTED, type ServiceKey } from "../data/content";
import { IconBox, Pill, RoundArrow, Section } from "../components/ui";
import { CountUp, Reveal, SpotCard } from "../components/Motion";

const ICONS: Record<ServiceKey, LucideIcon> = {
  web: Monitor,
  mobile: Smartphone,
  ai: Brain,
  strategy: ChartNoAxesColumn,
  support: Users,
  custom: Box,
};

export default function Services() {
  return (
    <Section bg="/assets/bg-arcs.webp" className="pt-20">
      <div className="grid items-start gap-12 pb-16 lg:grid-cols-[.9fr_1.4fr]">
        <Reveal>
          <Pill>Our Services</Pill>
          <h2 className="h-display mt-8">
            Everything You Need to <span className="gradient-text">Grow Digitally</span>
          </h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">
            From websites and mobile apps to AI automation and digital strategy, we provide end-to-end solutions to help your business grow, scale and succeed.
          </p>
          <Link to="/services" className="btn-white mt-8">
            Explore Services <ArrowRight size={16} />
          </Link>
          <dl className="mt-14 grid grid-cols-2 gap-y-6 sm:grid-cols-4">
            {SERVICE_STATS.map((s, i) => (
              <div key={s.label} className={`pr-4 ${i ? "sm:border-l sm:border-white/10 sm:pl-5" : ""}`}>
                <dt className="text-2xl font-bold"><CountUp value={s.value} /></dt>
                <dd className="mt-1 text-sm text-white/70">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.key];
            const t = TONES[s.tone];
            return (
              <Reveal key={s.key} delay={i * 90}>
                <SpotCard tilt className={`group h-full min-h-[300px] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b ${t.card} to-ink-900/40 transition-colors hover:border-white/25`}>
                  <article className="flex h-full min-h-[300px] flex-col p-5">
                    <img src={`/assets/tiles/${s.key}.webp`} alt="" aria-hidden className="pointer-events-none absolute -bottom-6 -right-6 h-44 w-44 object-cover opacity-70 transition duration-500 [mask-image:radial-gradient(closest-side,black,transparent)] group-hover:scale-110 group-hover:opacity-100" />
                    <IconBox tone={s.tone}><Icon size={22} /></IconBox>
                    <h3 className="mt-5 text-lg font-bold leading-snug">{s.title}</h3>
                    <p className="mt-2 max-w-[14rem] text-sm leading-relaxed text-white/70">{s.text}</p>
                    <div className="relative mt-auto pt-5 transition-transform duration-300 group-hover:translate-x-1">
                      <RoundArrow tone={s.tone} to="/contact" />
                    </div>
                  </article>
                </SpotCard>
              </Reveal>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-6 border-t border-white/10 py-8 lg:flex-row lg:items-center">
        <Pill className="shrink-0 self-start">Trusted By Growing Businesses</Pill>
        <div className="group relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
          <ul className="flex w-max animate-marquee items-center gap-14 text-xl font-semibold text-white/55 group-hover:[animation-play-state:paused]">
            {[...TRUSTED, ...TRUSTED].map((t, i) => (
              <li key={`${t}-${i}`} aria-hidden={i >= TRUSTED.length} className={`whitespace-nowrap transition hover:text-white ${t === "stripe" || t === "django" ? "font-extrabold" : ""}`}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
