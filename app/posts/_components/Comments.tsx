"use client";
import ProfilePicture from "@/app/_components/ProfilePicture";
import { CommentAndAuthor } from "@/app/interfaces";
import { Box, Flex, Text } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddComment from "./AddComment";
import NewComment from "./NewComment";

const Comments = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<CommentAndAuthor[]>([]);
  useEffect(() => {
    if (postId)
      axios
        .get<CommentAndAuthor[]>("/api/comment/" + postId)
        .then((res) => setComments(res.data));
  }, [postId]);
  return (
    <>
      <Flex
        direction="column"
        gap="2"
        mx="6"
        my="5"
        style={{ background: "var(--accent-3)" }}
        className="rounded-xl"
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
    </>
  );
};

export default Comments;
