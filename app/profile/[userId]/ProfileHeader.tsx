import prisma from "@/prisma/client";
import { User } from "@prisma/client";
import { Grid, Heading, Flex, Text, Button } from "@radix-ui/themes";
import { Session } from "next-auth";
import React from "react";
import FollowButton from "./FollowButton";

interface Props {
  user: User;
  postsCount: number;
  session: Session | null;
}

const ProfileHeader = async ({ user, postsCount, session }: Props) => {
  const followers = await prisma.follow.count({
    where: { followerId: user.id },
  });
  const followings = await prisma.follow.count({
    where: { followingId: user.id },
  });

  return (
    <Grid columns="2">
      <Heading>{user.name}</Heading>
      <Flex direction="column" gap="3">
        <Flex justify="between">
          <Text>{postsCount} Posts</Text>
          <Text>{followers} followers</Text>
          <Text>{followings} followings</Text>
        </Flex>
        <Flex justify="center">
          <FollowButton followerId={user.id} followingId={session?.user.id} />
        </Flex>
      </Flex>
    </Grid>
  );
};

export default ProfileHeader;
