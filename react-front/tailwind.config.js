/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#d2dcf7",
          200: "#a5b8ef",
          300: "#7795e8",
          400: "#4a71e0",
          500: "#1d4ed8",
          600: "#173ead",
          700: "#112f82",
          800: "#0c1f56",
          900: "#06102b"
        },
      }
    },
  },
  plugins: [],
}

