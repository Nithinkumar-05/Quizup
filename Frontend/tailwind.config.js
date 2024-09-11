/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}", // Add Material Tailwind components
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}", // Add Material Tailwind theme
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
