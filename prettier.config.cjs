/** @type {import("prettier").Config} */
const config = {
  // @ts-ignore
  ...require("eslint-config-lichthagel/prettier.config.cjs"),
  plugins: [
    "prettier-plugin-astro",
    "prettier-plugin-svelte",
    "prettier-plugin-tailwindcss",
  ],
  pluginSearchDirs: ["."],
  overrides: [
    { files: "*.astro", options: { parser: "astro" } },
    { files: "*.svelte", options: { parser: "svelte" } },
  ],
};

module.exports = config;
