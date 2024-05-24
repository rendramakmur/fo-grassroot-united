/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'san-serif']
      },
      fontSize: {
        'xxxs': '.40rem',
        'xxs': '.50rem',
        'xs': '.60rem',
        'xsm': '.75rem',
      },
      animation: {
        'spin-slow': 'spin 15s linear infinite',
      }
    },
  },
  plugins: [],
}