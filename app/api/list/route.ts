import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { z } from "zod";

type PostBody = z.infer<typeof createSchema>;
type UpdateBody = z.infer<typeof updateSchema>;

const createSchema = z.object({
  name: z.string(),
  ownerId: z.string(),
  members: z.array(z.string()),
});

const updateSchema = z.object({
  id: z.string(),
  name: z.string(),
  members: z.array(z.string()),
});

export async function POST(request: NextRequest) {
  const body: PostBody = await request.json();
  const validation = createSchema.safeParse(body);
  if (!validation.success) return NextResponse.json({}, { status: 400 });
  const { ownerId, name, members } = body;
  const newList = await prisma.list.create({
    data: {
      name,
      ownerId,
      members: JSON.stringify(members),
    },
  });
  return NextResponse.json({ id: newList.id, name, members }, { status: 201 });
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

export async function PATCH(request: NextRequest) {
  const body: UpdateBody = await request.json();
  const validation = updateSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const { name, members, id } = body;
  const newList = await prisma.list.update({
    where: { id },
    data: {
      name,
      members: JSON.stringify(members),
    },
  });
  return NextResponse.json({ id: newList.id, name, members });
}

export async function DELETE(request: NextRequest) {
  const listId = request.headers.get("listId");
  if (!listId)
    return NextResponse.json({ error: "userId not provided" }, { status: 400 });
  await prisma.list.delete({ where: { id: listId } });
  return NextResponse.json({});
}
