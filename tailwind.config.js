/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'BlackHanSans': ['Black Han Sans', 'sans-serif'],
        'NotoSansKR': ['Noto Sans KR', 'sans-serif'],
        'NotoSansSC': ['Noto+Sans+SC', 'sans-serif'],
        'IBMPlexSansKR': ['IBM+Plex+Sans+KR', 'sans-serif']
      },
      backgroundImage: {
        'default-img': "url('/src/assets/Dva.png')",
        'auth-img': "url('/src/assets/auth.png')",
        'banner': "url('/src/assets/banner.png')",
        'banner1': "url('/src/assets/banner1.png')",
        'test': "url('/src/assets/test.png')"
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
        bgGray: '#E7E7E7',
        yel: '#FFB800'
      }
    }
  },
  plugins: [require('daisyui')]
};
