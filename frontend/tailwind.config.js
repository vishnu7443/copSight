/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        police: {
          gold: "#f59e0b",
          blue: "#3b82f6",
          navy: "#0f172a",
          card: "#1e293b",
          border: "rgba(51, 65, 85, 0.7)",
          cyan: "#06b6d4",
          red: "#ef4444"
        }
      }
    },
  },
  plugins: [],
}
