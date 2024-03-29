/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ["index.html", "./src/**/*.jsx", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        'work-sans': ['Work Sans', 'sans'],
        'josefin-sans': ['Josefin Sans', 'sans']
      },
      boxShadow: {
        'shadow-button': '0px 5px 5px rgba(0, 0, 0, 0.5)',
      },
      colors: {
        'color-sena': '#39a900',
        'color-sena-hover': '#369206',
        'color-aprendiz': '#82def0',
        'color-aprendiz-text': '#1c566e',
        'color-instructor': '#CB7766',
        'color-directivo': '#385C57',
      },
    },
    screens: {
      'xs': '475px',
      'xxs': '310px',
      ...defaultTheme.screens,
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

