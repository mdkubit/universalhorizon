// File: frontend/tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          400: '#b388ff',
          600: '#7c4dff',
          700: '#651fff'
        },
        blue: {
          400: '#7efeff',
          600: '#00bcd4',
          700: '#0097a7'
        },
        gray: {
          900: '#121b28',
          950: '#0b0f1c'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
};
