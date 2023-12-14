import prisma from "@/prisma/client";
import { Message, User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { ChatContactsInfo } from "../users/route";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("userId");
  if (!userId)
    return NextResponse.json({ error: "userId not provided" }, { status: 400 });
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    return NextResponse.json({ error: "user not found" }, { status: 404 });

  const records = await prisma.message.findMany({
    where: { toUserId: user.id, seen: false },
    orderBy: { date: "desc" },
    include: { fromUser: true },
  });
  const chatInfo: Record<string, ChatContactsInfo> = {};

  records.forEach((record) => {
    if (!chatInfo[record.fromUserId]) {
      record.fromUser.hashedPassword = "";
      chatInfo[record.fromUserId] = {
        user: record.fromUser,
        unseens: 0,
        lastMessage: record.text,
      };
    }

    chatInfo[record.fromUserId].unseens++;
  });

  return NextResponse.json(Object.values(chatInfo));
}
