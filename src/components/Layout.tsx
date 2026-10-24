import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ArrowUp } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppFab from "./WhatsAppFab";
import { useScroll } from "../hooks/useUi";

export default function Layout() {
  const { pathname } = useLocation();
  const { y } = useScroll();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return (
    <div className="min-h-screen bg-ink-950">
      <Navbar />
      <main key={pathname} className="animate-fadeUp">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/40 bg-ink-800/90 shadow-glow backdrop-blur transition-all duration-300 hover:bg-brand-blue ${y > 700 ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}
