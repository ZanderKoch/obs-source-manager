/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        darkGray: "#474747",
        lightGray: "#EDE7E7",
        gray: "#777676",
        offblack: "#141414",
        customFocus: "#3B82F6",
      },
      borderColor: {
        DEFAULT: "#777676",
      },
      borderRadius: {
        sm: "10px",
        md: "20px",
        lg: "35px",
        full: "9999px",
      },
      outline: {
        custom: "2px solid #3B82F6",
      },
      fontSize: {
        h1: "48px",
        h2: "24px",
        h3: "18px",
        p: "16px",
      },
      variants: {
        extend: {
          ringColor: ["focus"], // Enable ring color on focus
          ringWidth: ["focus"], // Enable ring width on focus
        },
      },
    },
  },
  plugins: [],
};
