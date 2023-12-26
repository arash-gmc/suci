import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";

const schema = z.object({
  userId: z.string(),
  oldPassword: z.string(),
  newPassword: z.string(),
});

type Body = z.infer<typeof schema>;

export async function POST(request: NextRequest) {
  const body: Body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const { userId, oldPassword, newPassword } = body;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  const oldPasswordCheck = await bcrypt.compare(
    oldPassword,
    user.hashedPassword
  );
  if (!oldPasswordCheck)
    return NextResponse.json(
      { error: "old password is not correct" },
      { status: 400 }
    );
  const newHashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { hashedPassword: newHashedPassword },
  });
  return NextResponse.json({});
}
