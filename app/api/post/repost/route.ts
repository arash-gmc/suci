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
  const post = await prisma.posts.findUnique({
    where: { id: postId },
    include: { author: true },
  });
  if (!post)
    return NextResponse.json({ error: "post not found" }, { status: 404 });
  const newRecord = await prisma.posts.create({
    data: { authorId: userId, refId: postId },
  });
  await prisma.notification.create({
    data: {
      fromUserId: userId,
      toUserId: post.author.id,
      type: "repost",
      associated: postId,
    },
  });
  return NextResponse.json(newRecord);
}

export async function DELETE(request: NextRequest) {
  const userId = request.headers.get("userId");
  const postId = request.headers.get("postId");
  if (!userId || !postId)
    return NextResponse.json({ error: "not enough inputs" }, { status: 400 });
  const res = await prisma.posts.deleteMany({
    where: { authorId: userId, refId: postId },
  });
  if (res.count > 0) return NextResponse.json({});
  else return NextResponse.json({}, { status: 404 });
}
