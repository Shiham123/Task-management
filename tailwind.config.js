/** @type {import('tailwindcss').Config} */
import scrollBarHide from 'tailwind-scrollbar-hide';

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
        customCharadeTwo: '#20212c',
        blueMarguerite: '#735fc7',
        darkBgColor: '#20212c',
        bgSidebar: '#f4f7fd',
        centerText: '#828fa3',
      },
    },
  },
  plugins: [scrollBarHide],
};
