"use client";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Badge, Flex, Grid, Text } from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "./_providers/Context";
import MiniNavbarRight from "./MiniNavbarRight";
import { ChatContactsInfo } from "./api/message/users/route";
import axios from "axios";
import { Notif } from "./interfaces";

export type Selected =
  | "profile"
  | "filter"
  | "message"
  | "notification"
  | "search";

const MiniNavbar = () => {
  const [expand, setExpand] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Selected>("profile");
  const { viewer } = useContext(Context);
  const [contacts, setContacts] = useState<ChatContactsInfo[]>([]);
  const [notifications, setNotifications] = useState<Notif[]>([]);
  useEffect(() => {
    if (viewer?.id)
      axios
        .get<ChatContactsInfo[]>("/api/message/new", {
          headers: { userId: viewer.id },
        })
        .then((res) => {
          setContacts(res.data);
        });
  }, [viewer]);
  useEffect(() => {
    if (viewer)
      axios
        .get<Notif[]>("/api/notification/new", {
          headers: { userId: viewer.id },
        })
        .then((res) => {
          setNotifications(res.data);
        });
  }, [viewer]);
  const items: { label: string; value: Selected; count?: number }[] = [
    { label: "Profile", value: "profile" },
    { label: "Filters", value: "filter" },
    { label: "Message", value: "message", count: contacts.length },
    {
      label: "Notification",
      value: "notification",
      count: notifications.length,
    },
    { label: "Search", value: "search" },
  ];
  if (!viewer) return null;
  return (
    <Flex direction="column">
      <Flex
        justify="between"
        py="3"
        px="5"
      >
        <Text
          className="font-extrabold"
          size="6"
        >
          Suci
        </Text>
        <Text
          size="8"
          className="border-2 border-slate-400 rounded-lg p-2 cursor-pointer"
          onClick={() => setExpand((prev) => !prev)}
        >
          <HamburgerMenuIcon />
        </Text>
      </Flex>
      <Flex
        grow="1"
        width="100%"
        px={{ initial: "3", xs: "8" }}
        className="overflow-hidden fixed bg-white opacity-90 z-10 mt-12"
        style={{ animation: "ease height 1s" }}
        height={expand ? "100%" : "0"}
      >
        <Flex
          direction="column"
          className="text-xl w-2/5"
          gap="5"
          pl="3"
          pt="5"
          align="start"
        >
          {items.map((item) => (
            <button
              key={item.value}
              onClick={() => setSelectedItem(item.value)}
            >
              <Text
                className={
                  item.value === selectedItem ? "underline font-bold" : ""
                }
              >
                {item.label}
                {!!item.count && <Badge>{item.count}</Badge>}
              </Text>
            </button>
          ))}
        </Flex>
        <Flex
          className="w-3/5 border-l-2 h-5/6 overflow-y-scroll"
          px="2"
          pt="4"
        >
          <MiniNavbarRight
            selected={selectedItem}
            viewer={viewer}
            contacts={contacts}
            notifications={notifications}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default MiniNavbar;
