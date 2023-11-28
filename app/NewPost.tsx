"use client";
import { Button, Container, Flex, TextArea, TextField } from "@radix-ui/themes";
import axios from "axios";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { PostsWithUsers } from "./interfaces";

interface Props {
  setPosts: Dispatch<SetStateAction<PostsWithUsers[]>>;
}

const NewPost = ({ setPosts }: Props) => {
  const { data: session, status } = useSession();
  const [postText, setPostText] = useState<string>("");
  const addPost = async () => {
    const res = await axios.post<PostsWithUsers>("/api/post", {
      authorId: session?.user.id,
      text: postText,
    });
    setPosts((prev) => [res.data, ...prev]);
    setPostText("");
  };
  if (status === "authenticated")
    return (
      <Flex mx="5" mb="5" gap="5" align="center">
        <TextArea
          placeholder="What's up?"
          onChange={(e) => setPostText(e.currentTarget.value)}
          rows={2}
          className="w-full p-2 placeholder:text-center"
          value={postText}
        />
        <Button disabled={!postText} onClick={addPost} size="3">
          POST
        </Button>
      </Flex>
    );
  return null;
};

export default NewPost;
