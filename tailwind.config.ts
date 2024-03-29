/* eslint-disable @typescript-eslint/no-unsafe-call */
// const defaultTheme = require("tailwindcss/defaultTheme");
import catppuccin from "@catppuccin/tailwindcss";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Gabarito Variable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    catppuccin({
      prefix: "ctp",
    }),
  ],
} satisfies Config;
