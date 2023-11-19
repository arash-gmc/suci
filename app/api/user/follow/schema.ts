import { z } from "zod";

export const followSchema = z.object({
  followingId: z.string().min(1),
  followerId: z.string().min(1),
});

export type BodyType = z.infer<typeof followSchema>;
