/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      customWhite: '#ffffff',
      darkPrimary: '#2b2c37',
      customBgBtn: '#635fc7',
    },
    extend: {},
  },
  plugins: [],
};
