import { Box, Callout, Flex } from "@radix-ui/themes";
import React, { ReactNode } from "react";

interface Props {
  color: "red" | "green" | "blue";
  icon?: ReactNode;
  message: string;
}

const CalloutComponent = ({ color, icon, message }: Props) => {
  return (
    <Box my="2">
      <Callout.Root color={color}>
        <Callout.Icon>{icon}</Callout.Icon>
        <Callout.Text>{message}</Callout.Text>
      </Callout.Root>
    </Box>
  );
};

export default CalloutComponent;
