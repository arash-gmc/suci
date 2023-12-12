import React, { useContext, useEffect, useState } from "react";
import { Context } from "../_providers/Context";
import axios from "axios";
import { Message } from "@prisma/client";
import { Box, Flex, Text } from "@radix-ui/themes";
interface Props {
  contactId: string | null;
}
const ChatBox = ({ contactId }: Props) => {
  const { viewer } = useContext(Context);
  const [messages, setMessages] = useState<Message[]>([]);
  useEffect(() => {
    if (viewer && contactId)
      axios
        .get<Message[]>("/api/message/chat", {
          headers: { userId: viewer?.id, contactId },
        })
        .then((res) => setMessages(res.data));
  }, [viewer, contactId]);
  return (
    <Box
      height="100%"
      width="100%"
      className="bg-teal-100"
    >
      <Flex
        direction="column-reverse"
        gap="3"
        p="5"
      >
        {messages.map((message) => (
          <Flex
            key={message.id}
            justify={message.fromUserId === viewer?.id ? "end" : "start"}
          >
            <Box
              className={
                (message.fromUserId === viewer?.id
                  ? "bg-teal-300 "
                  : "bg-gray-50") + " rounded-2xl"
              }
              p="3"
            >
              <Text>{message.text}</Text>
            </Box>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

export default ChatBox;
