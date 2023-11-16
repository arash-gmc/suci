import { NextRequest, NextResponse } from "next/server";
import { newPostSchema } from "./schema";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { nextauthConfig } from "../auth/[...nextauth]/route";

export async function POST(request: NextRequest) {
  const session = await getServerSession(nextauthConfig);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  const validation = newPostSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json({ error: "text not provided" }, { status: 400 });
  const user = await prisma.user.findUnique({
    where: { email: session.user?.email || undefined },
  });
  if (!user) return;
  const newPost = await prisma.posts.create({
    data: { text: body.text, authorId: user.id },
  });
  return NextResponse.json(newPost);
}

export async function GET(request: NextRequest) {
  const posts = await prisma.posts.findMany();
  return NextResponse.json([...posts]);
}

export async function DELETE(request: NextRequest) {
  await prisma.posts.deleteMany();
  return NextResponse.json({});
}
