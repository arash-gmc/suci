"use client";
import { Flex, Switch, Text } from "@radix-ui/themes";
import { IoMoon } from "react-icons/io5";
import useTheme from "next-theme";
import React, { useEffect, useState } from "react";

type Theme = "dark" | "light";
const DarkModeToggler = () => {
  const { setTheme } = useTheme();
  const [storageTheme, setStorageTheme] = useState("");
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) setStorageTheme(theme);
  }, []);
  if (!storageTheme) return null;
  return (
    <Flex gap="2">
      <Text size="5">
        <IoMoon />
      </Text>
      <Switch
        defaultChecked={storageTheme === "dark"}
        color="cyan"
        onCheckedChange={(e) => {
          const isDark = e.valueOf();
          setTheme(isDark ? "dark" : "light");
        }}
      />
    </Flex>
  );
};

export default DarkModeToggler;
