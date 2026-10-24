import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { CircleAlert, CircleCheck, X } from "lucide-react";

type Kind = "success" | "error";
type Toast = { id: number; kind: Kind; text: string };
const Ctx = createContext<(text: string, kind?: Kind) => void>(() => {});
export const useToast = () => useContext(Ctx);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Toast[]>([]);
  const dismiss = useCallback((id: number) => setItems((l) => l.filter((t) => t.id !== id)), []);
  const push = useCallback(
    (text: string, kind: Kind = "success") => {
      const id = Date.now() + Math.random();
      setItems((l) => [...l, { id, kind, text }]);
      window.setTimeout(() => dismiss(id), 4500);
    },
    [dismiss],
  );
  return (
    <Ctx.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 flex-col gap-3 sm:left-auto sm:right-6 sm:translate-x-0" role="status" aria-live="polite">
        {items.map((t) => (
          <div key={t.id} className="pointer-events-auto flex animate-pop items-center gap-3 rounded-xl border border-white/10 bg-ink-800/95 px-4 py-3 text-sm shadow-glow backdrop-blur">
            {t.kind === "success" ? <CircleCheck size={20} className="text-teal-300" /> : <CircleAlert size={20} className="text-red-400" />}
            <span>{t.text}</span>
            <button onClick={() => dismiss(t.id)} aria-label="Dismiss" className="ml-2 text-white/50 hover:text-white"><X size={16} /></button>
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
