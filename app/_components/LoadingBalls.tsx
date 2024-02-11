import React from "react";
import Image from "next/image";
import balls from "@/public/balls.svg";
import { Flex } from "@radix-ui/themes";

const LoadingBalls = () => {
  return (
    <Flex justify="center">
      <Image src={balls} height={100} alt="loading" />
    </Flex>
  );
};

export default LoadingBalls;
