/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-300": "#5D87FF",
        "primary-400":  "#3F71FF",
        "secondary-300": "#44b7f7",
        "secondary-400": "#41B0ED",
        "yellow-p-500": "#E9AB2E",
        "red-p-500": "#FC4B6C",
        "gray-300-p": "#A1AAB2",
        "black-600-p": "#2a3547"
      },
      boxShadow: {
        "primary": "#919eab4d 0 0 2px, #919eab1f 0 12px 24px -4px"
      },
      padding: {
        "containerWBoxShadow":  "1rem 1.5rem"
      },
      backgroundImage: (theme) => ({
        "shadow": "linear-gradient(0deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 100%)"
      }),
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1024px",
      lg: "1280px"
    }
  },
  plugins: [],
}