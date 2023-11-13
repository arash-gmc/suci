"use client";
import { TextField } from "@radix-ui/themes";
import React from "react";

const NewPost = () => {
  return (
    <>
      <TextField.Root>
        <TextField.Input placeholder="Enter your status"></TextField.Input>
      </TextField.Root>
    </>
  );
};

export default NewPost;
