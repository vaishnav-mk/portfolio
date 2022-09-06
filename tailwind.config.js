module.exports = {
  mode: 'jit',
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Be Vietnam Pro', 'system-ui', 'sans'],
    },
    extend: {
      colors: {
        dark: '#000',
        white: '#fff',
        lightText: '#76797d',
        bgDark: '#2E3440',
        cardDark: '#434C5E',
        butDark: '#5E81AC',
        bgLight: '#D8DEE9',
        cardLight: '#E5E9F0',
        butLight: '#81A1C1',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('daisyui')],
}
