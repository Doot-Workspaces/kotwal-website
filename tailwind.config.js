/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#F5F1E8",
        bgW: "#FDFBF7",
        ink: "#1A1A24",
        maroon: "#811622",
        maroonD: "#5C0F18",
        orange: "#F58634",
        plum: "#53435B",
        bdr: "#D4CBBB",
      },
      fontFamily: {
        display: ["'Playfair Display'", "Georgia", "serif"],
        body: ["Outfit", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "Menlo", "monospace"],
        dv: ["'Noto Sans Devanagari'", "Outfit", "sans-serif"],
      },
    },
  },
  plugins: [],
};
