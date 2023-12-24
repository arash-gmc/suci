import React from "react";
import Spinner from "../_components/Spinner";
import { Flex, Text } from "@radix-ui/themes";
import logo from "@/public/next.svg";
import Image from "next/image";

const page = () => {
  return (
    <Flex
      height="9"
      align="end"
      justify="center"
      className="text-red-500 fill-green-500"
    >
      <Image
        src={logo}
        alt="logo"
        height="50"
      />
    </Flex>
  );
};

export default page;
