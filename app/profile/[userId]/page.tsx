import NewPost from "@/app/NewPost";
import { nextauthConfig } from "@/app/api/auth/[...nextauth]/route";
import PostTable from "@/app/_components/PostTable";
import prisma from "@/prisma/client";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import React from "react";
import ProfileHeader from "./ProfileHeader";

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
      <ProfileHeader user={user} postsCount={posts.length} session={session} />
      {session?.user.id === user.id && <NewPost />}
      <PostTable posts={posts} />
    </Flex>
  );
};

export default page;
