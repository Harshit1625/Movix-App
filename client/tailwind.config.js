/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#89ecda",
        hover : '#3adfc1'
      },
      fontFamily: {
        poppins: ['"Poppins"', "sans-serif"],
      },
    },
    plugins: [],
  },
};
