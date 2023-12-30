import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("userId");
  const relation = request.headers.get("relation");

  if (!userId || !relation || !["following", "follower"].includes(relation))
    return NextResponse.json(
      { error: "userId or relation not provided" },
      { status: 400 }
    );
  if (relation === "following") {
    const records = await prisma.follow.findMany({
      where: { followingId: userId },
      include: { follower: true },
    });
    const users = records.map((record) => ({
      ...record.follower,
      hashedPassword: "",
    }));
    return NextResponse.json(users);
  }
  if (relation === "follower") {
    const records = await prisma.follow.findMany({
      where: { followerId: userId },
      include: { following: true },
    });
    const users = records.map((record) => ({
      ...record.following,
      hashedPassword: "",
    }));
    return NextResponse.json(users);
  } else {
    return NextResponse.json(null);
  }
}
