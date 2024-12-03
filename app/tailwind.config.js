/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './frontend/static/js/**/*.{js,jsx}',
    './frontend/templates/**/*.html',
    './frontend/static/js/**/*.{html,js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        server: {
          montreal: {
            light: '#e0f2fe',
            dark: '#1e40af',
          },
          washington: {
            light: '#dcfce7',
            dark: '#166534',
          },
          singapore: {
            light: '#fef3c7',
            dark: '#854d0e',
          }
        }
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'vm-card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'vm-card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    },
  },
  plugins: [],
}
