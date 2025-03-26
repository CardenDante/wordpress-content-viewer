/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#A86212',
          'primary-dark': '#8A5210',
        },
        fontFamily: {
          sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        },
        spacing: {
          '128': '32rem',
        },
        height: {
          'screen-75': '75vh',
          'screen-50': '50vh',
        },
        boxShadow: {
          'inner-lg': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        },
        zIndex: {
          '-10': '-10',
        },
        typography: (theme) => ({
          DEFAULT: {
            css: {
              color: theme('colors.gray.800'),
              a: {
                color: theme('colors.primary'),
                '&:hover': {
                  color: theme('colors.primary-dark'),
                },
              },
              h1: {
                color: theme('colors.primary'),
              },
              h2: {
                color: theme('colors.primary'),
              },
              h3: {
                color: theme('colors.primary'),
              },
            },
          },
        }),
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }