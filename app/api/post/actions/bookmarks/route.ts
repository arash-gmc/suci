import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("userId");

  if (!userId)
    return NextResponse.json({ error: "not enough inputs" }, { status: 400 });

  const records = await prisma.postsActions.findMany({
    where: { userId, actionType: "bookmark" },
    include: { post: true },
  });

  const posts = records.map((record) => record.post);

  return NextResponse.json(posts);
}
