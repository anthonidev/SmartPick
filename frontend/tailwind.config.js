/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        'blob': "url('/images/blob-scene-haikei.svg')",
      },
      colors: {
        primary: {
          DEFAULT: "#fec834",
          100: "#fff133",
          200: "#ffd634",
          300: "#cb9f29",
          400: "#b18b24",
        },
        secondary: {
          DEFAULT: "#e03e55",
          100: "#ff4648",
          200: "#ff4654",
          300: "#ad2f41",
          400: "#932837",
        },
        tertiary: {
          DEFAULT: "#4e4596",
          100: "#7568e2",
          200: "#6156bc",
          300: "#332d63",
          400: "#262149",
        },
        osc: {
          DEFAULT: "#001220",
          100: "#003d6c",
          200: "#002746",
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
