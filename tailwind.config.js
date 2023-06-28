/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        black: "#282c34",
        red: "#e06c75",
        green: "#98c379",
        yellow: "#e5c07b",
        blue: "#61afef",
        pink: "#c678dd",
        teal: "#56b6c2",
        grey: "#abb2bf",
        white: "#fafafa",
        "dark-white": "#eaeaea",
      },
    },
  },
  plugins: [],
};
