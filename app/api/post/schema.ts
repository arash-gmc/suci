import { z } from "zod";

export type AddPostBody = z.infer<typeof newPostSchema>;

export const newPostSchema = z.object({
  authorId: z.string().min(1).max(255),
  text: z.string().min(1).max(300),
});
