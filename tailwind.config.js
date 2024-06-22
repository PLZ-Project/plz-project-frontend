/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        BlackHanSans: ['Black Han Sans', 'sans-serif'],
        NotoSansKR: ['Noto Sans KR', 'sans-serif'],
        IBMPlexSansKR: ['IBM Plex Sans KR', 'sans-serif'],
        RobotoCondensed: ['Roboto Condensed', 'sans-serif'],
        GowunDodum: ['Gowun Dodum', 'sans-serif'],
        BebasNeue: ['Bebas Neue', 'sans-serif']
      },
      backgroundImage: {
        auth: "url('./src/assets/auth.webp')",
        landing: "url('./src/assets/landing.webp')",
        board: "url('./src/assets/board.webp')",
        board2: "url('./src/assets/board2.webp')"
      },
      colors: {
        mainBlue: '#324FE5',
        'mainBlue-100': 'rgba(50, 79, 229, 0.1)',
        'mainBlue-200': 'rgba(50, 79, 229, 0.2)',
        'mainBlue-300': 'rgba(50, 79, 229, 0.3)',
        'mainBlue-400': 'rgba(50, 79, 229, 0.4)',
        'mainBlue-500': 'rgba(50, 79, 229, 0.5)',
        'mainBlue-600': 'rgba(50, 79, 229, 0.6)',
        'mainBlue-700': 'rgba(50, 79, 229, 0.7)',
        'mainBlue-800': 'rgba(50, 79, 229, 0.8)',
        'mainBlue-900': 'rgba(50, 79, 229, 0.9)',
        warnRed: '#FF1E1E',
        placeholderGray: '#BABABA',
        sky: '#daefff',
        bgGray: '#E7E7E7',
        yel: '#FFB800',
        'yel-100': 'rgba(255, 184, 0, 0.1)',
        'yel-200': 'rgba(255, 184, 0, 0.2)',
        'yel-300': 'rgba(255, 184, 0, 0.3)',
        'yel-400': 'rgba(255, 184, 0, 0.4)',
        'yel-500': 'rgba(255, 184, 0, 0.5)',
        'yel-600': 'rgba(255, 184, 0, 0.6)',
        'yel-700': 'rgba(255, 184, 0, 0.7)',
        'yel-800': 'rgba(255, 184, 0, 0.8)',
        'yel-900': 'rgba(255, 184, 0, 0.9)'
      }
    }
  },
  plugins: [require('daisyui')]
};
