import { User } from "@prisma/client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../_providers/Context";
import { Badge, Box, Flex, Text } from "@radix-ui/themes";
import ProfilePicture from "../_components/ProfilePicture";
import { ChatContactsInfo } from "../api/message/users/route";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  selectedUserId: string | null;
}
const Users = ({ setUser, selectedUserId }: Props) => {
  const [contactsInfo, setcontactsInfo] = useState<ChatContactsInfo[]>([]);
  const { viewer } = useContext(Context);
  useEffect(() => {
    if (viewer?.id)
      axios
        .get<ChatContactsInfo[]>("/api/message/users", {
          headers: { userId: viewer?.id },
        })
        .then((res) => setcontactsInfo(res.data));
  }, [viewer]);

  return (
    <Flex
      direction="column"
      className="w-full"
    >
      {contactsInfo.map((contact) => (
        <Flex
          key={contact.user.id}
          p="2"
          align="center"
          justify="between"
          className={
            (contact.user.id === selectedUserId ? "bg-sky-200 " : "") +
            "border-b-2 cursor-pointer px-3 mx-1 "
          }
          onClick={() => setUser(contact.user.id)}
        >
          <Flex
            align="center"
            gap="2"
          >
            <ProfilePicture
              size="md"
              user={contact.user}
            />
            <Box>
              <Text as="p">{contact.user.name}</Text>
              <Text
                color="gray"
                size="2"
              >
                {contact.lastMessage}
              </Text>
            </Box>
          </Flex>
          {contact.unseens && <Badge>{contact.unseens}</Badge>}
        </Flex>
      ))}
    </Flex>
  );
};

export default Users;
