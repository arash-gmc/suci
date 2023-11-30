import { NextRequest, NextResponse } from "next/server";
import { AddPostBody, newPostSchema } from "./schema";
import prisma from "@/prisma/client";

// Add a new post
export async function POST(request: NextRequest) {
  const body: AddPostBody = await request.json();
  const validation = newPostSchema.safeParse(body);

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

//get all post with authors
export async function GET(request: NextRequest) {
  const posts = await prisma.posts.findMany({ include: { author: true } });
  return NextResponse.json([...posts]);
}
