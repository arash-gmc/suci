import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const postId = request.headers.get("postId");

  if (!postId)
    return NextResponse.json({ error: "not enough inputs" }, { status: 400 });

    const repostRecords = await prisma.posts.findMany({
        where: { refId: postId },
        include: { author: true },
      });
      const reposters = repostRecords.map((record) => record.author);

  return NextResponse.json(reposters);
}
