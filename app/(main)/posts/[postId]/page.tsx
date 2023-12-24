import ProfilePicture from "@/app/_components/ProfilePicture";
import SinglePost from "@/app/(main)/posts/_components/SinglePost";
import { PostAndRef } from "@/app/interfaces";
import prisma from "@/prisma/client";
import { Container, Flex, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import React from "react";
import Comments from "../_components/Comments";
import UserFieldPopover from "@/app/_components/UserFieldPopover";
import InteractedUsers from "./InteractedUsers";

interface Props {
  params: { postId: string };
}

const PostDetails = async ({ params }: Props) => {
  const post = await prisma.posts.findUnique({
    where: { id: params.postId },
    include: { author: true },
  });

  const comments = await prisma.comment.findMany({
    where: { postRefId: params.postId },
    include: { author: true },
  });

  if (!post) notFound();
  return (
    <Container mt={{ initial: "3", sm: "8" }}>
      <SinglePost rawPost={post} />
      <InteractedUsers
        postId={params.postId}
        comments={comments}
      />
      <Comments
        postId={params.postId}
        initialComments={comments}
      />
    </Container>
  );
};

export default PostDetails;
