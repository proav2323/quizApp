/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js", "node_modules/preline/dist/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require('@sira-ui/tailwind'), require('preline/plugin')],
}

