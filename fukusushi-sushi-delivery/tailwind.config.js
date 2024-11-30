/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: true,
  theme: {
    extend: {
      colors: {
        'primary-color': '#171313',
        'nav-bg': '#fbfbf3',
        'custom-light-grey' : '#D9D9D9',
        'footer-bg': '#222222',
        'btn-green': "#75CE7F",
        'btn-green-hover': '#66b06e',
        'btn-grey': '#6c757d',
        'btn-grey-hover': '#5c636a'
      }
    },
  },
  plugins: [],
}
