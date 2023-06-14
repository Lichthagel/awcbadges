import { defineCollection, reference, z } from "astro:content";

const challengeCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    url: z
      .string()
      .url()
      .regex(
        /https:\/\/anilist\.co\/forum\/thread\/([0-9]+)\/comment\/([0-9]+)/,
      )
      .transform((url) => {
        const match = url.match(
          /https:\/\/anilist\.co\/forum\/thread\/([0-9]+)\/comment\/([0-9]+)/,
        );

        if (!match) {
          throw new Error("Invalid URL");
        }

        return {
          thread: match[1],
          comment: match[2],
        };
      }),
    badge: z
      .object({
        image: z.string().url().optional(),
        started: z.string(),
        completed: z.string().optional(),
        status: z.enum(["in-progress", "submitted", "completed"]),
      })
      .or(
        z
          .array(
            z.object({
              name: z.string(),
              image: z.string().url().optional(),
              started: z.string(),
              completed: z.string().optional(),
              status: z.enum(["in-progress", "submitted", "completed"]),
            }),
          )
          .nonempty(),
      ),
  }),
});

const categoryCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    type: z.enum(["anime", "manga"]),
    challenges: z.array(reference("challenge")).nonempty(),
  }),
});

export const collections = {
  challenge: challengeCollection,
  category: categoryCollection,
};
