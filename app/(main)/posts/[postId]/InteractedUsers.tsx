import UserFieldPopover from "@/app/_components/UserFieldPopover";
import { CommentAndAuthor } from "@/app/interfaces";
import prisma from "@/prisma/client";
import { Flex } from "@radix-ui/themes";
import React from "react";

interface Props {
  postId: string;
  comments: CommentAndAuthor[];
}

const InteractedUsers = async ({ postId, comments }: Props) => {
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
      {commenters.length > 0 && (
        <UserFieldPopover
          label={comments.length + " comments"}
          users={commenters}
          title="People who comment on this post."
        />
      )}
      {reposters.length > 0 && (
        <UserFieldPopover
          label={reposters.length + " reposts"}
          users={reposters}
          title="People who reposted this post."
        />
      )}
    </Flex>
  );
};

export default InteractedUsers;
