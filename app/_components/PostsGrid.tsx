import React from "react";
import { PostsWithUsers } from "../interfaces";
import SinglePost from "./SinglePost";
import { Flex, Heading } from "@radix-ui/themes";

const PostsGrid = ({ posts }: { posts: PostsWithUsers[] }) => {
  if (posts.length === 0)
    return (
      <Flex justify="center" m="5">
        <Heading>There is no post to show.</Heading>
      </Flex>
    );
  return (
    <Flex direction="column" gap="3">
      {posts.map((post) => (
        <SinglePost post={post} />
      ))}
    </Flex>
  );
};

export default PostsGrid;
