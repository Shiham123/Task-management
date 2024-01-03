/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        customWhite: '#ffffff',
        customBlack: '#000000',
        darkPrimary: '#2b2c37',
        customBgBtn: '#635fc7',
        customCharade: '#2b2c37',
        customTurquoiseBlue: '#364e7e',
      },
    },
  },
  plugins: [],
};
