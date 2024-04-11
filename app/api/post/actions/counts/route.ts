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
  let like = 0;
  let dislike = 0;
  let bookmark = 0;
  records.forEach((record) => {
    if (record.actionType === "like") like++;
    if (record.actionType === "dislike") dislike++;
    if (record.actionType === "bookmark") bookmark++;
  });

  const repost = await prisma.posts.count({ where: { refId: postId } });
  const comment = await prisma.comment.count({ where: { postRefId: postId } });

  return NextResponse.json({ like, dislike, bookmark, repost, comment });
}
