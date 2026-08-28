import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#19252A",
        paper: "#F8FAF7",
        seal: "#087F6E",
        sealDeep: "#056052",
        brass: "#D58B32",
        clay: "#D35F4D",
        line: "#DDE7E1",
        mint: "#E2F3EC",
        sky: "#E7F1F6",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        sm: "2px",
      },
    },
  },
  plugins: [],
};
export default config;
