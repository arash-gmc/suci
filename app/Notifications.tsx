"use client";
import { Popover, Flex, Box, TextArea, Button, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import ProfilePicture from "./_components/ProfilePicture";
import { Notification } from "@prisma/client";
import axios from "axios";
import { Notif } from "./interfaces";
import NotificationText from "./_components/NotificationText";

interface Props {
  userId: string;
}
const NotificationsList = ({ userId }: Props) => {
  const [items, setItems] = useState<Notif[]>([]);
  useEffect(() => {
    if (userId)
      axios
        .get<Notif[]>("/api/notification", { headers: { userId } })
        .then((res) => setItems(res.data));
  }, [userId]);
  return (
    <Popover.Root>
      <Popover.Trigger>
        <button>
          <Text size="5">
            <IoNotifications />
          </Text>
        </button>
      </Popover.Trigger>
      <Popover.Content style={{ width: 400 }}>
        <Flex direction="column">
          {items.map((item) => (
            <Flex
              align="center"
              gap="2"
              py="2"
              className="border-b-2"
            >
              <ProfilePicture
                size="sm"
                user={item.fromUser}
              />
              <NotificationText notif={item} />
            </Flex>
          ))}
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default NotificationsList;
