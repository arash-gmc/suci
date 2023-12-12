"use client";
import { getServerSession } from "next-auth";
import React, { useContext, useState } from "react";
import { nextauthConfig } from "../api/auth/[...nextauth]/route";
import prisma from "@/prisma/client";
import { Message, User } from "@prisma/client";
import Users from "./Users";
import { Flex, Grid } from "@radix-ui/themes";
import ChatBox from "./ChatBox";

const page = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  return (
    <Flex>
      <Flex className="w-1/3 h-full">
        <Users setUser={setSelectedUserId} />
      </Flex>
      <Flex
        className="w-full"
        style={{ height: "92vh" }}
      >
        <ChatBox contactId={selectedUserId} />
      </Flex>
    </Flex>
  );
};

export default page;
