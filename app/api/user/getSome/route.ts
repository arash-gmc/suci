import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  userIds: z.array(z.string()),
});

type Body = z.infer<typeof schema>;

export async function POST(request: NextRequest) {
  const body: Body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const rawUsers = await prisma.user.findMany({
    where: { id: { in: body.userIds } },
  });
  const users = rawUsers.map((user) => ({ ...user, hashedPassword: "" }));

  return NextResponse.json(users);
}
