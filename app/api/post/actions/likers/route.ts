import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const postId = request.headers.get("postId");

  if (!postId)
    return NextResponse.json({ error: "not enough inputs" }, { status: 400 });

  const records = await prisma.postsActions.findMany({
    where: { postId, actionType: "like" },
    include: { user: true },
  });

  const users = records.map((record) => {
    const { hashedPassword,...user } = record.user;
    return user;
  });

  return NextResponse.json(users);
}
