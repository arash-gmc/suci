"use client";
import { Box, Container, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import ProfilePicture from "../../_components/ProfilePicture";
import Search from "../../_components/Search";
import NotificationsMenu from "../notifications/NotificationMenu";
import { ViewerContext } from "../../_providers/ViewerContext";
import MessageMenu from "../messages/MessageMenue";
import Logo from "../../_components/Logo";
import { signOut } from "next-auth/react";
import UserMenu from "./UserMenu";
import useTheme from "next-theme";
import DarkModeToggler from "@/app/_components/DarkModeToggler";
import RightPannel from "./RightPannel";

const NavBar = () => {
  const { theme } = useTheme();
  return (
    <>
      <nav
        className={
          "p-2 h-16 fixed w-full z-10 px-5 " +
          (theme === "dark" ? "" : "border-b-2 opacity-95")
        }
        style={{
          backgroundColor:
            theme === "dark" ? "var(--accent-8)" : "var(--accent-3)",
        }}
      >
        <Container>
          <Flex justify="between" className={"text-sm "} align="center">
            <Link href="/">
              <Logo size="6" color={theme === "dark" ? "white" : "#333"} />
            </Link>
            <RightPannel />
          </Flex>
        </Container>
      </nav>
      <div className="h-20 w-full"></div>
    </>
  );
};

export default NavBar;
