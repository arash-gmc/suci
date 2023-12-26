import prisma from "@/prisma/client";
import React from "react";
import PostsGrid from "../_components/PostsGrid";
import { Container, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { nextauthConfig } from "@/app/api/auth/[...nextauth]/route";

interface Props {
  searchParams: { searched: string };
}

const page = async ({ searchParams }: Props) => {
  const session = await getServerSession(nextauthConfig);
  // const posts = await prisma.posts.findMany({
  //   where: { text: { contains: searchParams.searched } },
  //   include: { author: true },
  // });
  const records = await prisma.postsActions.findMany({
    where: { actionType: "bookmark", userId: session?.user.id },
    include: { post: { include: { author: true } } },
  });
  const posts = records.map((record) => record.post);
  return (
    <Container>
      <Text
        size="7"
        m="5"
        align="center"
        className="font-bold w-full"
      >
        Your Bookmarks
      </Text>
      <PostsGrid
        posts={posts}
        isLoading={false}
      />
    </Container>
  );
};

export default page;
