import prisma from "@/prisma/client";
import { ActionType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const postId = request.headers.get("postId");

  if (!postId)
    return NextResponse.json({ error: "not enough inputs" }, { status: 400 });

  const records = await prisma.postsActions.findMany({
    where: { postId },
    select: { actionType: true },
  });
  let likes = 0;
  let dislikes = 0;
  let bookmarks = 0;
  records.forEach((record) => {
    if (record.actionType === "like") likes++;
    if (record.actionType === "dislike") dislikes++;
    if (record.actionType === "bookmark") bookmarks++;
  });

  return NextResponse.json({ likes, dislikes, bookmarks });
}
