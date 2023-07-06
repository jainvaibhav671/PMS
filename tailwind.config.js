/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "#282C34",
          100: "#3b414d",
          200: "#4e5666",
        },
        red: "#e06c75",
        green: "#98c379",
        yellow: "#e5c07b",
        blue: "#61afef",
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
};
