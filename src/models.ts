import { reference, z } from "astro:content";

const zBadge = z.object({
  image: z.string().url().optional(),
  started: z.coerce.date(),
  completed: z.coerce.date().optional(),
  status: z.enum([
    "in-progress",
    "submitted",
    "completed",
    "incomplete",
    "not-started",
    "on-hold",
  ]),
});

export type Badge = z.infer<typeof zBadge>;

const zThreadCommentUrl = z
  .string()
  .url()
  .regex(/https:\/\/anilist\.co\/forum\/thread\/(\d+)\/comment\/(\d+)/)
  .transform((url) => {
    const match = url.match(
      /https:\/\/anilist\.co\/forum\/thread\/(\d+)\/comment\/(\d+)/
    );

    if (!match) {
      throw new Error("Invalid URL");
    }

    return {
      thread: Number.parseInt(match[1]),
      comment: Number.parseInt(match[2]),
      full: url,
    };
  });

const zChallengeBase = z.object({
  name: z.string(),
  url: zThreadCommentUrl,
});

const zChallengeSingle = zChallengeBase.extend({
  badge: zBadge.transform((badge) => ({
    ...badge,
    focus: true,
  })),
  visibility: z.undefined(),
});

const zChallengeMulti = zChallengeBase.extend({
  badge: z
    .array(
      zBadge.extend({ name: z.string(), url: zThreadCommentUrl.optional() })
    )
    .nonempty()
    .transform((badges) => {
      let idx = 0;

      for (const [index, badge] of badges.entries()) {
        if (badge.status === "completed") {
          idx = index;
        }
      }

      return badges.map((badge, index) => ({
        ...badge,
        focus: index === idx,
      }));
    }),
  visibility: z.enum(["all", "only-focus", "with-focus"]).default("with-focus"),
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
  sortKey: z.number().default(0),
  challenges: z.array(reference("challenge")).nonempty(),
});

export type Category = z.infer<typeof zCategory>;

const zCategoryEntry = z.object({
  id: z.string(),
  collection: z.literal("category"),
  data: zCategory,
});

export type CategoryEntry = z.infer<typeof zCategoryEntry>;
