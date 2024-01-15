"use client";
import ProfilePicture from "@/app/_components/ProfilePicture";
import { CommentAndAuthor } from "@/app/(main)/interfaces";
import { Box, Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import NewComment from "./NewComment";
// @ts-ignore
import TimeDiff from "js-time-diff";
import CommentDeletion from "./CommentDeletion";
import Link from "next/link";

const Comments = ({
  postId,
  initialComments,
}: {
  postId: string;
  initialComments: CommentAndAuthor[];
}) => {
  const [comments, setComments] = useState<CommentAndAuthor[]>(initialComments);
  return (
    <Flex
      direction="column"
      gap="2"
      mx={{ initial: "2", sm: "6" }}
      my="5"
      className="rounded-xl bg-slate-100"
    >
      {comments.map((comment) => (
        <Flex
          key={comment.id}
          gap="2"
          py="2"
          px="3"
          align="start"
          className="border-b-4 border-white"
        >
          <Link href={"/profile/" + comment.author.username}>
            <ProfilePicture
              size="sm"
              user={comment.author}
            />
          </Link>
          <Flex
            direction="column"
            gap="2"
          >
            <Link href={"/profile/" + comment.author.username}>
              <Text
                className="font-bold"
                size="2"
              >
                {comment.author.name}
              </Text>
            </Link>
            <Text>{comment.text}</Text>
            <Flex
              gap="3"
              align="center"
            >
              <Text
                color="gray"
                size="1"
              >
                {TimeDiff(comment.date)}
              </Text>
              <CommentDeletion
                commentId={comment.id}
                authorId={comment.authorId}
                deleteComment={() => {
                  setComments((prev) =>
                    prev.filter((cmnt) => cmnt.id !== comment.id)
                  );
                }}
              />
            </Flex>
          </Flex>
        </Flex>
      ))}

      <NewComment
        postId={postId}
        setComments={setComments}
      />
    </Flex>
  );
};

export default Comments;
