import ProfilePicture from "@/app/_components/ProfilePicture";
import SinglePost from "@/app/_components/SinglePost";
import { PostAndRef } from "@/app/interfaces";
import prisma from "@/prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { postId: string };
}

const PostDetails = async ({ params }: Props) => {
  const post = (await prisma.posts.findUnique({
    where: { id: params.postId },
    include: { author: true },
  })) as PostAndRef;
  const comments = await prisma.comment.findMany({
    where: { postRefId: params.postId },
    include: { author: true },
  });
  if (!post) notFound();
  return (
    <div>
      <SinglePost rawPost={post} />
      <Flex
        direction="column"
        gap="2"
        px="5"
        mt="4"
      >
        {comments.map((comment) => (
          <Flex
            key={comment.id}
            gap="2"
            align="center"
          >
            <ProfilePicture
              size="sm"
              user={comment.author}
            />
            <Text>
              <Text className="font-bold">{comment.author.name}:</Text>{" "}
              {comment.text}
            </Text>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

export default PostDetails;
