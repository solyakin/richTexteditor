/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize : {
        xxs : "0.6rem"
      },
      colors : {
        'primary-green' : "#0D7227"
      }
    },
  },
  plugins: [],
}
