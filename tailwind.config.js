/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          black: '#131a20',
          slate: colors.slate,
          // "primary" and "neutral" are deprecated, prefer the use of "blue" and "gray"
          // in new code.
          primary: colors.blue,
          neutral: colors.slate,
          cyan: colors.cyan,
      },
    },
  },
  plugins: [],
}
