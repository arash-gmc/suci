import React, { useContext } from "react";
import { Selected } from "./MiniNavbar";
import { Flex, Text } from "@radix-ui/themes";
import ProfilePicture from "./_components/ProfilePicture";
import { User } from "@prisma/client";
import Link from "next/link";
import Search from "./_components/Search";
import { ChatContactsInfo } from "./api/message/users/route";
import MessageMini from "./messages/MessageMini";
import { Notif } from "./interfaces";
import NotifMini from "./notifications/NotifMini";
import Filter from "./filter/Filter";
import { Context } from "./_providers/Context";

interface Props {
  selected: Selected;
  viewer: User;
  contacts: ChatContactsInfo[];
  notifications: Notif[];
}

const MiniNavbarRight = ({
  selected,
  viewer,
  contacts,
  notifications,
}: Props) => {
  const { setWhere } = useContext(Context);
  if (selected === "profile")
    return (
      <Flex
        align="center"
        gap="5"
        direction="column"
        pt="5"
        width="100%"
      >
        <ProfilePicture
          size="lg"
          user={viewer}
        />

        <Flex
          direction="column"
          className="text-xl text-slate-600"
          gap="5"
          width="100%"
        >
          <Flex direction="column">
            <Text>{viewer.name}</Text>
            <Text
              size="1"
              color="gray"
            >
              @{viewer.username}
            </Text>
          </Flex>
          <Link href={"/profile/" + viewer.username}>Go to Profile</Link>
          <Link href="#">Edit Profile</Link>
          <Link href="/api/auth/signout">Sign Out</Link>
        </Flex>
      </Flex>
    );
  if (selected === "filter")
    return (
      <Flex
        justify="center"
        width="100%"
      >
        <Filter setWhere={setWhere} />
      </Flex>
    );
  if (selected === "message") return <MessageMini contacts={contacts} />;
  if (selected === "notification")
    return <NotifMini notifications={notifications} />;
  if (selected === "search")
    return (
      <Flex pt="4">
        <Search />
      </Flex>
    );
  return null;
};

export default MiniNavbarRight;
