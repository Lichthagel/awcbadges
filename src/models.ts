import { reference, z } from "astro:content";

const zBadge = z.object({
  image: z.string().url().optional(),
  started: z.coerce.date(),
  completed: z.coerce.date().optional(),
  status: z.enum(["in-progress", "submitted", "completed"]),
});

export const zChallenge = z.object({
  name: z.string(),
  url: z
    .string()
    .url()
    .regex(/https:\/\/anilist\.co\/forum\/thread\/([0-9]+)\/comment\/([0-9]+)/)
    .transform((url) => {
      const match = url.match(
        /https:\/\/anilist\.co\/forum\/thread\/([0-9]+)\/comment\/([0-9]+)/,
      );

      if (!match) {
        throw new Error("Invalid URL");
      }

      return {
        thread: parseInt(match[1]),
        comment: parseInt(match[2]),
        full: url,
      };
    }),
  badge: zBadge.or(z.array(zBadge.extend({ name: z.string() })).nonempty()),
});

export type Challenge = z.infer<typeof zChallenge>;

const zChallengeEntry = z.object({
  id: z.string(),
  collection: z.literal("challenge"),
  data: zChallenge,
});

export type ChallengeEntry = z.infer<typeof zChallengeEntry>;

export const zCategory = z.object({
  name: z.string(),
  type: z.enum(["anime", "manga"]),
  challenges: z.array(reference("challenge")).nonempty(),
});

export type Category = z.infer<typeof zCategory>;

const zCategoryEntry = z.object({
  id: z.string(),
  collection: z.literal("category"),
  data: zCategory,
});

export type CategoryEntry = z.infer<typeof zCategoryEntry>;
