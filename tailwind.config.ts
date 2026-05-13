import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4ade80',
          dark: '#22c55e',
          light: '#86efac',
        },
        finance: {
          green: '#10b981',
          red: '#ef4444',
          dark: '#1a202c',
          gray: '#4a5568',
        }
      },
      fontFamily: {
        sans: ['Noto Sans', 'system-ui', 'sans-serif'],
        heading: ['Raleway', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
