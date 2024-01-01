import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const userId = request.headers.get("userId");
  if (!userId) return NextResponse.json({}, { status: 400 });
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({}, { status: 400 });

  await prisma.comment.deleteMany({ where: { authorId: userId } });
  await prisma.comment.deleteMany({ where: { postRef: { authorId: userId } } });
  await prisma.postsActions.deleteMany({ where: { userId } });
  await prisma.postsActions.deleteMany({
    where: { post: { authorId: userId } },
  });
  await prisma.posts.deleteMany({ where: { postRef: { authorId: userId } } });
  await prisma.posts.deleteMany({ where: { authorId: userId } });
  await prisma.message.deleteMany({
    where: { OR: [{ fromUserId: userId }, { toUserId: userId }] },
  });
  await prisma.notification.deleteMany({
    where: { OR: [{ fromUserId: userId }, { toUserId: userId }] },
  });
  await prisma.follow.deleteMany({
    where: { OR: [{ followerId: userId }, { followingId: userId }] },
  });
  await prisma.list.deleteMany({ where: { ownerId: userId } });

  await prisma.user.delete({ where: { id: userId } });

  return NextResponse.json({});
}
