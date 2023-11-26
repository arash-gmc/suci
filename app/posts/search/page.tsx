import PostsGrid from "@/app/_components/PostsGrid";
import prisma from "@/prisma/client";
import React from "react";

interface Props {
  searchParams: { searched: string };
}

const page = async ({ searchParams }: Props) => {
  const posts = await prisma.posts.findMany({
    where: { text: { contains: searchParams.searched } },
    include: { author: true },
  });
  return <PostsGrid posts={posts} />;
};

export default page;
