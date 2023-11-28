import { z } from "zod";

export type CreateListBody = z.infer<typeof createListSchema>;

export const createListSchema = z.object({
  name: z.string(),
  ownerId: z.string(),
  members: z.array(z.string()),
});
