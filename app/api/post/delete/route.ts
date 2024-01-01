import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const postId = request.headers.get("postId");
  if (!postId) return NextResponse.json({}, { status: 400 });
  const post = await prisma.posts.findUnique({ where: { id: postId } });
  if (!post) return NextResponse.json({}, { status: 400 });

  await prisma.comment.deleteMany({ where: { postRefId: postId } });
  await prisma.postsActions.deleteMany({ where: { postId } });
  await prisma.posts.deleteMany({ where: { refId: postId } });
  await prisma.posts.delete({ where: { id: postId } });
  return NextResponse.json({});
}
