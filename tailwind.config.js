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
          50: '#f8f9e8',
          100: '#f1f4d1',
          200: '#e2f163',  // Light yellow (from your palette)
          300: '#d4e83a',
          400: '#c5df11',
          500: '#8B8839',   // Dark yellow (from your palette)
          600: '#6b6a2b',
          700: '#4c4b1e',
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
    },
  },
  plugins: [
    
  ],
}