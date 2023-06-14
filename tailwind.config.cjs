const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          `"Recursive Variable", "Recursive", ${defaultTheme.fontFamily.sans.join(
            ", ",
          )}`,
          {
            fontVariationSettings: '"CRSV" 1',
          },
        ],
      },
    },
  },
  plugins: [],
};
