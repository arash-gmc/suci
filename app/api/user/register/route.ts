import { NextRequest, NextResponse } from "next/server";
import { newUserSchema } from "./schema";
import prisma from "@/prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";

type Body = z.infer<typeof newUserSchema>;

export async function POST(request: NextRequest) {
  const body: Body = await request.json();
  const validation = newUserSchema.safeParse(body);

  if (!validation.success) {
    console.log(validation.error.errors);
    return NextResponse.json(validation.error.errors, { status: 400 });
  }
  const repetiveEmail = await prisma.user.findUnique({
    where: { email: body.email },
  });

  const repetiveUsername = await prisma.user.findUnique({
    where: { username: body.username },
  });
  if (repetiveEmail || repetiveUsername)
    return NextResponse.json(
      { error: "email or username is already exists." },
      { status: 400 }
    );

  const hashedPassword = await bcrypt.hash(body.password, 10);
  const { name, email, city, gender, imagePublicId, username } = body;
  const brithYear = body.brithYear ? parseInt(body.brithYear) : undefined;
  const res = await prisma.user.create({
    data: {
      name,
      email,
      username,
      hashedPassword,
      brithYear,
      gender,
      city,
      imagePublicId,
    },
  });
  const { hashedPassword: ps, ...newUser } = res;
  return NextResponse.json(newUser, { status: 201 });
}
