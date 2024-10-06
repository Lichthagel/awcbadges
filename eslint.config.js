// @ts-check

import lichthagel from "@lichthagel/eslint-config";
import astroPlugin from "eslint-plugin-astro";
import sveltePlugin from "eslint-plugin-svelte";
import path from "node:path";
import url from "node:url";

/** @type {import("@lichthagel/eslint-config").FlatConfigItem[]} */
export default [
  ...await lichthagel({
    node: true,
  }),
  ...(/** @type {import("eslint").Linter.FlatConfig[]} */ (sveltePlugin.configs["flat/recommended"])),
  ...astroPlugin.configs["flat/recommended"],
  {
    languageOptions: {
      parserOptions: {
        extraFileExtensions: [".astro", ".svelte"],
        project: true,
        tsconfigRootDir: path.dirname(url.fileURLToPath(import.meta.url)),
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
    ignores: [
      "dist/**/*",
      "node_modules/**/*",
      ".astro/**/*",
      ".pnpm-store/**/*",
    ],
  },
];
