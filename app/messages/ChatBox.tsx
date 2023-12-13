import React, { useContext, useEffect, useState } from "react";
import { Context } from "../_providers/Context";
import axios from "axios";
import { Message } from "@prisma/client";
import { Box, Flex, Text } from "@radix-ui/themes";
interface Props {
  messages: Message[];
  viewerId: string | null;
}
const ChatBox = ({ messages, viewerId }: Props) => {
  return (
    <Box
      height="100%"
      width="100%"
      className="max-h-full overflow-y-scroll border-b-2"
      style={{ backgroundColor: "var(--accent-3)" }}
    >
      <Flex
        direction="column-reverse"
        gap="2"
        p="5"
      >
        {messages.map((message) => (
          <Flex
            key={message.id}
            justify={message.fromUserId === viewerId ? "end" : "start"}
          >
            <Box
              className={
                (message.fromUserId === viewerId
                  ? "bg-teal-200 "
                  : "bg-gray-50") + " rounded-2xl"
              }
              p="3"
            >
              <Text size={{ initial: "2", sm: "3" }}>{message.text}</Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default ChatBox;
