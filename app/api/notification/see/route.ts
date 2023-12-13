import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("userId");
  if (!userId)
    return NextResponse.json({ error: "userId not provided" }, { status: 400 });

  await prisma.notification.updateMany({
    where: { toUserId: userId, seen: false },
    data: { seen: true },
  });
  return NextResponse.json({});
}
