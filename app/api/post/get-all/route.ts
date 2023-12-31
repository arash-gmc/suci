import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { where, page, pageSize } = await request.json();
  const posts = await prisma.posts.findMany({
    include: { author: true, postRef: { include: { author: true } } },
    where,
    take: parseInt(pageSize) ? parseInt(pageSize) : undefined,
    skip: parseInt(pageSize) && parseInt(page) ? pageSize * page : undefined,
    orderBy: { date: "desc" },
  });

  return NextResponse.json([...posts]);
}
