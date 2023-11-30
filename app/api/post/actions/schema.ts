import { z } from "zod";

export type PostActionBody = z.infer<typeof postActionSchema>;

export const postActionSchema = z.object({
  userId: z.string(),
  postId: z.string(),
  actionType: z.enum(["like", "dislike", "bookmark"]),
});
