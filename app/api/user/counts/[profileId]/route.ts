import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { profileId: string };
}

export async function GET(
  request: NextRequest,
  { params: { profileId } }: Props
) {
  const user = await prisma.user.findUnique({ where: { id: profileId } });
  if (!user) return NextResponse.json({}, { status: 404 });
  const follower = await prisma.follow.count({
    where: { followerId: profileId },
  });
  const following = await prisma.follow.count({
    where: { followingId: profileId },
  });
  const post = await prisma.posts.count({
    where: { authorId: profileId, postRef: null },
  });
  return NextResponse.json({ follower, following, post });
}
