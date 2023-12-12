import prisma from "@/prisma/client";
import { Message, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export interface ChatContactsInfo {
  user: User;
  unseens: number;
  lastMessage: string;
}

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
    include: { fromUser: true, toUser: true },
  });
  const chatInfo: Record<string, ChatContactsInfo> = {};

  records.forEach((record) => {
    if (record.fromUserId === user.id && !chatInfo[record.toUserId]) {
      record.toUser.hashedPassword = "";
      chatInfo[record.toUserId] = {
        user: record.toUser,
        unseens: 0,
        lastMessage: record.text,
      };
    }
    if (record.toUserId === user.id) {
      if (!chatInfo[record.fromUserId]) {
        record.fromUser.hashedPassword = "";
        chatInfo[record.fromUserId] = {
          user: record.fromUser,
          unseens: 0,
          lastMessage: record.text,
        };
      }
      if (!record.seen) {
        chatInfo[record.fromUserId].unseens++;
      }
    }
  });

  return NextResponse.json(Object.values(chatInfo));
}
