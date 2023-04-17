/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
