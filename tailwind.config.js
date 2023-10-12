/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
    },
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        white: "#ffffff",
        black: "#000",

        secondaryText: "#60606E",
        primaryBackground: "#07071c",
        brightGreen: "#83FF1E",
        brightRed: "#EE2542",
      },
      keyframes: {
        slide: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-400%)" },
        },
      },
      animation: {
        slide: "slide 60s linear infinite",
      },
    },
  },
  plugins: [],
};
