import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("userId");
  if (!userId)
    return NextResponse.json({ error: "userId not provided" }, { status: 400 });
  const count = await prisma.notification.count({
    where: { toUserId: userId, seen: false },
  });
  return NextResponse.json(count);
}
