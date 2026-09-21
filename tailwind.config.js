/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1F3A',
          50: '#EEF2F8',
          100: '#D9E2F1',
          700: '#14315A',
          800: '#0E2545',
          900: '#0B1F3A',
          950: '#071527',
        },
        gold: {
          DEFAULT: '#D99A2B',
          50: '#FBF4E4',
          100: '#F6E7C6',
          200: '#EFD096',
          500: '#D99A2B',
          600: '#B97E1E',
          700: '#946218',
        },
        cream: '#F7F8FA',
        ink: '#111827',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(11, 31, 58, 0.25)',
        soft: '0 6px 20px -8px rgba(11, 31, 58, 0.18)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};
