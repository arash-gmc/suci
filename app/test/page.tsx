import React from "react";
import Spinner from "../_components/Spinner";
import { Flex, Text } from "@radix-ui/themes";

const page = () => {
  return (
    <Flex
      height="9"
      align="end"
      justify="center"
    >
      <Text
        size="9"
        color="blue"
      >
        <Spinner />
      </Text>
    </Flex>
  );
};

export default page;
