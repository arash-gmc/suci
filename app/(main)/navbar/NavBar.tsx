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

const NavBar = () => {
  const { viewer } = useContext(ViewerContext);
  const [userMenu, setUserMenu] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  return (
    <>
      <nav
        className={
          "p-2 h-14 fixed w-full z-10 px-5 " +
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
              <Logo size="6" color={theme === "dark" ? "white" : undefined} />
            </Link>

            {viewer && (
              <Flex
                gap="5"
                align="center"
                style={
                  theme === "light" ? { color: "var(--accent-11)" } : undefined
                }
              >
                <Search
                  onUserClick={(user) =>
                    router.push("/profile/" + user.username)
                  }
                  searchPosts={true}
                />

                <NotificationsMenu userId={viewer.id} />
                <MessageMenu userId={viewer.id} />

                <Flex
                  onClick={() => setUserMenu((prev) => !prev)}
                  className="relative cursor-pointer"
                >
                  <ProfilePicture size="sm" user={viewer} />

                  {userMenu ? <UserMenu /> : null}
                </Flex>
              </Flex>
            )}
            {viewer === null && (
              <Flex align="center" gap="5">
                <Search
                  onUserClick={(user) =>
                    router.push("/profile/" + user.username)
                  }
                  searchPosts={true}
                />

                <Link href="/api/auth/signin" className="font-bold">
                  LogIn
                </Link>
                <Link href="/register" className="font-bold">
                  Register
                </Link>
              </Flex>
            )}
            <Box
              style={
                theme === "light" ? { color: "var(--accent-11)" } : undefined
              }
            >
              <DarkModeToggler />
            </Box>
          </Flex>
        </Container>
      </nav>
      <div className="h-20 w-full"></div>
    </>
  );
};

export default NavBar;
