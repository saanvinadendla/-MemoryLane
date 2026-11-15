/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFAF2',
          100: '#FDF6EA',
          200: '#F8EDD8',
          300: '#F0DFC2',
        },
        pink: {
          100: '#F8DDE8',
          200: '#F4CBDC',
          300: '#EDB2CC',
          500: '#C86A92',
        },
        babyblue: {
          100: '#DCEBFA',
          200: '#C6DEF5',
          300: '#A8CCF0',
          500: '#5B8FC7',
        },
        mint: {
          100: '#DDF1E4',
          200: '#C6E7D4',
          300: '#A4D8BC',
          500: '#5C9E78',
        },
        peach: {
          100: '#FBE3D5',
          200: '#F7D2BC',
          300: '#F2B99A',
          500: '#D9824F',
        },
        lavender: {
          100: '#E6DDF7',
          200: '#D8CBF2',
          300: '#C2ACEA',
          500: '#8B6FC0',
        },
        blush: {
          100: '#FCEEF0',
          200: '#F4CBDC',
          300: '#EDB2CC',
          500: '#C86A92',
        },
        coral: {
          100: '#FBE3D5',
          200: '#F7D2BC',
          300: '#F2B99A',
          500: '#E0784A',
        },
        butter: {
          100: '#FFF1C9',
          200: '#FBE9A8',
          300: '#F0D888',
          500: '#D9A83F',
        },
        ink: {
          700: '#6B5B4E',
          800: '#4A3F36',
          900: '#332C26',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        body: ['"Nunito Sans"', 'system-ui', 'sans-serif'],
        hand: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        card: '0 2px 6px rgba(74, 63, 54, 0.08), 0 12px 32px rgba(74, 63, 54, 0.12)',
        'card-hover':
          '0 4px 10px rgba(74, 63, 54, 0.10), 0 20px 48px rgba(74, 63, 54, 0.18)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--tilt, 0deg))' },
          '50%': { transform: 'translateY(-10px) rotate(var(--tilt, 0deg))' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        'float-slow': 'float-slow 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
