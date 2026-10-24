import { Link } from "react-router-dom";
import { ArrowRight, ChartNoAxesColumn, Gem, Lightbulb, Rocket, Target, Trophy, Users, Zap, Heart, type LucideIcon } from "lucide-react";
import { IMPACT, WHY } from "../data/content";
import { IconBox, Pill, Section, Swoosh } from "../components/ui";
import { CountUp, Reveal } from "../components/Motion";

const WHY_ICONS: LucideIcon[] = [Target, Zap, Users, Heart];
const IMPACT_ICONS: LucideIcon[] = [Rocket, Users, ChartNoAxesColumn, Trophy];

function Float({ Icon, children, className, tone, delay = 0 }: { Icon: LucideIcon; children: React.ReactNode; className: string; tone: string; delay?: number }) {
  return (
    <div style={{ animationDelay: `${delay}ms` }} className={`glass absolute flex animate-float items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium leading-tight ${className}`}>
      <Icon size={26} className={tone} />
      {children}
    </div>
  );
}

export default function About() {
  return (
    <Section bg="/assets/bg-globe.webp" className="py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr_1.1fr]">
        <Reveal>
          <Pill>About Webiie</Pill>
          <h2 className="h-display mt-8">
            More Than Development. A{" "}
            <span className="relative inline-block">
              <span className="gradient-text">True Partner.</span>
              <Swoosh className="absolute -bottom-2 left-0" />
            </span>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-white/70">We are a team of designers, developers and problem-solvers helping startups and growing businesses build modern digital products that create real impact.</p>
          <Link to="/about" className="btn-white mt-8">Learn More About Us <ArrowRight size={16} /></Link>
        </Reveal>
        <div className="glass relative mx-auto aspect-[1.1/1] w-full max-w-[560px] rounded-3xl">
          <img src="/assets/globe.webp" alt="Global network illustration" className="absolute inset-0 h-full w-full object-contain [mask-image:radial-gradient(ellipse_52%_52%_at_50%_50%,black_62%,transparent_100%)]" />
          <Float Icon={Users} tone="text-sky-400" className="left-4 top-6">Global<br />Mindset</Float>
          <Float delay={800} Icon={Gem} tone="text-sky-300" className="right-4 top-6">Quality<br />First</Float>
          <Float delay={1500} Icon={ChartNoAxesColumn} tone="text-teal-300" className="bottom-6 left-4">Growth<br />Focused</Float>
          <Float delay={2200} Icon={Lightbulb} tone="text-violet-300" className="bottom-6 right-4">Long-term<br />Partnership</Float>
        </div>
        <div>
          <Pill>Why Choose Webiie</Pill>
          <ul className="mt-4 space-y-3">
            {WHY.map((w, i) => {
              const Icon = WHY_ICONS[i];
              return (
                <li key={w.title} className="glass group flex items-center gap-4 rounded-2xl p-4 transition duration-300 hover:translate-x-1 hover:border-white/25">
                  <IconBox tone={w.tone} size="lg"><Icon size={26} /></IconBox>
                  <div>
                    <h3 className="font-bold">{w.title}</h3>
                    <p className="text-sm leading-relaxed text-white/70">{w.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="glass mt-12 rounded-3xl p-6 lg:p-8">
        <Pill>Our Impact</Pill>
        <dl className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {IMPACT.map((s, i) => {
            const Icon = IMPACT_ICONS[i];
            return (
              <div key={s.label} className={`flex items-start gap-4 ${i ? "lg:border-l lg:border-white/10 lg:pl-6" : ""}`}>
                <IconBox tone={s.tone} size="lg"><Icon size={26} /></IconBox>
                <div>
                  <dt className="text-3xl font-bold"><CountUp value={s.value} /></dt>
                  <dd className="font-semibold">{s.label}</dd>
                  <dd className="text-sm text-white/60">{s.text}</dd>
                </div>
              </div>
            );
          })}
        </dl>
      </div>
    </Section>
  );
}
