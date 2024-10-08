/* eslint-disable @typescript-eslint/no-unused-vars */
import { reference, z } from "astro:content";

const zThreadCommentUrl = z
  .string()
  .url()
  .regex(/https:\/\/anilist\.co\/forum\/thread\/(\d+)\/comment\/(\d+)/)
  .transform((url) => {
    const match = url.match(
      /https:\/\/anilist\.co\/forum\/thread\/(\d+)\/comment\/(\d+)/,
    );

    if (!match) {
      throw new Error("Invalid URL");
    }

    return {
      comment: Number.parseInt(match[2]),
      full: url,
      thread: Number.parseInt(match[1]),
    };
  });

const zImage = z.object({
  url: z.string().url(),
  height: z.number().optional(),
  width: z.number().optional(),
});

export type Image = z.infer<typeof zImage>;

const zBadgeBase = z.object({
  image: z.union([z.string().url(), zImage])
    .optional(),
});

const zBadgeMultiBase = zBadgeBase.extend({
  name: z.string(),
  url: zThreadCommentUrl.optional().optional(),
});

const zBadgePreparedImpl = z.object({
  status: z.enum(["not-started", "hidden"]),
});

const zBadgePrepared = zBadgeBase.merge(zBadgePreparedImpl);

export type BadgePrepared = z.infer<typeof zBadgePrepared>;

const zBadgeMultiPrepared = zBadgeMultiBase.merge(zBadgePreparedImpl);

const zBadgeOngoingImpl = z.object({
  started: z.coerce.date(),
  status: z.enum(["in-progress", "incomplete", "on-hold"]),
});

const zBadgeOngoing = zBadgeBase.merge(zBadgeOngoingImpl);

export type BadgeOngoing = z.infer<typeof zBadgeOngoing>;

const zBadgeMultiOngoing = zBadgeMultiBase.merge(zBadgeOngoingImpl);

const zBadgeFinishedImpl = z.object({
  completed: z.coerce.date(),
  started: z.coerce.date(),
  status: z.enum(["submitted", "completed"]),
});

const zBadgeFinished = zBadgeBase.merge(zBadgeFinishedImpl);

export type BadgeFinished = z.infer<typeof zBadgeFinished>;

const zBadgeMultiFinished = zBadgeMultiBase.merge(zBadgeFinishedImpl);

const zBadge = z.discriminatedUnion("status", [zBadgePrepared, zBadgeOngoing, zBadgeFinished]);

const zBadgeMulti = z.discriminatedUnion("status", [zBadgeMultiPrepared, zBadgeMultiOngoing, zBadgeMultiFinished]);

export type Badge = z.infer<typeof zBadge>;

export type BadgeMulti = z.infer<typeof zBadgeMulti>;

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
    .array(zBadgeMulti)
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
  challenges: z.array(reference("challenge")).nonempty(),
  sortKey: z.number().default(0),
  type: z.enum(["anime", "manga"]),
});

export type Category = z.infer<typeof zCategory>;

const zCategoryEntry = z.object({
  id: z.string(),
  collection: z.literal("category"),
  data: zCategory,
});

export type CategoryEntry = z.infer<typeof zCategoryEntry>;
