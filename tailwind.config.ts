import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        ink: { 950: "#030817", 900: "#050c24", 800: "#0a1438" },
        brand: {
          cyan: "#00d4ff",
          blue: "#0b5cff",
          violet: "#8b4dff",
          pink: "#c04dff",
          teal: "#12d6a8",
          coral: "#ff5a3c",
        },
      },
      backgroundImage: {
        "grad-text": "linear-gradient(90deg,#00e0ff 0%,#3b6bff 55%,#b44dff 100%)",
        "grad-cta": "linear-gradient(90deg,#0b5cff 0%,#7b3dff 100%)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        pop: { from: { opacity: "0", transform: "translateY(12px) scale(.96)" }, to: { opacity: "1", transform: "none" } },
        fadeUp: { from: { opacity: "0", transform: "translateY(16px)" }, to: { opacity: "1", transform: "none" } },
        blink: { "50%": { opacity: "0" } },
        spin360: { to: { transform: "rotate(360deg)" } },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        pop: "pop .25s ease-out",
        fadeUp: "fadeUp .5s ease-out both",
        blink: "blink 1s step-end infinite",
        spinSlow: "spin360 80s linear infinite",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(11,92,255,.55)",
      },
    },
  },
  plugins: [],
} satisfies Config;
