import { reference, z } from "astro:content";

const zBadge = z.object({
  image: z.string().url().optional(),
  started: z.coerce.date(),
  completed: z.coerce.date().optional(),
  status: z.enum(["in-progress", "submitted", "completed"]),
});

export type Badge = z.infer<typeof zBadge>;

const zChallengeBase = z.object({
  name: z.string(),
  url: z
    .string()
    .url()
    .regex(/https:\/\/anilist\.co\/forum\/thread\/([0-9]+)\/comment\/([0-9]+)/)
    .transform((url) => {
      const match = url.match(
        /https:\/\/anilist\.co\/forum\/thread\/([0-9]+)\/comment\/([0-9]+)/
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
});

const zChallengeSingle = zChallengeBase.extend({
  badge: zBadge.transform((badge) => ({
    ...badge,
    focus: true,
  })),
  all: z.undefined(),
});

const zChallengeMulti = zChallengeBase.extend({
  badge: z
    .array(zBadge.extend({ name: z.string() }))
    .nonempty()
    .transform((badges) => {
      let idx = 0;

      badges.forEach((badge, index) => {
        if (badge.status === "completed") {
          idx = index;
        }
      });

      return badges.map((badge, index) => ({
        ...badge,
        focus: index === idx,
      }));
    }),
  all: z.boolean().default(true),
});

export const zChallenge = z.union([zChallengeSingle, zChallengeMulti]);

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
