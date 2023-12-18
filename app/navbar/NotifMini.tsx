"use client";
import { Popover, Flex, Text, Badge, Box } from "@radix-ui/themes";
import React from "react";
import ProfilePicture from "../_components/ProfilePicture";
import { ChatContactsInfo } from "../api/message/users/route";
import { useRouter } from "next/navigation";
import { Notif } from "../interfaces";
import NotificationText from "../notifications/NotificationText";

interface Props {
  notifications: Notif[];
  close: () => void;
}
const NotifMini = ({ notifications }: Props) => {
  const router = useRouter();
  return (
    <Flex
      direction="column"
      gap="2"
    >
      {notifications.map((item) => (
        <Flex
          align="center"
          key={item.id}
          gap="1"
          className="border-b-2 py-1"
        >
          <ProfilePicture
            user={item.fromUser}
            size="sm"
          />
          <Box onClick={() => close()}>
            <NotificationText notif={item} />
          </Box>
        </Flex>
      ))}
      {notifications.length === 0 ? (
        <Flex
          justify="center"
          pb="3"
          className="border-b-2"
        >
          There is no new notification.
        </Flex>
      ) : null}

      <button
        className="font-bold py-1 justify-center"
        onClick={() => {
          router.push("/notifications");
          close();
        }}
      >
        Go to Notifications Archive
      </button>
    </Flex>
  );
};

export default NotifMini;
