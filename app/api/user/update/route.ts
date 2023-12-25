import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  id: z.string(),
  name: z.string().min(5).max(255),
  email: z.string().email(),
  username: z.string(),
  city: z.string(),
  brithYear: z.string(),
  gender: z.enum(["male", "female", "none"]),
});

type Body = z.infer<typeof schema>;

export async function PATCH(request: NextRequest) {
  const body: Body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const {
    id,
    name,
    username,
    gender: rawGender,
    city: rawCity,
    brithYear: year,
    email,
  } = body;
  const brithYear = year === "0" ? null : parseInt(year);
  const gender = rawGender === "none" ? null : rawGender;
  const city = rawCity === "" ? null : rawCity;
  const res = await prisma.user.update({
    where: { id },
    data: {
      name,
      username,
      gender,
      city,
      brithYear,
      email,
    },
  });
  return NextResponse.json(res);
}
