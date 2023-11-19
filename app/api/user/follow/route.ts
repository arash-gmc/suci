import { NextRequest, NextResponse } from "next/server";
import { followSchema, BodyType } from "./schema";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body: BodyType = await request.json();
  const validation = followSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const { followerId, followingId } = body;
  const following = await prisma.user.findUnique({
    where: { id: followingId },
  });
  const follower = await prisma.user.findUnique({
    where: { id: followerId },
  });
  if (!follower || !following)
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  const similarRecord = await prisma.follow.findFirst({
    where: { followerId, followingId },
  });
  if (similarRecord)
    return NextResponse.json(
      { error: "follow record is already exists." },
      { status: 400 }
    );
  const followRecord = await prisma.follow.create({
    data: { followerId: follower.id, followingId: following.id },
  });
  NextResponse.json({ followRecord }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const body: BodyType = await request.json();
  const validation = followSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const { followerId, followingId } = body;
  await prisma.follow.deleteMany({ where: { followerId, followingId } });
}
