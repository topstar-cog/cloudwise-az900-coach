/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ecff',
          200: '#bcdcff',
          300: '#8ec5ff',
          400: '#59a3ff',
          500: '#2f81f6',
          600: '#1a63e6',
          700: '#164db8',
          800: '#173f91',
          900: '#173872',
        },
        teal: {
          50: '#effcf9',
          100: '#cbf7ef',
          200: '#97ede0',
          300: '#5cdccc',
          400: '#2cc4b6',
          500: '#14a89a',
          600: '#0d867c',
          700: '#106a64',
          800: '#135451',
          900: '#134643',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(16, 49, 73, 0.08), 0 4px 16px rgba(16, 49, 73, 0.06)',
        soft: '0 2px 10px rgba(16, 49, 73, 0.05)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fadeIn 220ms ease-out',
      },
    },
  },
  plugins: [],
};
