import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  fromId: z.string(),
  toId: z.string(),
  text: z.string(),
});

type Body = z.infer<typeof schema>;

export async function POST(request: NextRequest) {
  const body: Body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const { toId, fromId, text } = body;
  const res = await prisma.message.create({
    data: { fromUserId: fromId, toUserId: toId, text },
  });
  return NextResponse.json(res);
}
