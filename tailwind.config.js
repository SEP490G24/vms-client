/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman'
    },
    extend: {
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
        'body': '#fafafa'
      }
    },
  },
  plugins: [],
  important: true,
  corePlugins: { preflight: false }
}

