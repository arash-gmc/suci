import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
  const commentId = request.headers.get("commentId");
  if (!commentId) return NextResponse.json({}, { status: 400 });

  await prisma.comment.delete({ where: { id: commentId } });

  return NextResponse.json({});
}
