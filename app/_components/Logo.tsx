import React from "react";
import { Text, Flex } from "@radix-ui/themes";
import { TbFishChristianity } from "react-icons/tb";
import SiteLogo from '../../assets/logo.svg';
import { motion } from "framer-motion";
import useTheme from "next-theme";


interface Props {
  size: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  color?: string;
}

const Logo = ({ size, color }: Props) => {
  const { theme } = useTheme();
  return (
    <Text size={size} className="font-bold">
      <Flex align="end" style={{color:color || "var(--accent-9)" }}>
        <motion.div
          whileHover={{ x: -16 }}
          transition={{ type: "tween", duration: 0.5 }}
          
        >
          

          <SiteLogo height={40} width={40} />
        </motion.div>
          
        <Text>EchoFeed</Text>
      </Flex>
    </Text>
  );
};

export default Logo;
