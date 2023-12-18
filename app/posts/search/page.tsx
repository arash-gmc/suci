import prisma from "@/prisma/client";
import React from "react";
import PostsGrid from "../_components/PostsGrid";
import { Container, Text } from "@radix-ui/themes";

interface Props {
  searchParams: { searched: string };
}

const page = async ({ searchParams }: Props) => {
  const posts = await prisma.posts.findMany({
    where: { text: { contains: searchParams.searched } },
    include: { author: true },
  });
  return (
    <Container>
      <Text
        size="5"
        m="3"
      >
        Search for <strong>"{searchParams.searched}"</strong> in all posts.
      </Text>
      <PostsGrid
        posts={posts}
        isLoading={false}
      />
    </Container>
  );
};

export default page;
