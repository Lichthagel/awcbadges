import { defineCollection } from "astro:content";

import { zCategory, zChallenge } from "../models";

const challengeCollection = defineCollection({
  schema: zChallenge,
  type: "data",
});

const categoryCollection = defineCollection({
  schema: zCategory,
  type: "data",
});

export const collections = {
  category: categoryCollection,
  challenge: challengeCollection,
};
