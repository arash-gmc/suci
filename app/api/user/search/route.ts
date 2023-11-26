import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searched = request.headers.get("searchText");
  if (!searched) return NextResponse.json(null);
  const findedUsers = await prisma.user.findMany({
    where: { name: { contains: searched } },
  });
  const response = findedUsers.map((user) => ({
    id: user.id,
    name: user.name,
    imagePublicId: user.imagePublicId,
    gender: user.gender,
    username: user.username,
  }));
  return NextResponse.json(response);
}
