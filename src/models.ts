import { reference, z } from "astro:content";

const zBadge = z.object({
  image: z.string().url().optional(),
  started: z.coerce.date(),
  completed: z.coerce.date().optional(),
  status: z.enum(["in-progress", "submitted", "completed"]),
});

export type Badge = z.infer<typeof zBadge>;

const getBadge = (badge: Badge | Badge[]): Badge & { name?: string } => {
  if (Array.isArray(badge)) {
    const result = badge.filter((b) => b.status === "completed").at(-1);

    // rome-ignore lint/style/noNonNullAssertion: <explanation>
    return result ?? badge.at(-1)!;
  } else {
    return badge;
  }
};

export const zChallenge = z
  .object({
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
          thread: parseInt(match[1]),
          comment: parseInt(match[2]),
          full: url,
        };
      }),
    badge: zBadge.or(z.array(zBadge.extend({ name: z.string() })).nonempty()),
  })
  .transform((challenge) => ({
    ...challenge,
    focusBadge: getBadge(challenge.badge),
  }));

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
