import { z } from "zod";

export const newPostSchema = z.object({
  text: z.string(),
});
