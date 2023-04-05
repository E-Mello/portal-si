import { type Config } from "tailwindcss";
/** @type {import('tailwindcss').Config} */

export default {
  mode: "jit",
  darkMode: "media", // or 'media' or 'class'
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {      
  },
},
  variants: {
    extend: {},
  },
  plugins: [

  ],
} satisfies Config;
