import React from "react";
import { Counts } from "./ProfileHeader";
import { Flex, Text } from "@radix-ui/themes";

interface Props {
  counts: Counts | null;
}

const Counts = ({ counts }: Props) => {
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
      <Text>{counts?.follower} followers</Text>
      <Text>{counts?.following} followings</Text>
    </Flex>
  );
};

export default Counts;
