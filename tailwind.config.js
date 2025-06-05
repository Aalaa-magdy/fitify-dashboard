/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eefabb',       // Lightest yellow-green
          100: '#e5f891e6',     // Semi-transparent light yellow-green
          200: '#e2f163',       // Bright yellow-green
          300: '#d4e83a',       // Medium yellow-green
          400: '#c5df11',       // Vibrant yellow-green
          500: '#8B8839',       // Olive green
          600: '#6b6a2b',       // Dark olive
          700: '#4c4b1e',       // Darkest olive
        },
        accent: {
          500: '#14919B',       // Teal accent from login
        },
        mainBlue: '#14919B',
        mainYellow: '#E2F163',
        mainGreen: '#828B39',
        // Keep your existing colors
        success: {
          500: '#10b981',
        },
        warning: {
          500: '#f59e0b',
        },
        danger: {
          500: '#ef4444',
        },
      },
      backgroundImage: {
        'logo-gradient': 'linear-gradient(to right, #14919B, #E2F163)',
      }
    },
  },
  plugins: [],
}