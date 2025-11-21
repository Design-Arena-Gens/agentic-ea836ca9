import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        petrol: {
          50: "#f2f6ff",
          100: "#e3ecff",
          200: "#c0d5ff",
          300: "#8fafef",
          400: "#5b86da",
          500: "#3a63c0",
          600: "#284aa3",
          700: "#1f3a81",
          800: "#1c336a",
          900: "#1b2d55",
          950: "#0f1a36"
        }
      }
    }
  },
  plugins: []
};

export default config;
