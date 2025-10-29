/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,tsx,ts,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Open Sans', "sans-serif"],
      },
      colors: {
        light: "#B8B7B7",
        white: "#FFFFFF",
        black: "#110E0C",
        main: "#964315",
        header: "#DCDBDB",
        red: "#FA3E3E",
        back: "#F8F8F8",
        secondary : "#F9F4F1"
      }
    },
  },
  plugins: [],
}

