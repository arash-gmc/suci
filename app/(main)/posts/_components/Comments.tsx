"use client";
import ProfilePicture from "@/app/_components/ProfilePicture";
import { CommentAndAuthor } from "@/app/(main)/interfaces";
import { Box, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import QuickComment from "./QuickComment";
import NewComment from "./NewComment";

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
      mx="6"
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
          <ProfilePicture
            size="sm"
            user={comment.author}
          />
          <Flex direction="column">
            <Text
              className="font-bold"
              size="2"
            >
              {comment.author.name}
            </Text>{" "}
            <Text>{comment.text}</Text>
          </Flex>
        </Flex>
      ))}
      <Box
        mt="4"
        px={{ initial: "1", sm: "3" }}
      >
        <NewComment
          postId={postId}
          setComments={setComments}
        />
      </Box>
    </Flex>
  );
};

export default Comments;
