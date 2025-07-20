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
            className={"text-sm " + (theme === "dark" ? "" : "text-gray-800")}
            align="center"
          >
            <Link href="/">
              <Logo size="md" />
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
