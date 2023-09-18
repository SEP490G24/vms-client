// import colors from 'tailwindcss/colors'

import colors from 'tailwindcss/colors'

// @ts-ignore
delete colors['lightBlue'];
// @ts-ignore
delete colors['warmGray'];
// @ts-ignore
delete colors['trueGray'];
// @ts-ignore
delete colors['coolGray'];
// @ts-ignore
delete colors['blueGray'];

export const themes = {
  ...colors,
  'primary': {
    'light': '#e6edff',
    'normal': '#006bf6',
    'active': '#0064e8',
    'hover': '#0048a5'
  },
  'secondary': {
    'normal': '#8b949b',
    'active': '#757c81',
    'hover': '#4f5357'
  },
  'tertiary': '#5be3ff',
  'muted': '#92a3b1',
  'disabled': '#8b949b',
  'body': '#f2f5f8'
}
