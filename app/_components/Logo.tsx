import React from "react";
import { Text, Flex } from "@radix-ui/themes";
import { TbFishChristianity } from "react-icons/tb";
import { motion } from "framer-motion";
import useTheme from "next-theme";

const Logo = ({
  size,
}: {
  size: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
}) => {
  const { theme } = useTheme();
  return (
    <Text size={size} className="font-bold">
      <Flex align="center">
        <motion.div
          whileHover={{ x: -16 }}
          transition={{ type: "tween", duration: 0.5 }}
          style={{ color: "var(--accent-9)" }}
        >
          <TbFishChristianity />
        </motion.div>
        <Text>Suci</Text>
      </Flex>
    </Text>
  );
};

export default Logo;
