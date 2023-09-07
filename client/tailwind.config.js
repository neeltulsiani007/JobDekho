/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          marineBlue: "#02295A",
          purplishBlue: "#473DFF",
          pastelBlue: "#ADBEFF",
          lightBlue: "#BFE2FD",
          strawberry: "#ED3548",
        },
        neutral: {
          coolGray: "#9699AB",
          lightGray: "#D6D9E6",
          magnolia: "#F0F6FF",
          alabaster: "#FAFBFF",
        },
      },
    },
  },
  plugins: [],
}