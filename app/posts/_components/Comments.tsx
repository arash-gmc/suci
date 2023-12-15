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
        mt="5"
        className="bg-cyan-50 rounded-xl"
      >
        {comments.map((comment) => (
          <Flex
            key={comment.id}
            gap="2"
            py="4"
            px="3"
            align="center"
            className="border-b-4 border-white"
          >
            <ProfilePicture
              size="sm"
              user={comment.author}
            />
            <Flex gap="2">
              <Text className="font-bold">{comment.author.name}:</Text>{" "}
              <Text>{comment.text}</Text>
            </Flex>
          </Flex>
        ))}
        <Box
          mt="5"
          px="5"
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
