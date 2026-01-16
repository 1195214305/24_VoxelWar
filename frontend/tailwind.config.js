/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-orange': '#ff6b35',
        'neon-cyan': '#00e5cc',
        'dark-bg': '#0a0a0f',
        'dark-card': '#12121a',
      }
    },
  },
  plugins: [],
}
