"use client";
import { Button, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface NewPost {
  text: string;
}

const NewPost = () => {
  const { register, handleSubmit, reset } = useForm<NewPost>();
  const router = useRouter();
  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          axios.post("/api/post", { text: data.text });
          router.refresh();
          reset();
        })}
      >
        <Flex gap="4" mx="2">
          <TextField.Root className="w-full">
            <TextField.Input
              placeholder="Enter your status"
              {...register("text")}
            />
          </TextField.Root>
          <Button>Post</Button>
          <Button
            type="button"
            onClick={async () => {
              await axios.delete("/api/post");
              router.refresh();
            }}
          >
            Delete All
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default NewPost;
