/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "my-green": "#74B71B",
        "my-lightgreen": "#D5E8C6",
        "my-darkgreen": "#006A4E",
        "my-verydarkgreen": "#3C3C3F",
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
