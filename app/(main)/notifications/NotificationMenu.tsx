"use client";
import { Popover, Flex, Text, Badge } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";
import axios from "axios";
import { Notif } from "../interfaces";
import NotificationText from "./NotificationText";
import { useRouter } from "next/navigation";
import ProfilePicture from "@/app/_components/ProfilePicture";

interface Props {
  userId: string;
}
const NotificationsMenu = ({ userId }: Props) => {
  const [items, setItems] = useState<Notif[]>([]);
  const [count, setCount] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (userId)
      axios
        .get<Notif[]>("/api/notification/new", { headers: { userId } })
        .then((res) => {
          setItems(res.data);
          setCount(res.data.length);
        });
  }, [userId]);
  const seeNotifs = async () => {
    await axios.get("/api/notification/see", { headers: { userId } });
    setCount(0);
  };
  return (
    <div className="relative">
      {!!count && (
        <div className="absolute -right-3 -top-3">
          <Badge
            size="1"
            color="red"
          >
            {count}
          </Badge>
        </div>
      )}
      <Popover.Root>
        <Popover.Trigger>
          <button>
            <Text
              size="6"
              onClick={() => seeNotifs()}
            >
              <IoNotifications />
            </Text>
          </button>
        </Popover.Trigger>
        <Popover.Content style={{ width: 360 }}>
          <Flex direction="column">
            {items.map((item) => (
              <Flex
                align="center"
                gap="2"
                py="2"
                className="border-b-2"
                key={item.id}
              >
                <ProfilePicture
                  size="sm"
                  user={item.fromUser}
                />
                <Popover.Close>
                  <NotificationText notif={item} />
                </Popover.Close>
              </Flex>
            ))}
            {items.length === 0 ? (
              <Flex
                justify="center"
                pb="3"
                className="border-b-2"
              >
                There are no new notifications.
              </Flex>
            ) : null}
            <Popover.Close>
              <button
                onClick={() => router.push("/notifications")}
                className="font-bold justify-center pt-2"
              >
                Go to Notifications Archive
              </button>
            </Popover.Close>
          </Flex>
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};

export default NotificationsMenu;
