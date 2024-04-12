import React from "react";
import { Text, Flex } from "@radix-ui/themes";
import { TbFishChristianity } from "react-icons/tb";
import { motion } from "framer-motion";

const Logo = ({
  size,
}: {
  size: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
}) => {
  return (
    <Text size={size} className="font-bold">
      <Flex align="center">
        <motion.div
          whileHover={{ x: -16 }}
          transition={{ type: "tween", duration: 0.5 }}
        >
          <TbFishChristianity />
        </motion.div>
        Suci
      </Flex>
    </Text>
  );
};

export default Logo;
