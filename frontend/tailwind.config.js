/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'neon-blue': '#00eaff',
        'neon-purple': '#a259ff',
        'dark-bg': '#18181b',
        'futuristic-card': '#23233b',
        'light-bg': '#f1f5f9',
        'light-card': '#e0e7ef'
      },
      fontFamily: {
        futuristic: ['Orbitron', 'sans-serif']
      },
      boxShadow: {
        neon: '0 0 10px #00eaff, 0 0 20px #a259ff'
      }
    }
  },
  plugins: [],
}