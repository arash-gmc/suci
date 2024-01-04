import { z } from "zod";

const usernameRegx = RegExp("^[a-zA-Z][a-zA-Z0-9_-]*$");

export const newUserSchema = z.object({
  name: z.string().min(5).max(255),
  email: z.string().email(),
  username: z
    .string()
    .min(3)
    .max(255)
    .regex(
      usernameRegx,
      "username characters must be english letter or numbers or _ and starts with a letter "
    ),
  password: z.string().min(6, "password must be atleat 6 characters").max(255),
  city: z.string().optional(),
  brithYear: z.string().optional(),
  gender: z.enum(["male", "female"]).optional(),
  imagePublicId: z.string().optional(),
});
