import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("userId");
  const relation = request.headers.get("relation");

  if (!userId || !relation)
    return NextResponse.json(
      { error: "userId or relation not provided" },
      { status: 400 }
    );
  const records = await prisma.follow.findMany({
    where: { [relation + "Id"]: userId },
  });
  let listOfUsers: string[] = [];
  if (relation === "following")
    listOfUsers = records.map((record) => record.followerId);
  if (relation === "follower")
    listOfUsers = records.map((record) => record.followingId);

  return NextResponse.json([...listOfUsers]);
}
