import { defineCollection, reference, z } from "astro:content";
import { zCategory, zChallenge } from "../models";

const challengeCollection = defineCollection({
  type: "data",
  schema: zChallenge,
});

const categoryCollection = defineCollection({
  type: "data",
  schema: zCategory,
});

export const collections = {
  challenge: challengeCollection,
  category: categoryCollection,
};
