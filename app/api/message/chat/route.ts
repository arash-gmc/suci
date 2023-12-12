import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const userId = request.headers.get("userId");
  const contactId = request.headers.get("contactId");

  if (!userId || !contactId)
    return NextResponse.json(
      { error: "userId or contactId not provided" },
      { status: 400 }
    );

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    return NextResponse.json({ error: "user not found" }, { status: 404 });
  const contact = await prisma.user.findUnique({ where: { id: userId } });
  if (!contact)
    return NextResponse.json({ error: "contact not found" }, { status: 404 });

  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { fromUserId: userId, toUserId: contactId },
        { fromUserId: contactId, toUserId: userId },
      ],
    },
    orderBy: { date: "desc" },
  });
  return NextResponse.json(messages);
}
