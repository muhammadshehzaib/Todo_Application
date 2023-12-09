/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",

  theme: {
    extend: {
      fontFamily: {
        ubantu: ["Ubuntu", "sans-serif"],
      },
    },
  },
  plugins: [],
};
