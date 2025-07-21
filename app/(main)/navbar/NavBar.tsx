"use client";
import { Container, Flex } from "@radix-ui/themes";
import Link from "next/link";
import Logo from "../../_components/Logo";
import useTheme from "next-theme";
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
          <Flex
            justify="between"
            className={"text-sm px-6"}
            align="center"
            style={{
              color: theme === "dark" ? undefined : "var(--gray-12)",
            }}
          >
            <Link href="/">
              <Logo size="md" />
            </Link>
            <RightPannel />
          </Flex>
        </Container>
      </nav>
      <div className="h-16 w-full"></div>
    </>
  );
};

export default NavBar;
