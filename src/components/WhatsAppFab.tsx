import { waLink } from "../data/content";
import { useScroll } from "../hooks/useUi";

export function WhatsAppIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="currentColor" aria-hidden>
      <path d="M16.04 3C9.4 3 4 8.4 4 15.03c0 2.13.56 4.2 1.62 6.03L4 28l7.1-1.86a12 12 0 0 0 4.94 1.06h.01C22.68 27.2 28 21.8 28 15.17 28 8.4 22.68 3 16.04 3zm0 21.9h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-4.21 1.1 1.12-4.1-.24-.38a9.84 9.84 0 0 1-1.52-5.27c0-5.45 4.44-9.88 9.9-9.88 5.45 0 9.88 4.43 9.88 9.9 0 5.45-4.43 9.88-9.88 9.88v.34zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z" />
    </svg>
  );
}

export default function WhatsAppFab() {
  const { y } = useScroll();
  return (
    <a
      href={waLink("Hi Webiie! I'd like to discuss a project.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Webiie on WhatsApp"
      className={`group fixed right-6 z-40 transition-all duration-300 ${y > 700 ? "bottom-24" : "bottom-6"}`}
    >
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg border border-white/10 bg-ink-800/95 px-3 py-2 text-sm opacity-0 shadow-glow transition group-hover:opacity-100 group-focus-visible:opacity-100">
        Chat with Webiie on WhatsApp
      </span>
      <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 motion-reduce:hidden" />
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-5px_rgba(37,211,102,.6)] transition group-hover:scale-110">
        <WhatsAppIcon />
        <img src="/assets/webiie-mark.png" alt="" className="absolute -left-1 -top-1 h-6 w-6 rounded-full border-2 border-white bg-ink-950 object-contain p-0.5" />
      </span>
    </a>
  );
}
