import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import pushNotif from "../../notification/pushNotif";

const schema = z.object({
  authorId: z.string(),
  postId: z.string(),
  text: z.string(),
});

type Body = z.infer<typeof schema>;

export async function POST(request: NextRequest) {
  const body: Body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const { authorId, postId, text } = body;

  const user = await prisma.user.findUnique({ where: { id: authorId } });
  if (!user)
    return NextResponse.json(
      { error: "no user with this id" },
      { status: 400 }
    );
  const post = await prisma.posts.findUnique({
    where: { id: postId },
    include: { author: true },
  });
  if (!post)
    return NextResponse.json(
      { error: "no post with this id" },
      { status: 400 }
    );

  const res = await prisma.comment.create({
    data: { authorId, postRefId: postId, text },
    include: { author: true },
  });
  pushNotif({
    fromUserId: authorId,
    toUserId: post.author.id,
    type: "comment",
    associated: postId,
  });
  return NextResponse.json(res);
}
