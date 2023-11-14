"use client";
import { TextField } from "@radix-ui/themes";
import React from "react";

const NewPost = () => {
  return (
    <>
      <form>
        <TextField.Root>
          <TextField.Input placeholder="Enter your status" />
        </TextField.Root>
      </form>
    </>
  );
};

export default NewPost;
