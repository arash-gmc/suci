import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { searched: string };
}

export async function GET(request: NextRequest, { params }: Props) {
  const { searched } = params;
  if (!searched) return NextResponse.json([]);
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
