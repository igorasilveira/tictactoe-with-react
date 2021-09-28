/* eslint-disable global-require */
module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        snug: '0px 1px 2px rgba(0, 0, 0, 0.1)',
      },
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        froly: {
          default: 'var(--froly)',
        },
        'carolina-blue': {
          default: 'var(--carolina-blue)',
        },
        'ghost-white': {
          default: 'var(--ghost-white)',
        },
        'minion-yellow': {
          default: 'var(--minion-yellow)',
        },
        'rich-black': {
          default: 'var(--rich-black)',
        },
        main: {
          default: 'var(--main-text)',
          2: 'var(--main-text-2)',
          3: 'var(--main-text-3)',
        },
        background: {
          default: 'var(--bg-color)',
          2: 'var(--bg-color-2)',
          3: 'var(--bg-color-3)',
        },
        'card-color': {
          default: 'var(--card-color)',
        },
        gray: {
          1: 'var(--gray-1)',
          2: 'var(--gray-2)',
          3: 'var(--gray-3)',
          4: 'var(--gray-4)',
          5: 'var(--gray-5)',
        },
      },
    },
  },
  variants: {
    extend: {
      divideColor: ['group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
