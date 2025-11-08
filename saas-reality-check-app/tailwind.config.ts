import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        danger: {
          50: '#fff0f1',
          100: '#ffe5e8',
          200: '#ffccd1',
          300: '#ff9da8',
          400: '#ff6b7f',
          500: '#dc3545',
          600: '#c82333',
          700: '#a71d2a',
          800: '#8b1a24',
          900: '#721820',
        },
      },
    },
  },
  plugins: [],
};

export default config;
