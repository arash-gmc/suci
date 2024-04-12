"use client";
import React, { PropsWithChildren } from "react";
import MiniNavbar from "./navbar/MiniNavbar";
import NavBar from "./navbar/NavBar";
import { Box } from "@radix-ui/themes";
import useTheme from "next-theme";

const Main = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Box display={{ initial: "none", sm: "block" }}>
        <NavBar />
      </Box>
      <Box display={{ initial: "block", sm: "none" }}>
        <MiniNavbar />
      </Box>
      <div className="apply-fonts">{children}</div>
    </>
  );
};

export default Main;
