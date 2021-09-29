/* eslint-disable global-require */
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'porcelain-white': 'var(--porcelain-white)',
        'alto-gray': 'var(--alto-gray)',
        'dusty-gray': 'var(--dusty-gray)',
        'shark-black': 'var(--shark-black)',
        'picton-blue': 'var(--picton-blue)',
        'caribbean-green': 'var(--caribbean-green)',
        'buttercup-yellow': 'var(--buttercup-yellow)',
        'fuzzy-brown': 'var(--fuzzy-brown)',
      },
      padding: {
        section: '10rem',
      },
      height: {
        header: 'h-20',
      },
      gridTemplateRows: {
        9: 'repeat(9, minmax(0, 1fr))',
      },
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
};
