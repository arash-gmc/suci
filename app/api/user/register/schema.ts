import { z } from "zod";

const usernameRegx = RegExp("^[a-zA-Z][a-zA-Z0-9_-]*$");

export const newUserSchema = z.object({
  name: z.string().min(3).max(64),
  email: z.string().email(),
  username: z
    .string()
    .min(3)
    .max(64)
    .regex(usernameRegx, "allowed characters: letters, numbers, _"),
  password: z.string().min(6, "password must be atleat 6 characters").max(255),
  city: z.string().max(255).optional(),
  brithYear: z.string().optional(),
  gender: z.enum(["male", "female"]).optional(),
  imagePublicId: z.string().optional(),
});
