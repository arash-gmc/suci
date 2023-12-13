import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  userId: z.string(),
  contactId: z.string(),
});

type Body = z.infer<typeof schema>;

export async function PATCH(request: NextRequest) {
  const body: Body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const { userId, contactId } = body;
  const res = await prisma.message.updateMany({
    where: { fromUserId: contactId, toUserId: userId },
    data: { seen: true },
  });
  return NextResponse.json(res);
}
