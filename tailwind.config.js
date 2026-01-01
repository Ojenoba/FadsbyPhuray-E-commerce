/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
    extend: {
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        inter: ["Inter", "sans-serif"]
      },
    },
    colors: {
  primary: "#FF6B35",
  secondary: "#FFF5E6",
  accent: "#4ECDC4",
  neutral: "#1A1A1A",
}
  },
}
