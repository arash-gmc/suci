import prisma from "@/prisma/client";
import React from "react";
import PostsGrid from "../_components/PostsGrid";
import { Box, Container, Flex, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { nextauthConfig } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import ProfilePicture from "@/app/_components/ProfilePicture";

interface Props {
  searchParams: { searched: string };
}

const page = async ({ searchParams }: Props) => {
  const session = await getServerSession(nextauthConfig);
  const records = await prisma.postsActions.findMany({
    where: { actionType: "bookmark", userId: session?.user.id },
    include: { post: { include: { author: true } } },
  });
  const posts = records.map((record) => record.post);
  if (posts.length === 0)
    return (
      <Container>
        <Flex align="center" direction="column" gap="3">
          <Text
            size={{ initial: "4", md: "7" }}
            my={{ initial: "6", md: "9" }}
            className="font-bold"
          >
            You have not bookmarked any post yet.
          </Text>
          <Link href="/">
            <Text
              size={{ initial: "3", sm: "4" }}
              align="center"
              className="font-bold w-full"
            >
              Go back to home
            </Text>
          </Link>
        </Flex>
      </Container>
    );
  return (
    <Container>
      <Box my="5">
        <Text size="4" m="5">
          You have bookmarked <strong>{posts.length}</strong> posts.
        </Text>
      </Box>
      <PostsGrid posts={posts} isLoading={false} />
    </Container>
  );
};

export default page;
