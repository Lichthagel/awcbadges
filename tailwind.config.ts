/* eslint-disable @typescript-eslint/no-unsafe-call */
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
        sans: ["Sora Variable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    catppuccin({
      prefix: "ctp",
    }),
  ],
} satisfies Config;
