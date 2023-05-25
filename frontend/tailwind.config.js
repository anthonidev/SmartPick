/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          50: '#eef2ff',
          100: '#dfe7ff',
          200: '#c6d1ff',
          300: '#a3b1fe',
          400: '#7e88fb',
          500: '#5f61f5',
          600: '#4c42e9',
          700: '#4134ce',
          800: '#352da6',
          900: '#343090',
          950: '#1d1a4c',
        },
        secondary: {
          50: '#edf1ff',
          100: '#dfe4ff',
          200: '#c5ceff',
          300: '#a1acff',
          400: '#7c80fd',
          500: '#5f59f7',
          600: '#533fec',
          700: '#4732d0',
          800: '#3a2ba8',
          900: '#332a85',
          950: '#1f194d',
        },
        azul: {
          50: '#edf6ff',
          100: '#ddefff',
          200: '#c2e0ff',
          300: '#9ecaff',
          400: '#77a9ff',
          500: '#6592fd',
          600: '#3962f2',
          700: '#2c4ed6',
          800: '#2642ad',
          900: '#273e88',
          950: '#17224f',
        },
        celeste: {
          50: '#f0f9ff',
          100: '#dff2ff',
          200: '#b8e6ff',
          300: '#7ad2ff',
          400: '#44c2fd',
          500: '#09a4ee',
          600: '#0084cc',
          700: '#0068a5',
          800: '#045888',
          900: '#0a4a70',
          950: '#062e4b',
        },
        morado: {
          50: '#f5f2ff',
          100: '#ebe8ff',
          200: '#dad4ff',
          300: '#bfb1ff',
          400: '#a085ff',
          500: '#8c61ff',
          600: '#7230f7',
          700: '#641ee3',
          800: '#5318bf',
          900: '#46169c',
          950: '#2a0b6a',
        },
        osc: {
          DEFAULT: "#001220",
          100: "#003d6c",
          200: "#002746",
        }
      },
      animation: {
        "fade-in": "fade-in 3s ease-in-out forwards",
        title: "title 3s ease-out forwards",
        "fade-left": "fade-left 3s ease-in-out forwards",
        "fade-right": "fade-right 3s ease-in-out forwards",
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0%",
          },
          "75%": {
            opacity: "0%",
          },
          "100%": {
            opacity: "100%",
          },
        },
        "fade-left": {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0%",
          },

          "30%": {
            transform: "translateX(0%)",
            opacity: "100%",
          },
          "100%": {
            opacity: "0%",
          },
        },
        "fade-right": {
          "0%": {
            transform: "translateX(-100%)",
            opacity: "0%",
          },

          "30%": {
            transform: "translateX(0%)",
            opacity: "100%",
          },
          "100%": {
            opacity: "0%",
          },
        },
        title: {
          "0%": {
            "line-height": "0%",
            "letter-spacing": "0.25em",
            opacity: "0",
          },
          "25%": {
            "line-height": "0%",
            opacity: "0%",
          },
          "80%": {
            opacity: "100%",
          },

          "100%": {
            "line-height": "100%",
            opacity: "100%",
          },
        },
      },
    },
  },
  plugins: [],
}
