import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { where } = await request.json();
  const count = await prisma.posts.count({
    where,
  });

  return NextResponse.json(count);
}
