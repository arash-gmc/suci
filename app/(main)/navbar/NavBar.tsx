"use client";
import { Container, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import ProfilePicture from "../../_components/ProfilePicture";
import Search from "../../_components/Search";
import NotificationsMenu from "../notifications/NotificationMenu";
import { Context } from "../../_providers/Context";
import MessageMenu from "../messages/MessageMenue";
import Logo from "../../_components/Logo";
import { signOut } from "next-auth/react";
import UserMenu from "./UserMenu";
import useTheme from "next-theme";
import DarkModeToggler from "@/app/_components/DarkModeToggler";

const NavBar = () => {
  const { viewer } = useContext(Context);
  const [userMenu, setUserMenu] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  return (
    <>
      <nav
        className={
          "p-2 h-14 fixed w-full z-10 px-5 " +
          (theme === "dark" ? "" : "border-b-2 bg-slate-100 opacity-95")
        }
        style={
          theme === "dark" ? { backgroundColor: "var(--accent-8)" } : undefined
        }
      >
        <Container>
          <Flex
            justify="between"
            className={"text-sm " + (theme === "light" ? "text-gray-700" : "")}
            align="center"
          >
            <Link href="/">
              <Logo size="6" />
            </Link>

            <Flex gap="5" align="center">
              {viewer && (
                <>
                  <MessageMenu userId={viewer.id} />
                  <NotificationsMenu userId={viewer.id} />

                  <Search
                    onUserClick={(user) =>
                      router.push("/profile/" + user.username)
                    }
                    searchPosts={true}
                  />

                  <Flex
                    onClick={() => setUserMenu((prev) => !prev)}
                    className="relative cursor-pointer"
                  >
                    <ProfilePicture size="sm" user={viewer} />

                    {userMenu ? <UserMenu /> : null}
                  </Flex>
                </>
              )}
              {viewer === null && (
                <Flex align="center" gap="5">
                  <Search
                    onUserClick={(user) =>
                      router.push("/profile/" + user.username)
                    }
                    searchPosts={true}
                  />
                  <Link href="/api/auth/signin">LogIn</Link>
                  <Link href="/register">Register</Link>
                </Flex>
              )}
              <DarkModeToggler />
            </Flex>
          </Flex>
        </Container>
      </nav>
      <div className="h-20 w-full"></div>
    </>
  );
};

export default NavBar;
