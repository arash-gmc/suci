"use client";
import { Badge, Box, Button, Flex, TextArea } from "@radix-ui/themes";
import axios from "axios";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { PostAndRef } from "../../interfaces";
import { ViewerContext } from "../../../_providers/ViewerContext";
import Spinner from "@/app/_components/Spinner";

interface Props {
  setPosts: Dispatch<SetStateAction<PostAndRef[]>>;
}

const NewPost = ({ setPosts }: Props) => {
  const { viewer } = useContext(ViewerContext);
  const [postText, setPostText] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const addPost = async () => {
    setLoading(true);
    const res = await axios
      .post<PostAndRef>("/api/post/add", {
        authorId: viewer?.id,
        text: postText,
      })
      .finally(() => setLoading(false));
    setPosts((prev) => [res.data, ...prev]);
    setPostText("");
  };
  if (viewer)
    return (
      <Flex m="4" gap="4" align="center">
        <Flex width="100%" position="relative">
          <TextArea
            placeholder="What's up?"
            onChange={(e) => setPostText(e.currentTarget.value)}
            rows={3}
            value={postText}
            size="3"
            className="placeholder:font-bold"
          />
          <Box position="absolute" className="right-0 -bottom-6">
            {postText.length > 0 && (
              <Badge color={postText.length > 200 ? "red" : "gray"}>
                {postText.length}/200
              </Badge>
            )}
          </Box>
        </Flex>
        <Button disabled={!postText || loading} onClick={addPost} size="3">
          POST
          {loading && <Spinner />}
        </Button>
      </Flex>
    );
  return null;
};

export default NewPost;
