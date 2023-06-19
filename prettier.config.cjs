/** @type {import("prettier").Config} */
const config = {
  // @ts-ignore
  ...require("eslint-config-lichthagel/prettier.config.cjs"),
  plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  pluginSearchDirs: ["."],
  overrides: [{ files: "*.astro", options: { parser: "astro" } }],
};

module.exports = config;
