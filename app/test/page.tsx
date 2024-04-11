"use client";
import React, { useState } from "react";
import { FaAmazon, FaReact } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Flex } from "@radix-ui/themes";
import { BiLike, BiSolidLike } from "react-icons/bi";
const page = () => {
  const [act, setAct] = useState(false);
  const [liked, setLiked] = useState(false);
  return (
    <Flex align="center" justify="center" height="max-content" mt="9">
      <motion.div
        className="m-5 text-4xl"
        onClick={() => {
          setAct(true);
          setLiked(!liked);
          setTimeout(() => setAct(false), 600);
        }}
        animate={act ? { rotate: -10, scale: 1.1, y: -25 } : undefined}
      >
        {liked ? <BiSolidLike /> : <BiLike />}
      </motion.div>
    </Flex>
  );
};

export default page;
