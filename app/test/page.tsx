import React from "react";
import Tweet from "../_components/Tweet";
import prisma from "@/prisma/client";

interface Info {
  public_id: string;
}

const page = async () => {
  const post = await prisma.posts.findMany({ include: { author: true } });
  if (!post) return null;
  return <Tweet post={post[1]} user={post[0].author} />;
};

export default page;

//  njva9rsrvzdxfvljc7w8
