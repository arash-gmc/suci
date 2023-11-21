import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const where = await request.json();
  console.log(where);
  const posts = await prisma.posts.findMany({
    include: { author: true },
    where,
  });

  return NextResponse.json([...posts]);
}
