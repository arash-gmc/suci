import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../_providers/Context";
import { Badge, Box, Flex, Text } from "@radix-ui/themes";
import ProfilePicture from "../../_components/ProfilePicture";
import { ChatContactsInfo } from "../../api/message/users/route";
import AddContact from "./AddContact";
import useTheme from "next-theme";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  selectedUserId: string | null;
  contactsInfo: ChatContactsInfo[];
}
const TinyContacts = ({ setUser, selectedUserId, contactsInfo }: Props) => {
  const { theme } = useTheme();
  return (
    <Flex
      direction="column"
      className={
        "w-full overflow-y-scroll border-r-2 " +
        (theme === "light" ? "bg-slate-100" : "bg-slate-700")
      }
    >
      {contactsInfo.map((contact) => (
        <Flex
          key={contact.user.id}
          align="center"
          justify="center"
          direction="column"
          className={
            (theme === "light"
              ? contact.user.id === selectedUserId
                ? "bg-sky-200 "
                : "bg-white "
              : contact.user.id === selectedUserId
              ? "bg-sky-700 "
              : "bg-slate-800 ") + "border-b-2 cursor-pointer py-2 px-3 "
          }
          onClick={() => setUser(contact.user.id)}
        >
          <ProfilePicture size="sm" user={contact.user} />

          <Text size={{ initial: "1", sm: "2" }} className="text-center">
            {contact.user.name?.split(" ")[0]}
          </Text>
          {!!contact.unseens && <Badge>{contact.unseens}</Badge>}
        </Flex>
      ))}
      <Flex justify="center" my="5">
        <AddContact mini={true} setUser={(userId: string) => setUser(userId)} />
      </Flex>
    </Flex>
  );
};

export default TinyContacts;
