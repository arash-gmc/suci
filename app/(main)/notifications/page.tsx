import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import React from "react";
import { nextauthConfig } from "@/app/api/auth/[...nextauth]/route";
import { Container, Flex } from "@radix-ui/themes";
import ProfilePicture from "@/app/_components/ProfilePicture";
import NotificationText from "./NotificationText";

const page = async () => {
  const session = await getServerSession(nextauthConfig);
  if (!session) return;
  const notifications = await prisma.notification.findMany({
    where: { toUserId: session?.user.id },
    orderBy: { date: "desc" },
    include: { fromUser: true },
  });
  return (
    <Container>
      <Flex
        direction="column"
        px="2"
      >
        {notifications.map((item) => (
          <Flex
            align="center"
            gap="3"
            py="3"
            px="2"
            className="border-b-2"
            key={item.id}
          >
            <ProfilePicture
              size="sm"
              user={item.fromUser}
            />
            <NotificationText notif={item} />
          </Flex>
        ))}
        {notifications.length === 0 ? (
          <Flex justify="center">There is no notification.</Flex>
        ) : null}
      </Flex>
    </Container>
  );
};

export default page;
