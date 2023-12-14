"use client";
import { Button, Flex, TextArea } from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Message, User } from "@prisma/client";

interface Props {
  toId: string | null;
  fromId: string;
  addMessage: (value: Message) => void;
}

const NewMessage = ({ toId, fromId, addMessage }: Props) => {
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState<null | User>(null);
  useEffect(() => {
    if (toId)
      axios
        .get<User>("/api/user/getOne", { headers: { userId: toId } })
        .then((res) => setContact(res.data));
  }, [fromId, toId]);
  const sendMessage = () => {
    axios
      .post<Message>("/api/message", {
        fromId,
        toId,
        text: message,
      })
      .then((res) => {
        addMessage(res.data);
        setMessage("");
      });
  };
  if (!toId || !fromId) return null;
  if (!contact) return null;
  return (
    <Flex
      gap="3"
      align="center"
      my="4"
      px="3"
      style={{ backgroundColor: "var(--accent-3)" }}
    >
      <TextArea
        placeholder="Write your message..."
        onChange={(e) => {
          setMessage(e.currentTarget.value);
        }}
        value={message}
        className="w-full"
      />
      <Button onClick={() => sendMessage()}>Send</Button>
    </Flex>
  );
};

export default NewMessage;
