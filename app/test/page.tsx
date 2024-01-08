"use client";
import { Box, Flex } from "@radix-ui/themes";
import React, { useState } from "react";
import { BiLike } from "react-icons/bi";

const page = () => {
  const [click, setClick] = useState(false);
  return (
    <Flex m="6" py="7" justify="center" className="text-2xl">
      <button
        className={"btn " + (click ? "click" : "")}
        onClick={() => {
          setClick(true);
          setTimeout(() => setClick(false), 2000);
        }}
      >
        <BiLike />
      </button>
    </Flex>
  );
};

export default page;
