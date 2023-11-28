import { NextRequest, NextResponse } from "next/server";
import { CreateListBody, createListSchema } from "./schema";
import prisma from "@/prisma/client";

export async function POST(request: NextRequest) {
  const body: CreateListBody = await request.json();
  console.log(body);
  const validation = createListSchema.safeParse(body);
  if (!validation.success) return NextResponse.json({}, { status: 400 });
  const { ownerId, name, members } = body;
  const res = await prisma.list.create({
    data: {
      name,
      ownerId,
      members: JSON.stringify(members),
    },
  });
  return NextResponse.json(res, { status: 201 });
}

export async function GET(request: NextRequest) {
  const userId = request.headers.get("userId");
  if (!userId)
    return NextResponse.json({ error: "userId not provided" }, { status: 400 });
  const records = await prisma.list.findMany({ where: { ownerId: userId } });
  const response = records.map((record) => ({
    id: record.id,
    name: record.name,
    members: JSON.parse(record.members),
  }));
  return NextResponse.json(response);
}
