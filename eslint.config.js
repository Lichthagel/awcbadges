// @ts-check

import lichthagelNode from "eslint-config-lichthagel/node.js";
import lichthagelTypescript from "eslint-config-lichthagel/typescript.js";
import astroPlugin from "eslint-plugin-astro";
import sveltePlugin from "eslint-plugin-svelte";
import path from "node:path";
import url from "node:url";

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
        project: true,
        tsconfigRootDir: path.dirname(url.fileURLToPath(import.meta.url)),
        extraFileExtensions: [".astro", ".svelte"],
      },
    },
  },
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
  },
  {
    files: ["**/*.astro"],
    rules: {
      "@stylistic/indent": "off",
      "@stylistic/jsx-indent": "off",
    },
  },
  {
    ignores: [
      "dist/**/*",
      "node_modules/**/*",
      ".astro/**/*",
      ".pnpm-store/**/*",
    ],
  },
];
