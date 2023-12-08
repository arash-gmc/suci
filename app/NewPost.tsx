"use client";
import { Button, Flex, TextArea } from "@radix-ui/themes";
import axios from "axios";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { PostAndRef } from "./interfaces";
import { Context } from "./_providers/Context";

interface Props {
  setPosts: Dispatch<SetStateAction<PostAndRef[]>>;
}

const NewPost = ({ setPosts }: Props) => {
  const { viewer, status } = useContext(Context);
  const [postText, setPostText] = useState<string>("");
  const addPost = async () => {
    const res = await axios.post<PostAndRef>("/api/post", {
      authorId: viewer?.id,
      text: postText,
    });
    setPosts((prev) => [res.data, ...prev]);
    setPostText("");
  };
  if (status === "authenticated")
    return (
      <Flex
        mx="5"
        mb="5"
        gap="5"
        align="center"
      >
        <TextArea
          placeholder="What's up?"
          onChange={(e) => setPostText(e.currentTarget.value)}
          rows={2}
          className="w-full p-2 placeholder:text-center"
          value={postText}
        />
        <Button
          disabled={!postText}
          onClick={addPost}
          size="3"
        >
          POST
        </Button>
      </Flex>
    );
  return null;
};

export default NewPost;
