import prisma from "@/prisma/client";
import { ActionType } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { PostActionBody, postActionSchema } from "./schema";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("userId");
  const postId = request.headers.get("postId");

  if (!userId || !postId)
    return NextResponse.json({ error: "not enough inputs" }, { status: 400 });

  const actions: ActionType[] = ["like", "dislike", "bookmark"];

  const records = await prisma.postsActions.findMany({
    where: { postId, userId },
  });
  const doneActions = records.map((r) => r.actionType);
  let response = {};
  actions.forEach((action) =>
    doneActions.includes(action)
      ? (response = { ...response, [action]: true })
      : (response = { ...response, [action]: false })
  );

  const repostRecord = await prisma.posts.findMany({
    where: { authorId: userId, refId: postId },
  });
  response =
    repostRecord.length > 0
      ? { ...response, repost: true }
      : { ...response, repost: false };

  const commentRecord = await prisma.comment.findMany({
    where: { authorId: userId, postRefId: postId },
  });
  response =
    commentRecord.length > 0
      ? { ...response, comment: true }
      : { ...response, comment: false };

  return NextResponse.json(response);
}

export async function POST(request: NextRequest) {
  const body: PostActionBody = await request.json();
  const validation = postActionSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(
      { error: validation.error.errors },
      { status: 400 }
    );
  const { userId, postId, actionType } = body;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) NextResponse.json({ error: "user not found" }, { status: 404 });

  const post = await prisma.posts.findUnique({ where: { id: postId } });
  if (!post) NextResponse.json({ error: "post not found" }, { status: 404 });

  const repRecords = await prisma.postsActions.findMany({
    where: { userId, postId, actionType },
  });
  if (repRecords.length > 0) return NextResponse.json({});

  const res = await prisma.postsActions.create({
    data: { userId, postId, actionType },
  });
  return NextResponse.json(res);
}

export async function DELETE(request: NextRequest) {
  const userId = request.headers.get("userId");
  const postId = request.headers.get("postId");
  const actionType = request.headers.get("actionType");
  if (
    !userId ||
    !postId ||
    !actionType ||
    !(
      actionType === "like" ||
      actionType === "dislike" ||
      actionType === "bookmark"
    )
  )
    return NextResponse.json({ error: "invalid inputs" }, { status: 400 });

  const res = await prisma.postsActions.deleteMany({
    where: { postId, userId, actionType },
  });
  if (res.count > 0) return NextResponse.json({});
  return NextResponse.json({}, { status: 404 });
}
