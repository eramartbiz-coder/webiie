import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Github, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import { FOOTER } from "../data/content";

const SOCIAL = [
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
  { Icon: Youtube, label: "YouTube", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Github, label: "GitHub", href: "#" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) setDone(true);
  };
  return (
    <footer className="border-t border-blue-500/20 bg-ink-950">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.3fr_.8fr_1.1fr_.9fr_1.5fr]">
        <div>
          <img src="/assets/logo.png" alt="Webiie" className="h-10 w-auto" />
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            Digital solutions for growing businesses.
            <br />
            Websites. Mobile Apps. Automation.
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIAL.map(({ Icon, label, href }) => (
              <a key={label} href={href} aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/15">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Quick Links</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {FOOTER.quick.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-brand-cyan">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Our Services</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {FOOTER.services.map((s) => (
              <li key={s}><Link to="/services" className="hover:text-brand-cyan">{s}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Resources</h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            {FOOTER.resources.map((s) => (
              <li key={s}><a href="#" className="hover:text-brand-cyan">{s}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-sm font-semibold">Subscribe to Our Newsletter</h4>
          <p className="mb-4 text-sm text-white/70">Get the latest insights, updates and tips on digital solutions.</p>
          {done ? (
            <p className="rounded-lg border border-teal-400/30 bg-teal-400/10 px-4 py-3 text-sm text-teal-200">Thanks for subscribing!</p>
          ) : (
            <form onSubmit={onSubmit} className="flex overflow-hidden rounded-lg border border-white/10 bg-ink-900/70">
              <label className="flex min-w-0 flex-1 items-center gap-2 px-3">
                <Mail size={16} className="shrink-0 text-white/50" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/40" />
              </label>
              <button className="bg-brand-blue px-5 text-sm font-semibold transition hover:brightness-110">Subscribe</button>
            </form>
          )}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-2 border-t border-white/10 px-5 py-5 text-xs text-white/60 sm:flex-row sm:px-8">
        <span>© 2026 Webiie. All rights reserved.</span>
        <span>Built with <span className="text-red-500">♥</span> for growing businesses.</span>
      </div>
    </footer>
  );
}
