import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("userId");
  if (!userId)
    return NextResponse.json({ error: "userId not provided" }, { status: 400 });
  const followingsRecords = await prisma.follow.findMany({
    where: { followingId: userId },
  });
  const followings = followingsRecords.map((record) => record.followerId);
  return NextResponse.json([...followings]);
}
