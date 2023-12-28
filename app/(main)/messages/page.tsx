"use client";
import React, { useContext, useEffect, useState } from "react";
import { Message, User } from "@prisma/client";
import ContactsList from "./ContactsList";
import { Flex } from "@radix-ui/themes";
import ChatBox from "./ChatBox";
import { Context } from "../../_providers/Context";
import NewMessage from "./NewMessage";
import axios from "axios";
import TinyUsers from "./TinyContacts";
import { ChatContactsInfo } from "../../api/message/users/route";
import { MessageDeliver } from "../interfaces";

interface Props {
  searchParams: { contactId: string };
}

const Messanger = ({ searchParams }: Props) => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    searchParams.contactId || null
  );
  const { viewer } = useContext(Context);
  const [messages, setMessages] = useState<MessageDeliver[]>([]);
  const [gotUsers, setGotUsers] = useState(false);
  const [contactsInfo, setContactsInfo] = useState<ChatContactsInfo[]>([]);
  const [refreshs, setRefreshs] = useState(0);
  //setInterval(() => setRefreshs((prev) => prev + 1), 10000);

  useEffect(() => {
    if (viewer && selectedUserId)
      axios
        .get<Message[]>("/api/message/chat", {
          headers: { userId: viewer.id, contactId: selectedUserId },
        })
        .then((res) =>
          setMessages(
            res.data.map((message) => ({ ...message, deliver: true }))
          )
        );
  }, [viewer, selectedUserId, refreshs]);
  useEffect(() => {
    if (viewer?.id)
      axios
        .get<ChatContactsInfo[]>("/api/message/users", {
          headers: { userId: viewer?.id },
        })
        .then(async (res) => {
          setContactsInfo(res.data);
          setGotUsers(true);
        });
  }, [viewer]);
  useEffect(() => {
    if (selectedUserId && gotUsers && contactsInfo) {
      const searched = contactsInfo.find(
        (contact) => contact.user.id === selectedUserId
      );
      if (!searched) {
        axios
          .get<User>("/api/user/getOne", {
            headers: { userId: selectedUserId },
          })
          .then((res) => {
            const user = res.data;
            if (user) {
              setContactsInfo((prev) => [
                { unseens: 0, lastMessage: "", user },
                ...prev,
              ]);
            }
          });
      }
    }
  }, [gotUsers, selectedUserId, contactsInfo]);
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
  }, [viewer, selectedUserId, refreshs]);
  if (!viewer) return null;
  return (
    <Flex className="fixed bg-white bottom-0 left-0 right-0 top-16 max-md:top-12">
      <Flex
        className="w-1/3"
        display={{ initial: "none", md: "flex" }}
      >
        <ContactsList
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
        style={{ backgroundColor: "var(--accent-3)" }}
        direction="column"
      >
        <ChatBox
          messages={messages}
          viewerId={viewer.id}
          contactId={selectedUserId}
        />
        {selectedUserId && (
          <NewMessage
            fromId={viewer.id}
            toId={selectedUserId}
            addMessage={(newMessage: MessageDeliver) => {
              setMessages((prev) => [newMessage, ...prev]);
            }}
            replaceMessage={(tempId, dbMessage) => {
              setMessages((prev) =>
                prev.map((message) =>
                  message.id === tempId
                    ? { ...dbMessage, deliver: true }
                    : message
                )
              );
            }}
          />
        )}
      </Flex>
    </Flex>
  );
};

export default Messanger;
