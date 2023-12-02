/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px'
      },
      boxShadow: {
        'inner-xl': 'rgb(202 202 202) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset'
      },
      colors: {
        'primary': {
          'light': '#e6edff',
          'normal': '#006bf6',
          'hover': '#0064e8',
          'active': '#0048a5'
        },
        'secondary': {
          'normal': '#8b949b',
          'hover': '#757c81',
          'active': '#4f5357'
        },
        'tertiary': '#5be3ff',
        'muted': '#92a3b1',
        'body': '#f6f6f6'
      }
    }
  },
  plugins: [],
  important: true,
  corePlugins: { preflight: false }
}

