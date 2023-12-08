import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  userId: z.string(),
  postId: z.string(),
});

type Body = z.infer<typeof schema>;

export async function POST(request: NextRequest) {
  const body: Body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const { userId, postId } = body;
  const newRecord = await prisma.posts.create({
    data: { authorId: userId, refId: postId },
  });
  return NextResponse.json(newRecord);
}
