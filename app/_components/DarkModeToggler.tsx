"use client";
import { Flex, Switch, Text } from "@radix-ui/themes";
import { IoMoon } from "react-icons/io5";
import { IoIosSunny } from "react-icons/io";
import useTheme from "next-theme";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Theme = "dark" | "light";
const DarkModeToggler = () => {
  const { setTheme, theme } = useTheme();
  const [storageTheme, setStorageTheme] = useState("");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) setStorageTheme(theme);
  }, []);
  if (!storageTheme) return null;
  return (
    <Flex gap="2">
      <Text size="7">
        <motion.div
          animate={{ rotate: 0 }}
          whileHover={{ rotate: -360, scale: 1.1 }}
          transition={{ type: "tween", duration: 0.5 }}
        >
          <button onClick={toggleTheme}>
            {theme === "light" ? <IoIosSunny /> : <IoMoon />}
          </button>
        </motion.div>
      </Text>
      {/* <Switch
        defaultChecked={storageTheme === "dark"}
        color="cyan"
        onCheckedChange={toggleTheme}
      /> */}
    </Flex>
  );
};

export default DarkModeToggler;
