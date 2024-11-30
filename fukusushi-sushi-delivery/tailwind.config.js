/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-light-grey' : '#D9D9D9',
        'footer-bg': '#222222',
      }
    },
  },
  plugins: [],
}
