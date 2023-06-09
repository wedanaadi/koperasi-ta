/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "../resources/**/*.blade.php",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1A120B',
        'second': '#D5CEA3',
        'third': '#3C2A21',
        'four': '#E5E5CB',
      },
    },
  },
  plugins: [],
}
