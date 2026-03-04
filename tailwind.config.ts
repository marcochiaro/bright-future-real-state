import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          black: "#050514",
          navy: "#0a0a2e",
          purple: "#1a0a3e",
          deep: "#0d0d2b",
          white: "#e8e6f0",
          muted: "#8b8aa0",
        },
        gold: {
          300: "#ffd966",
          400: "#d4af37",
          500: "#b8962e",
        },
        sefirah: {
          keter: "#ffffff",
          chokmah: "#a0a0b0",
          binah: "#2a2a3e",
          chesed: "#4169e1",
          gevurah: "#dc143c",
          tiferet: "#ffd700",
          netzach: "#228b22",
          hod: "#ff8c00",
          yesod: "#9370db",
          malkuth: "#8b6914",
        },
        element: {
          fire: "#e74c3c",
          earth: "#8b6914",
          air: "#87ceeb",
          water: "#2980b9",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mystical: ["Georgia", "serif"],
      },
      boxShadow: {
        "glow-gold": "0 0 15px rgba(212, 175, 55, 0.3)",
        "glow-purple": "0 0 15px rgba(147, 112, 219, 0.3)",
        "glow-blue": "0 0 15px rgba(65, 105, 225, 0.3)",
      },
      animation: {
        twinkle: "twinkle 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 5px rgba(212, 175, 55, 0.2)" },
          "50%": { boxShadow: "0 0 20px rgba(212, 175, 55, 0.5)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
