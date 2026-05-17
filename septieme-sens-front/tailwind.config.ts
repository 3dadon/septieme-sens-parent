import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        body: ['"Inter"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        cream: "#f7efe3",
        ivory: "#fffaf1",
        sand: "#d8c2a0",
        gold: "#a47a32",
        ink: "#18130f",
      },
      boxShadow: {
        capsule: "0 24px 80px rgba(50, 35, 19, 0.18)",
        veil: "0 30px 120px rgba(67, 48, 29, 0.11)",
      },
    },
  },
  plugins: [],
} satisfies Config;
