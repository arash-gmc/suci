import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const where = await request.json();
  const posts = await prisma.posts.findMany({
    include: { author: true, postRef: { include: { author: true } } },
    where,
    orderBy: { date: "desc" },
  });

  return NextResponse.json([...posts]);
}
