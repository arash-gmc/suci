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

const page = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { viewer } = useContext(Context);
  const [messages, setMessages] = useState<Message[]>([]);
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
  if (!viewer) return null;
  return (
    <Flex>
      <Flex className="w-1/3 h-full">
        <Users
          setUser={setSelectedUserId}
          selectedUserId={selectedUserId}
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
