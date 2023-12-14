import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("userId");
  if (!userId)
    return NextResponse.json({ error: "userId not provided" }, { status: 400 });
  const rawUser = await prisma.user.findUnique({ where: { id: userId } });
  if (!rawUser) return NextResponse.json(null);
  const { hashedPassword, ...user } = rawUser;
  return NextResponse.json(user);
}
