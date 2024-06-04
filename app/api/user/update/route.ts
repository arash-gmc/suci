import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const usernameRegx = RegExp("^[a-zA-Z][a-zA-Z0-9_-]*$");

const updateUserSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(32),
  email: z.string().email(),
  username: z
    .string()
    .min(3)
    .max(32)
    .regex(usernameRegx, "Allowed Characters: letter, number, _"),
  city: z.string().max(255),
  brithYear: z.string().max(255),
  gender: z.enum(["male", "female", "none"]),
  publicId: z.string().nullable(),
});

type Body = z.infer<typeof updateUserSchema>;

export async function PATCH(request: NextRequest) {
  const body: Body = await request.json();
  const validation = updateUserSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const {
    id,
    name,
    username,
    gender: rawGender,
    city: rawCity,
    brithYear: year,
    email,
    publicId,
  } = body;
  const repeatetiveUsers = await prisma.user.findMany({
    where: {
      OR: [
        { username, id: { not: id } },
        { email, id: { not: id } },
      ],
    },
  });
  if (repeatetiveUsers.length > 0)
    return NextResponse.json(
      "This email or username is already exists. try another one.",
      { status: 400 }
    );
  const brithYear = year === "0" ? null : parseInt(year);
  const gender = rawGender === "none" ? null : rawGender;
  const city = rawCity === "" ? null : rawCity;
  const res = await prisma.user.update({
    where: { id },
    data: {
      name,
      username,
      gender,
      city,
      brithYear,
      email,
      imagePublicId: publicId,
    },
  });
  return NextResponse.json({ ...res, hashedPassword: "" });
}
