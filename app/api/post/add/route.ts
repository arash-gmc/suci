import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";

type Body = z.infer<typeof schema>;

const schema = z.object({
  authorId: z.string().min(1).max(255),
  text: z.string().min(1).max(300),
});

// Add a new post
export async function POST(request: NextRequest) {
  const body: Body = await request.json();
  const validation = schema.safeParse(body);

  if (!validation.success)
    return NextResponse.json(
      { error: "text or userId not provided" },
      { status: 400 }
    );
  const { text, authorId } = body;
  const user = await prisma.user.findUnique({ where: { id: authorId } });
  if (!user)
    return NextResponse.json(
      { error: "user does not exists" },
      { status: 404 }
    );

  const newPost = await prisma.posts.create({
    data: { text: body.text, authorId },
    include: { author: true },
  });
  return NextResponse.json(newPost);
}
