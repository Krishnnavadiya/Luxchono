/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
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
        secondary: "#E9CC97",
        hide: "#9C9999",
        lightbg: "#FAFAFA",
        darkbg: "#1b120d",
        lighttext: "#A9A9A9",
        yellow: "#ffcd3c",
        boxbac: "#F2F2F2",
        lihgtmain: "#F9F4F1"

      }
    },
  },
  plugins: [],
}
