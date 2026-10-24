import { useEffect, useRef, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen, threshold]);
  return [ref, seen] as const;
}

export function useScroll() {
  const [state, setState] = useState({ y: 0, dir: "up" as "up" | "down", progress: 0 });
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setState((s) => ({ y, dir: Math.abs(y - last) < 6 ? s.dir : y > last ? "down" : "up", progress: max > 0 ? y / max : 0 }));
      last = y;
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return state;
}

export function useInterval(fn: () => void, ms: number | null) {
  const saved = useRef(fn);
  saved.current = fn;
  useEffect(() => {
    if (ms === null) return;
    const id = window.setInterval(() => saved.current(), ms);
    return () => window.clearInterval(id);
  }, [ms]);
}

export function useTypewriter(words: string[], speed = 70, hold = 1400) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return;
    }
    const word = words[i % words.length];
    let t: number;
    if (!del && text === word) t = window.setTimeout(() => setDel(true), hold);
    else if (del && text === "") {
      setDel(false);
      setI((n) => n + 1);
    } else t = window.setTimeout(() => setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)), del ? speed / 2 : speed);
    return () => window.clearTimeout(t);
  }, [text, del, i, words, speed, hold, reduced]);
  return text;
}
