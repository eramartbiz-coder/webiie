import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { ChevronDown, Clock, FileText, LayoutGrid, LoaderCircle, Mail, MapPin, MessageSquare, Navigation, Phone, ShieldCheck, User, Users, Zap, Copy } from "lucide-react";
import { PROJECT_TYPES, waLink } from "../data/content";
import { WhatsAppIcon } from "../components/WhatsAppFab";
import { Pill, Section, Swoosh } from "../components/ui";
import { Reveal } from "../components/Motion";
import { useToast } from "../components/Toast";

type Form = { name: string; email: string; type: string; message: string };
type Errors = Partial<Record<keyof Form, string>>;
const EMPTY: Form = { name: "", email: "", type: "", message: "" };
const DRAFT_KEY = "webiie:contact-draft";
const MAX = 600;

const PERKS = [
  { Icon: Zap, title: "Quick Response", text: "We usually reply within 24 hours.", cls: "bg-blue-600/60" },
  { Icon: Users, title: "Free Consultation", text: "Discuss your ideas with our experts.", cls: "bg-violet-700/60" },
  { Icon: ShieldCheck, title: "No Obligation", text: "Share your requirements without any commitment.", cls: "bg-teal-600/50 text-teal-200" },
];

const DETAILS = [
  { Icon: Mail, title: "Email Us", lines: ["hello@webiie.in"], copy: "hello@webiie.in", note: "We reply within 24 hours.", cls: "bg-blue-600/60" },
  { Icon: Phone, title: "Call Us", lines: ["+91 98765 43210"], copy: "+91 98765 43210", note: "Mon – Sat, 9:00 AM – 6:00 PM", cls: "bg-blue-600/60" },
  { Icon: MapPin, title: "Our Location", lines: ["Bihar, India"], note: "Working with clients across India and worldwide.", cls: "bg-teal-600/50 text-teal-200" },
  { Icon: Clock, title: "Working Hours", lines: ["Mon – Sat: 9:00 AM – 6:00 PM"], note: "Sunday: Closed", cls: "bg-violet-700/60" },
];

function validate(f: Form): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Enter your name (at least 2 characters).";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email)) e.email = "Enter a valid email, like you@example.com.";
  if (!f.type) e.type = "Pick the service you need.";
  if (f.message.trim().length < 20) e.message = "Tell us a bit more (at least 20 characters).";
  return e;
}

const base = "w-full rounded-xl border bg-ink-900/70 py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-white/40 focus:ring-2";
const ok = "border-white/10 focus:border-brand-blue focus:ring-brand-blue/40";
const bad = "border-red-500/70 focus:border-red-500 focus:ring-red-500/30";

