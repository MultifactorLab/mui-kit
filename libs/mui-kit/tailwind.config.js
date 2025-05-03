const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        'mui-white': {
          DEFAULT: 'var(--mui-color-white)',
        },
        'mui-black': {
          DEFAULT: 'var(--mui-color-black)',
        },
        'mui-primary': {
          400: 'var(--mui-color-primary-400)',
          500: 'var(--mui-color-primary-500)',
          600: 'var(--mui-color-primary-600)',
        },
        'mui-secondary': {
          400: 'var(--mui-color-secondary-400)',
          500: 'var(--mui-color-secondary-500)',
          600: 'var(--mui-color-secondary-600)',
        },
        'mui-success': {
          400: 'var(--mui-color-success-400)',
          500: 'var(--mui-color-success-500)',
          600: 'var(--mui-color-success-600)',
        },
        'mui-danger': {
          400: 'var(--mui-color-danger-400)',
          500: 'var(--mui-color-danger-500)',
          600: 'var(--mui-color-danger-600)',
        }
      },
      spacing: {
        DEFAULT: 'var(--mui-spacing)',
        xs: 'var(--mui-spacing-xs)',
        sm: 'var(--mui-spacing-sm)',
        md: 'var(--mui-spacing-md)',
        lg: 'var(--mui-spacing-lg)',
      },
      borderRadius: {
        sm: 'var(--mui-border-radius-sm)',
        md: 'var(--mui-border-radius-md)',
        lg: 'var(--mui-border-radius-lg)',
      }
    },
  },
  plugins: [],
};
