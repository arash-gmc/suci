import NewPost from "@/app/NewPost";
import { nextauthConfig } from "@/app/api/auth/[...nextauth]/route";
import PostTable from "@/components/PostTable";
import prisma from "@/prisma/client";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: { userId: string } }) => {
  const user = await prisma.user.findUnique({ where: { id: params.userId } });
  if (!user) notFound();
  const posts = await prisma.posts.findMany({
    where: { authorId: params.userId },
    include: { author: true },
  });
  const session = await getServerSession(nextauthConfig);
  return (
    <Flex direction="column" gap="3">
      <Grid columns="2">
        <Heading>{user.name}</Heading>
        <Flex justify="between">
          <Text>{posts.length} Posts</Text>
          <Text>0 followers</Text>
          <Text>0 followings</Text>
        </Flex>
      </Grid>
      {session?.user.id === user.id && <NewPost />}
      <PostTable posts={posts} />
    </Flex>
  );
};

export default page;
