import { Container, Flex, Text } from "@radix-ui/themes";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { FaRegComment, FaRetweet } from "react-icons/fa6";
import React from "react";
import ProfilePicture from "./ProfilePicture";
import { Posts, User } from "@prisma/client";

interface Props {
  user: User;
  post: Posts;
}

const Tweet = ({ user, post }: Props) => {
  return (
    <Container>
      <Flex gap="3" mx="5" className="border-b-2 pb-6">
        <Flex direction="column">
          <ProfilePicture user={user} size="md" />
        </Flex>

        <Flex
          direction="column"
          gap="2"
          className="max-h-26 overflow-hidden"
          width="100%"
        >
          <Flex align="baseline" gap="2">
            <Text size="4" className="font-bold">
              {user.name}
            </Text>
            <Text size="1" color="gray">
              @{user.username}
            </Text>
            <Text size="1" color="gray" ml="1">
              1h
            </Text>
          </Flex>
          <Text>{post.text}</Text>
          <Flex justify="center" className="text-2xl" gap="8" align="center">
            <BiLike />
            <BiDislike />
            <FaRetweet />
            <FaRegComment />
            <GoBookmark />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Tweet;
