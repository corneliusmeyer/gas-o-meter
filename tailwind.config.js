/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        "primary-color-dark": "var(--primary-color-dark)",
        "secondary-color-dark": "var(--secondary-color-dark)",
      }
    },
  },
  plugins: [],
}
