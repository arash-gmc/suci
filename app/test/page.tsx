import React from "react";
import SinglePost from "../_components/SinglePost";
import prisma from "@/prisma/client";
import PostsGrid from "../_components/PostsGrid";

interface Info {
  public_id: string;
}

const page = async () => {
  const posts = await prisma.posts.findMany({ include: { author: true } });
  return <PostsGrid posts={posts} />;
};

export default page;

//  njva9rsrvzdxfvljc7w8
