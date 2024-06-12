/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainBlue: '#324FE5',
        mainBlue5: 'rgba(50, 79, 229, 0.5)',
        warnRed: '#FF1E1E',
        placeholderGray: '#BABABA',
        bgGray: '#E7E7E7'
      }
    }
  },
  plugins: []
};
