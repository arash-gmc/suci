"use client";
import { Message } from "@prisma/client";
import { Box, Flex, Text } from "@radix-ui/themes";
import { useEffect, useRef } from "react";
import { MessageDeliver } from "../interfaces";
import { FaCheck, FaCheckDouble, FaRegClock } from "react-icons/fa6";
import { BiCheckDouble } from "react-icons/bi";
interface Props {
  messages: MessageDeliver[];
  viewerId: string | null;
  contactId: string | null;
}

const ChatBox = ({ messages, viewerId, contactId }: Props) => {
  const scrollDiv = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollDiv.current?.scrollIntoView();
  }, [messages, contactId]);
  return (
    <Box
      height="100%"
      width="100%"
      className="max-h-full overflow-y-scroll border-b-2"
      style={{ backgroundColor: "var(--accent-3)" }}
    >
      <Flex
        direction="column-reverse"
        gap="3"
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
              <Flex
                direction="column"
                gap="1"
              >
                <Text size={{ initial: "2", sm: "4" }}>{message.text}</Text>

                {message.fromUserId === viewerId && (
                  <Flex
                    justify="end"
                    className="text-sm text-slate-400"
                  >
                    {message.deliver ? (
                      message.seen ? (
                        <BiCheckDouble />
                      ) : (
                        <FaCheck />
                      )
                    ) : (
                      <FaRegClock />
                    )}
                  </Flex>
                )}
              </Flex>
            </Box>
          </Flex>
        ))}
      </Flex>
      <div ref={scrollDiv}></div>
    </Box>
  );
};

export default ChatBox;
