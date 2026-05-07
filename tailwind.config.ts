import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: { gold: { DEFAULT: "#f97316", light: "#fb923c", dark: "#ea580c" } },
      animation: { ticker: "ticker 30s linear infinite" },
      keyframes: { ticker: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } } },
    },
  },
  plugins: [],
};
export default config;
