// const defaultTheme = require("tailwindcss/defaultTheme");
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import catppuccin from "@catppuccin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          `"Recursive Variable", "Recursive", ${defaultTheme.fontFamily.sans.join(
            ", ",
          )}`,
          {
            fontVariationSettings: '"CRSV" 1, "CASL" 0',
          },
        ],
      },
    },
  },
  plugins: [
    catppuccin({
      prefix: "ctp",
      defaultFlavour: "latte",
    }),
  ],
} satisfies Config;
