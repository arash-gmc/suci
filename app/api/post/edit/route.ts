import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  postId: z.string(),
  newText: z.string().min(1),
});

export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const { postId, newText } = body;
  const res = await prisma.posts.update({
    where: { id: postId },
    data: { text: newText, isEdited: true },
  });
  return NextResponse.json(res);
}
