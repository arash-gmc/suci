import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { postId: string };
}

export async function GET(request: NextRequest, { params }: Props) {
  if (!params.postId)
    return NextResponse.json({ error: "postId not provided" }, { status: 400 });
  const comments = await prisma.comment.findMany({
    where: { postRefId: params.postId },
    include: { author: true },
  });
  return NextResponse.json(comments);
}
