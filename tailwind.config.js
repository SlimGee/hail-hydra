module.exports = {
  content: [
    "./layout/*.liquid",
    "./templates/*.liquid",
    "./templates/customers/*.liquid",
    "./src/**/*js",
    "./sections/*.liquid",
    "./snippets/*.liquid",
  ],
  theme: {
    screens: {
      sm: "320px",
      md: "750px",
      lg: "990px",
      xlg: "1440px",
      x2lg: "1920px",
      pageMaxWidth: "1440px",
    },
    extend: {
      fontFamily: {
        heading: "var(--font-heading-family)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
