import { motion } from "framer-motion";
import React from "react";

interface Props {
  children: React.ReactNode;
  clickAnimation: boolean;
}
const ButtonAnimation = ({ children, clickAnimation }: Props) => {
  return (
    <motion.div
      animate={clickAnimation ? { scale: 1.2, y: -6 } : { scale: 1, y: 0 }}
      whileHover={{
        scale: [1.3, 0.8, 1.15, 0.9, 1],
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

export default ButtonAnimation;
