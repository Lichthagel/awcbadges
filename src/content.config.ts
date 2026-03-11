import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";

import { zCategory, zChallenge } from "./models";

const challengeCollection = defineCollection({
  schema: zChallenge,
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/content/challenge" }),
});

const categoryCollection = defineCollection({
  schema: zCategory,
  loader: glob({ pattern: "**/[^_]*.json", base: "./src/content/category" }),
});

export const collections = {
  category: categoryCollection,
  challenge: challengeCollection,
};
