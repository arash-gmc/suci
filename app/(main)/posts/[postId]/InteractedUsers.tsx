import UserFieldPopover from "@/app/_components/UserFieldPopover";
import { CommentAndAuthor } from "@/app/(main)/interfaces";
import prisma from "@/prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import React from "react";
import DeletionAlert from "./DeletionAlert";
import EditPost from "./EditPost";

interface Props {
  postId: string;
  comments: CommentAndAuthor[];
  authorId: string;
  postText: string | null;
}

const InteractedUsers = async ({
  postId,
  comments,
  authorId,
  postText,
}: Props) => {
  const likeRecords = await prisma.postsActions.findMany({
    where: { actionType: "like", postId: postId },
    include: { user: true },
  });
  const likers = likeRecords.map((record) => record.user);

  const commenters = comments.map((comment) => comment.author);

  const repostRecords = await prisma.posts.findMany({
    where: { refId: postId },
    include: { author: true },
  });
  const reposters = repostRecords.map((record) => record.author);
  return (
    <Flex
      justify="start"
      gap="4"
      mt="3"
      ml="8"
      className="text-gray-600 text-sm"
    >
      {likers.length > 0 && (
        <UserFieldPopover
          label={likers.length + " likes"}
          users={likers}
          title="People who liked this post."
        />
      )}
      {commenters.length > 0 && <Text>{comments.length + " comments"}</Text>}
      {reposters.length > 0 && (
        <UserFieldPopover
          label={reposters.length + " reposts"}
          users={reposters}
          title="People who reposted this post."
        />
      )}

      <DeletionAlert authorId={authorId} />
      <EditPost
        authorId={authorId}
        initialText={postText}
      />
    </Flex>
  );
};

export default InteractedUsers;
