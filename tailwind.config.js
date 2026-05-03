export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF9900',
          hover: '#E68A00',
        },
        secondary: '#232F3E',
        background: '#F5F5F5',
        card: '#FFFFFF',
        border: '#E0E0E0',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}