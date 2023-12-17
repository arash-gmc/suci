"use client";
import { Popover, Flex, Text, Badge } from "@radix-ui/themes";
import React from "react";
import ProfilePicture from "../_components/ProfilePicture";
import { ChatContactsInfo } from "../api/message/users/route";
import { useRouter } from "next/navigation";

interface Props {
  contacts: ChatContactsInfo[];
}
const MessageMenu = ({ contacts }: Props) => {
  const router = useRouter();
  return (
    <Flex direction="column">
      {contacts.map((item) => (
        <button
          onClick={() => {
            router.push("/messages?contactId=" + item.user.id);
          }}
          key={item.user.id}
        >
          <Flex
            align="center"
            gap="2"
            py="2"
            justify="between"
            className="border-b-2"
          >
            <Flex
              gap="2"
              align="center"
            >
              <Flex
                direction="column"
                align="center"
              >
                <ProfilePicture
                  size="sm"
                  user={item.user}
                />
                <Text size="2">{item.user.name}</Text>
              </Flex>

              <Text
                color="gray"
                size="2"
              >
                {item.lastMessage}
              </Text>
            </Flex>
            <Badge>{item.unseens}</Badge>
          </Flex>
        </button>
      ))}
      {contacts.length === 0 ? (
        <Flex
          justify="center"
          pb="3"
          className="border-b-2"
        >
          You have no new messages.
        </Flex>
      ) : null}

      <button
        className="font-bold py-1 justify-center"
        onClick={() => router.push("/messages")}
      >
        Go to Message Box
      </button>
    </Flex>
  );
};

export default MessageMenu;
