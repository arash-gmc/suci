"use client";
import { getServerSession } from "next-auth";
import React, { useContext, useEffect, useState } from "react";
import { nextauthConfig } from "../api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { Message, User } from "@prisma/client";
import Users from "./Users";
import { Flex, Grid } from "@radix-ui/themes";
import ChatBox from "./ChatBox";
import { Context } from "../_providers/Context";
import NewMessage from "./NewMessage";
import axios from "axios";
import TinyUsers from "./TinyUsers";
import { ChatContactsInfo } from "../api/message/users/route";

const page = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { viewer } = useContext(Context);
  const [messages, setMessages] = useState<Message[]>([]);
  const [contactsInfo, setContactsInfo] = useState<ChatContactsInfo[]>([]);
  const [refreshs, setRefreshs] = useState(0);
  //setInterval(() => setRefreshs((prev) => prev + 1), 5000);
  useEffect(() => {
    if (viewer && selectedUserId)
      axios
        .get<Message[]>("/api/message/chat", {
          headers: { userId: viewer.id, contactId: selectedUserId },
        })
        .then((res) => setMessages(res.data));
  }, [viewer, selectedUserId, refreshs]);
  useEffect(() => {
    if (viewer?.id)
      axios
        .get<ChatContactsInfo[]>("/api/message/users", {
          headers: { userId: viewer?.id },
        })
        .then((res) => setContactsInfo(res.data));
  }, [viewer]);
  useEffect(() => {
    if (viewer?.id && selectedUserId)
      axios
        .patch("/api/message/seen", {
          userId: viewer?.id,
          contactId: selectedUserId,
        })
        .then((res) => {
          setContactsInfo((prev) =>
            prev.map((contact) =>
              contact.user.id === selectedUserId
                ? { ...contact, unseens: 0 }
                : contact
            )
          );
        });
  }, [selectedUserId, refreshs]);
  if (!viewer) return null;
  return (
    <Flex>
      <Flex
        className="w-1/3 h-full"
        display={{ initial: "none", md: "flex" }}
      >
        <Users
          setUser={setSelectedUserId}
          selectedUserId={selectedUserId}
          contactsInfo={contactsInfo}
        />
      </Flex>
      <Flex
        display={{ initial: "flex", md: "none" }}
        className="w-1/5"
      >
        <TinyUsers
          setUser={setSelectedUserId}
          selectedUserId={selectedUserId}
          contactsInfo={contactsInfo}
        />
      </Flex>
      <Flex
        className="w-full"
        style={{ height: "92vh", backgroundColor: "var(--accent-3)" }}
        direction="column"
      >
        <ChatBox
          messages={messages}
          viewerId={viewer.id}
        />
        <NewMessage
          fromId={viewer.id}
          toId={selectedUserId}
          addMessage={(newMessage: Message) => {
            setMessages((prev) => [newMessage, ...prev]);
          }}
        />
      </Flex>
    </Flex>
  );
};

export default page;
