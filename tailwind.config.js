/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 1s ease-in',
      },
      keyframes: {
        fadeIn:{
          '0%':{opacity:0, transform:'translate(0,30px)'},
          '100%':{opacity:1,transform:'translate(0,0)'},
        }
      },
      colors: {
        "primary-light": "#C3CEDA",
        "secondary-light": "#738FA7",
        "primary-dark": "#0C4160",
        "secondary-dark": "#071330",
      },
      dropShadow: {
        lnl: [
          "-1px -1px 1px rgba(255, 255, 255, 1)",
          "1px 1px 1px rgba(255, 255, 255, 1)",
        ],
        lnd: ["-1px -1px 1px rgba(0, 0, 0, 1)", "1px 1px 1px rgba(0, 0, 0, 1)"],
      },
      fontWeight: ["responsive", "hover", "focus"],
      opacity: ["hover"],
      borderColor: ["hover", "focus"],
      margin: ["first", "last"],
      backgroundColor: ["odd", "even"],
      scale: ["hover", "active", "group-hover"],
    },
  },
  plugins: [],
};
