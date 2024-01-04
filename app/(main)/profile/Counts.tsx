import React from "react";
import { Counts } from "./ProfileHeader";
import { Flex, Text } from "@radix-ui/themes";
import { User } from "@prisma/client";
import UserFieldPopover from "../../_components/UserFieldPopover";

interface Props {
  counts: Counts | null;
  followings: User[];
  followers: User[];
  userName: string | null;
}

const Counts = ({ counts, followings, followers, userName }: Props) => {
  return (
    <Flex
      direction={{ initial: "row", sm: "column" }}
      justify="center"
      gap={{ initial: "8", sm: "3" }}
      className="font-bold md:border-l-2"
      my="3"
      p="2"
    >
      <Text>{counts?.post || "0"} Posts</Text>

      <UserFieldPopover
        label={(counts?.follower || "0") + " Followers"}
        users={followers}
        title={"People who followed " + userName}
      />
      <UserFieldPopover
        label={(counts?.following || "0") + " Followings"}
        users={followings}
        title={"people who " + userName + " is following"}
      />
    </Flex>
  );
};

export default Counts;
