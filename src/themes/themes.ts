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
  'sidebar': {
    'bgHover': '#3a3b3c',
    'bg': '#282a2a',
    'bgActive': '#161617',
  },
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
  'body': '#f6f6f6',
  'secondBody':'#fafafa'
}
