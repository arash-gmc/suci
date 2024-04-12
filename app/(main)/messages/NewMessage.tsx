"use client";
import { Button, Flex, TextArea } from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Message, User } from "@prisma/client";
import { MessageDeliver } from "../interfaces";
import crypto from "crypto";
import useTheme from "next-theme";

interface Props {
  toId: string;
  fromId: string;
  addMessage: (value: MessageDeliver) => void;
  replaceMessage: (tempId: string, dbMessage: Message) => void;
}

const NewMessage = ({ toId, fromId, addMessage, replaceMessage }: Props) => {
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState<null | User>(null);
  const { theme } = useTheme();
  useEffect(() => {
    if (toId)
      axios
        .get<User>("/api/user/getOne", { headers: { userId: toId } })
        .then((res) => setContact(res.data));
  }, [fromId, toId]);

  const sendMessage = () => {
    const tempId = crypto.randomBytes(16).toString("hex");
    axios
      .post<Message>("/api/message", {
        fromId,
        toId,
        text: message,
      })
      .then((res) => {
        replaceMessage(tempId, res.data);
        return null;
      });
    addMessage({
      fromUserId: fromId,
      toUserId: toId,
      text: message,
      date: new Date(),
      seen: false,
      id: tempId,
      deliver: false,
    });
    setMessage("");
  };
  if (!toId || !fromId) return null;
  if (!contact) return null;
  return (
    <Flex
      gap="3"
      align="center"
      py="4"
      px="3"
      className={theme === "light" ? "bg-slate-100" : "bg-slate-800"}
    >
      <Flex width="100%">
        <TextArea
          placeholder="Write your message..."
          onChange={(e) => {
            setMessage(e.currentTarget.value);
          }}
          value={message}
        />
      </Flex>
      <Button onClick={() => sendMessage()}>Send</Button>
    </Flex>
  );
};

export default NewMessage;
