import { Flex } from "@radix-ui/themes";
import NewPost from "./NewPost";
import PostTable from "../components/PostTable";
import prisma from "@/prisma/client";

export default async function Home() {
  const posts = await prisma.posts.findMany({ include: { author: true } });
  return (
    <>
      <Flex direction="column" gap="2">
        <NewPost />
        <PostTable posts={posts} />
      </Flex>
    </>
  );
}
