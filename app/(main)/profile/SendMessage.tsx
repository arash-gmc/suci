"use client";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import { Popover, Button, Flex, Box, TextArea, Text } from "@radix-ui/themes";
import React, { useContext, useState } from "react";
import axios from "axios";
import { ViewerContext } from "@/app/_providers/ViewerContext";
import ProfilePicture from "@/app/_components/ProfilePicture";
import Link from "next/link";

interface Props {
  profileId: string;
  profileName: string | null;
}

const SendMessage = ({ profileId, profileName }: Props) => {
  const { viewer } = useContext(ViewerContext);
  const [messageText, setMessageText] = useState("");
  const sendMessage = () => {
    axios
      .post("/api/message", {
        fromId: viewer?.id,
        toId: profileId,
        text: messageText,
      })
      .then((res) => null);
  };
  if (!viewer) return <Button disabled={true}>Message</Button>;
  if (viewer.id === profileId) return null;
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button>Message</Button>
      </Popover.Trigger>
      <Popover.Content style={{ width: 360 }}>
        <Flex gap="3">
          <Flex align="start">
            <ProfilePicture user={viewer} size="sm" />
          </Flex>
          <Box grow="1">
            <TextArea
              placeholder={"Write a message to " + profileName + " ..."}
              style={{ height: 80 }}
              onChange={(e) => setMessageText(e.currentTarget.value)}
            />
            <Flex mt="3" justify="between">
              <Flex gap="3">
                <Popover.Close>
                  <Button size="1" variant="outline">
                    Cancel
                  </Button>
                </Popover.Close>
                <Popover.Close>
                  <Button size="1" variant="outline">
                    <Link href={"/messages?contactId=" + profileId}>
                      Go to Chat
                    </Link>
                  </Button>
                </Popover.Close>
              </Flex>
              <Popover.Close>
                <Button
                  size="1"
                  onClick={() => sendMessage()}
                  disabled={!messageText}
                >
                  Send
                </Button>
              </Popover.Close>
            </Flex>
          </Box>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default SendMessage;
