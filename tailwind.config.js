/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{ts,tsx}'],
  theme: {
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
    },
  },
}