import prisma from "@/prisma/client";

interface Props {
  fromUserId: string;
  toUserId: string;
  type: "comment" | "like" | "follow" | "repost";
  associated: string;
}

export default async function ({
  fromUserId,
  toUserId,
  type,
  associated,
}: Props) {
  if (fromUserId === toUserId) return;
  await prisma.notification.create({
    data: {
      fromUserId,
      toUserId,
      type,
      associated,
    },
  });
}
