import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import React from "react";
import { nextauthConfig } from "@/app/api/auth/[...nextauth]/route";
import { Container, Flex, Text } from "@radix-ui/themes";
import ProfilePicture from "@/app/_components/ProfilePicture";
import NotificationText from "./NotificationText";
// @ts-ignore
import TimeDiff from "js-time-diff";

const page = async () => {
  const session = await getServerSession(nextauthConfig);
  if (!session) return;
  const notifications = await prisma.notification.findMany({
    where: { toUserId: session?.user.id },
    orderBy: { date: "desc" },
    include: { fromUser: true },
    take: 100,
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
            py="3"
            px="2"
            className="border-b-2"
            key={item.id}
            justify="between"
          >
            <Flex
              align="center"
              gap="3"
            >
              <ProfilePicture
                size="sm"
                user={item.fromUser}
              />
              <NotificationText notif={item} />
            </Flex>
            <Text
              size="1"
              color="gray"
            >
              {TimeDiff(item.date)}
            </Text>
          </Flex>
        ))}
        {notifications.length === 0 ? (
          <Flex
            justify="center"
            my="6"
          >
            There is no notification yet.
          </Flex>
        ) : null}
      </Flex>
    </Container>
  );
};

export default page;
