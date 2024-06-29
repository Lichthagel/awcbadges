// const defaultTheme = require("tailwindcss/defaultTheme");
import type { Config } from "tailwindcss";

import catppuccin from "@catppuccin/tailwindcss";
import { getIconCollections, iconsPlugin } from "@egoist/tailwindcss-icons";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  plugins: [
    catppuccin({
      prefix: "ctp",
    }),
    iconsPlugin({
      collections: getIconCollections(["lucide"]),
      extraProperties: {
        "display": "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Gabarito Variable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
} satisfies Config;
