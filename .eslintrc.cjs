/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:astro/recommended",
    "lichthagel",
    "lichthagel/node",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020,
    extraFileExtensions: [".astro"],
    project: "./tsconfig.json",
  },
  env: {
    browser: true,
    es2017: true,
    node: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        project: ["./tsconfig.json"],
      },
    },
  },
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
      extends: ["lichthagel/typescript"],
      rules: {
        "@typescript-eslint/no-unsafe-return": "off",
      },
    },
    {
      files: ["**/*.ts?(x)"],
      extends: ["lichthagel/typescript"],
    },
  ],
};
