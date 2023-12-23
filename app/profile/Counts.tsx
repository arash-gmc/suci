import React from "react";
import { Counts } from "./ProfileHeader";
import { Flex, Text } from "@radix-ui/themes";
import { User } from "@prisma/client";
import UserFieldPopover from "../_components/UserFieldPopover";

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
      className="font-bold border-l-2 max-sm:border-0"
      my="3"
      p="2"
    >
      <Text>{counts?.post} Posts</Text>

      <UserFieldPopover
        label={(counts?.follower || "") + " Followers"}
        users={followers}
        title={"People who followed " + userName}
      />
      <UserFieldPopover
        label={(counts?.following || "") + " Followings"}
        users={followings}
        title={"people who " + userName + " is following"}
      />
    </Flex>
  );
};

export default Counts;
