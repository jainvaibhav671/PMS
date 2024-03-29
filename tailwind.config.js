/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        black: {
          DEFAULT: "#282C34",
          100: "#3b414d",
          200: "#4e5666",
        },
        red: {
          DEFAULT: "#e06c75",
          100: "hsl(355, 65%, 85%)",
          200: "hsl(355, 65%, 45%)",
        },
        green: "#98c379",
        yellow: {
          DEFAULT: "#e5c07b",
          100: "hsl(39, 67%, 89%)",
          200: "hsl(39, 67%, 49%)",
        },
        blue: {
          DEFAULT: "#61afef",
          100: "hsl(207, 82%, 86%)",
          200: "hsl(207, 82%, 46%)",
        },
        pink: "#c678dd",
        teal: "#56b6c2",
        grey: "#abb2bf",
        white: {
          DEFAULT: "#fafafa",
          100: "#e6e6e6",
          200: "#cccccc",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}