export default function Contact() {
  const toast = useToast();
  const [form, setForm] = useState<Form>(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      return raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<Form>) } : EMPTY;
    } catch {
      return EMPTY;
    }
  });
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const errors = validate(form);
  const show = (k: keyof Form) => (touched[k] ? errors[k] : undefined);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch {
      /* storage unavailable */
    }
  }, [form]);

  const on = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setSent(false);
    setForm((f) => ({ ...f, [e.target.name]: e.target.value.slice(0, e.target.name === "message" ? MAX : 200) }));
  };
  const blur = (k: keyof Form) => () => setTouched((t) => ({ ...t, [k]: true }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, type: true, message: true });
    if (Object.keys(errors).length) {
      toast("Please fix the highlighted fields.", "error");
      return;
    }
    setLoading(true);
    const text = [
      "*New project enquiry – Webiie*",
      "",
      `*Name:* ${form.name.trim()}`,
      `*Email:* ${form.email.trim()}`,
      `*Project type:* ${form.type}`,
      "",
      "*Project details:*",
      form.message.trim(),
    ].join("\n");
    // Open synchronously inside the click handler so browsers don't block the popup.
    const win = window.open(waLink(text), "_blank", "noopener,noreferrer");
    if (!win) window.location.href = waLink(text);
    // Optional: also save the lead to your backend, e.g. await axios.post("/api/contact/", form);
    setSent(true);
    setForm(EMPTY);
    setTouched({});
    try {
      localStorage.removeItem(DRAFT_KEY);
    } catch {
      /* storage unavailable */
    }
    toast("Opening WhatsApp with your message. Press send to deliver it.");
    setLoading(false);
  };

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast(`Copied ${text}`);
    } catch {
      toast("Copy is not available in this browser.", "error");
    }
  };

  const err = (k: keyof Form) => show(k) && <p role="alert" className="mt-1.5 animate-fadeUp text-xs text-red-400">{errors[k]}</p>;

  return (
    <Section bg="/assets/bg-globe.webp" className="py-20">
      <div className="grid items-start gap-10 lg:grid-cols-[.9fr_1.2fr_.9fr]">
        <Reveal>
          <Pill>Let’s Connect</Pill>
          <h2 className="h-display mt-8">
            Let’s Build{" "}
            <span className="relative inline-block">
              <span className="gradient-text">Something Great</span>
              <Swoosh className="absolute -bottom-2 left-0" />
            </span>
          </h2>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-white/70">Have a project in mind? Let’s discuss how Webiie can help you turn your ideas into powerful digital solutions.</p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {PERKS.map(({ Icon, title, text, cls }) => (
              <li key={title} className="group">
                <span className={`mb-3 flex h-14 w-14 items-center justify-center rounded-xl transition duration-300 group-hover:-translate-y-1 group-hover:rotate-6 ${cls}`}><Icon size={24} /></span>
                <p className="font-bold">{title}</p>
                <p className="mt-1 text-sm text-white/70">{text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120}>
          <form onSubmit={submit} noValidate className="glass rounded-3xl p-6 sm:p-7">
            <h3 className="flex items-center gap-3 text-xl font-bold"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/50 text-sky-300"><MessageSquare size={18} /></span> Send Us a Message</h3>
            <p className="mt-3 text-sm text-white/70">Tell us about your project and we’ll get back to you soon. Your draft is saved as you type.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm">Your Name <span className="text-red-500">*</span></label>
                <span className="relative mt-2 block"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" /><input id="name" name="name" value={form.name} onChange={on} onBlur={blur("name")} placeholder="John Doe" aria-invalid={!!show("name")} className={`${base} ${show("name") ? bad : ok}`} /></span>
                {err("name")}
              </div>
              <div>
                <label htmlFor="email" className="block text-sm">Email Address <span className="text-red-500">*</span></label>
                <span className="relative mt-2 block"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" /><input id="email" type="email" name="email" value={form.email} onChange={on} onBlur={blur("email")} placeholder="you@example.com" aria-invalid={!!show("email")} className={`${base} ${show("email") ? bad : ok}`} /></span>
                {err("email")}
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="type" className="block text-sm">Project Type <span className="text-red-500">*</span></label>
              <span className="relative mt-2 block">
                <LayoutGrid size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                <select id="type" name="type" value={form.type} onChange={on} onBlur={blur("type")} aria-invalid={!!show("type")} className={`${base} appearance-none ${show("type") ? bad : ok}`}>
                  <option value="" disabled>Select a service</option>
                  {PROJECT_TYPES.map((t) => <option key={t} value={t} className="bg-ink-900">{t}</option>)}
                </select>
                <ChevronDown size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" />
              </span>
              {err("type")}
            </div>
            <div className="mt-4">
              <label htmlFor="message" className="block text-sm">Tell us about your project <span className="text-red-500">*</span></label>
              <span className="relative mt-2 block"><FileText size={16} className="absolute left-4 top-4 text-white/50" /><textarea id="message" rows={4} name="message" value={form.message} onChange={on} onBlur={blur("message")} placeholder="Describe your idea, goals and requirements..." aria-invalid={!!show("message")} className={`${base} resize-none ${show("message") ? bad : ok}`} /></span>
              <div className="mt-1.5 flex items-start justify-between gap-3">
                <div>{err("message")}</div>
                <span className={`ml-auto text-xs tabular-nums ${form.message.length > MAX - 50 ? "text-orange-400" : "text-white/50"}`}>{form.message.length}/{MAX}</span>
              </div>
            </div>
            <button type="submit" disabled={loading} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-grad-cta py-4 font-semibold shadow-glow transition hover:brightness-110 disabled:cursor-wait disabled:opacity-80">
              {loading ? <><LoaderCircle size={18} className="animate-spin" /> Opening WhatsApp...</> : <><WhatsAppIcon size={20} /> Send Message on WhatsApp</>}
            </button>
            {sent && <p role="status" className="mt-4 animate-pop rounded-lg border border-teal-400/30 bg-teal-400/10 px-4 py-3 text-sm text-teal-200">WhatsApp opened with your details. Press send there to deliver your message.</p>}
          </form>
        </Reveal>
        <Reveal delay={240}>
          <div className="glass rounded-3xl p-6 sm:p-7">
            <h3 className="flex items-center gap-3 text-xl font-bold"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/50 text-sky-300"><Navigation size={18} /></span> Our Contact Details</h3>
            <p className="mt-3 text-sm text-white/70">We’re here to help. Reach out to us through any of the following channels.</p>
            <ul className="mt-5 space-y-5">
              {DETAILS.map(({ Icon, title, lines, copy: c, note, cls }) => (
                <li key={title} className="group flex gap-4">
                  <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition group-hover:scale-110 ${cls}`}><Icon size={24} /></span>
                  <div className="min-w-0">
                    <p className="font-bold">{title}</p>
                    {lines.map((l) => (
                      <p key={l} className="flex items-center gap-2 text-sky-400">
                        <span className="truncate">{l}</span>
                        {c && <button onClick={() => copy(c)} aria-label={`Copy ${l}`} className="rounded p-1 text-white/40 opacity-0 transition hover:text-white focus:opacity-100 group-hover:opacity-100"><Copy size={14} /></button>}
                      </p>
                    ))}
                    <p className="text-sm text-white/60">{note}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
