import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("userId");
  if (!userId)
    return NextResponse.json({ error: "userId not provided" }, { status: 400 });
  const records = await prisma.notification.findMany({
    where: { toUserId: userId, seen: false },
    orderBy: { date: "desc" },
    include: { fromUser: true },
    take: 10,
  });

  return NextResponse.json(records);
}
