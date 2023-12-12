import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("userId");
  if (!userId)
    return NextResponse.json({ error: "userId not provided" }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    return NextResponse.json({ error: "user not found" }, { status: 404 });

  const records = await prisma.message.findMany({
    where: { OR: [{ fromUserId: user.id }, { toUserId: user.id }] },
    orderBy: { date: "desc" },
    select: { fromUserId: true, toUserId: true, fromUser: true, toUser: true },
  });
  const users: any[] = [];
  const usersId: string[] = [];
  records.forEach((record) => {
    if (record.fromUserId === user.id && !usersId.includes(record.toUserId)) {
      const { hashedPassword, ...user } = record.toUser;
      users.push(user);
      usersId.push(record.toUserId);
    }
    if (record.toUserId === user.id && !usersId.includes(record.fromUserId)) {
      const { hashedPassword, ...user } = record.fromUser;
      users.push(user);
      usersId.push(record.fromUserId);
    }
  });

  return NextResponse.json(users);
}
