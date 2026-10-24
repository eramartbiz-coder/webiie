import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type MouseEvent } from "react";
import { useInView, useReducedMotion } from "../hooks/useUi";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const [ref, seen] = useInView<HTMLDivElement>(0.12);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${seen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"} ${className}`}
    >
      {children}
    </div>
  );
}

export function CountUp({ value, duration = 1600, className = "" }: { value: string; duration?: number; className?: string }) {
  const m = value.match(/^([+-]?)(\d+(?:\.\d+)?)(.*)$/);
  const target = m ? parseFloat(m[2]) : 0;
  const [ref, seen] = useInView<HTMLSpanElement>(0.4);
  const reduced = useReducedMotion();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen || !m) return;
    if (reduced) {
      setN(target);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      setN(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen, target, duration, reduced]);
  if (!m) return <span className={className}>{value}</span>;
  const dec = m[2].includes(".") ? m[2].split(".")[1].length : 0;
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {m[1]}
      {n.toFixed(dec)}
      {m[3]}
    </span>
  );
}

/** Card with a cursor-following spotlight and an optional 3D tilt. */
export function SpotCard({ children, className = "", tilt = false }: { children: ReactNode; className?: string; tilt?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [style, setStyle] = useState<CSSProperties>({});
  const [glow, setGlow] = useState({ x: 0, y: 0, on: false });
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current!.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    setGlow({ x, y, on: true });
    if (tilt && !reduced) {
      const px = x / r.width - 0.5;
      const py = y / r.height - 0.5;
      setStyle({ transform: `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg) translateY(-4px)` });
    }
  };
  const leave = () => {
    setGlow((g) => ({ ...g, on: false }));
    setStyle({});
  };
  return (
    <div ref={ref} onMouseMove={move} onMouseLeave={leave} style={style} className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-300"
        style={{ opacity: glow.on ? 1 : 0, background: `radial-gradient(260px circle at ${glow.x}px ${glow.y}px, rgba(80,140,255,.22), transparent 70%)` }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
