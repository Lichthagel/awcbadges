// @ts-check

import lichthagelNode from "eslint-config-lichthagel/node.js";
import lichthagelTypescript from "eslint-config-lichthagel/typescript.js";
import astroPlugin from "eslint-plugin-astro";
import sveltePlugin from "eslint-plugin-svelte";

/** @type {import("eslint").Linter.FlatConfig[]} */
// @ts-expect-error plugins are not typed correctly
export default [
  ...lichthagelTypescript,
  ...lichthagelNode,
  ...sveltePlugin.configs["flat/recommended"],
  ...astroPlugin.configs["flat/recommended"],
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        extraFileExtensions: [".astro", ".svelte"],
      },
    },
  },
  {
    files: ["*.svelte", "**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: {
          ts: "@typescript-eslint/parser",
        },
      },
    },
  },
  {
    files: ["*.astro", "**/*.astro"],
    rules: {
      "@stylistic/indent": "off",
      "@stylistic/jsx-indent": "off",
    },
  },
  {
    ignores: ["dist/**/*", "node_modules/**/*", ".astro/**/*"],
  },
];
