import prisma from "@/prisma/client";
import React from "react";
import PostsGrid from "../_components/PostsGrid";
import { Container, Flex, Link, Text } from "@radix-ui/themes";

interface Props {
  searchParams: { searched: string };
}

const page = async ({ searchParams }: Props) => {
  const posts = await prisma.posts.findMany({
    where: { text: { contains: searchParams.searched } },
    include: { author: true },
  });
  if (posts.length === 0)
    return (
      <Container>
        <Flex align="center" direction="column" gap="3">
          <Text
            size={{ initial: "4", md: "7" }}
            my={{ initial: "6", md: "9" }}
            className="font-bold"
          >
            Your search word does not match with any posts.
          </Text>

          <Text
            size={{ initial: "3", sm: "4" }}
            align="center"
            className="font-bold w-full"
          >
            Try another search input or <Link href="/">Go back to home</Link>
          </Text>
        </Flex>
      </Container>
    );
  return (
    <Container>
      <Text size="5" m="3">
        Search for <strong>&#34;{searchParams.searched}&#34;</strong> in all
        posts.
      </Text>
      <PostsGrid posts={posts} isLoading={false} />
    </Container>
  );
};

export default page;
