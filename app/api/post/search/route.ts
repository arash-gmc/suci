import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searched = request.headers.get("searchText");
  if (!searched) return NextResponse.json([]);
  const findedPosts = await prisma.posts.findMany({
    where: { text: { contains: searched } },
  });

  return NextResponse.json(findedPosts);
}
