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

const NavBar = () => {
  const { viewer } = useContext(Context);
  const [userMenu, setUserMenu] = useState(false);
  const router = useRouter();
  return (
    <>
      <nav className="border-b-2 p-2 h-16 fixed w-full z-10 opacity-95 bg-slate-100 px-5 ">
        <Container>
          <Flex
            justify="between"
            className="text-sm text-gray-700"
            align="center"
          >
            <Link href="/">
              <Logo size="6" />
            </Link>

            <Flex
              gap="5"
              align="center"
            >
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
                    <ProfilePicture
                      size="sm"
                      user={viewer}
                    />
                    <Flex
                      direction="column"
                      display={userMenu ? "flex" : "none"}
                      p="2"
                      className="absolute top-12 -left-40 w-48 bg-slate-50 rounded-md text-md min-w-max font-bold"
                    >
                      <Flex
                        direction="column"
                        className="border-b-2 py-2"
                      >
                        <Text>{viewer.name}</Text>
                        <Text
                          size="2"
                          color="gray"
                          className="font-normal"
                        >
                          @{viewer.username}
                        </Text>
                      </Flex>
                      <Link
                        className="border-b-2 py-2"
                        href={"/profile/" + viewer.username}
                      >
                        Profile
                      </Link>
                      <Link
                        className="border-b-2 py-2"
                        href="/posts/bookmarks"
                      >
                        Bookmarks
                      </Link>
                      <button
                        className="text-left py-2"
                        onClick={() => signOut()}
                      >
                        Sign Out
                      </button>
                    </Flex>
                  </Flex>
                </>
              )}
              {viewer === null && (
                <Flex
                  align="center"
                  gap="5"
                >
                  <Search
                    onUserClick={(user) =>
                      router.push("/profile/" + user.username)
                    }
                    searchPosts={true}
                  />
                  <Link href="/api/auth/signin">SignIn</Link>
                  <Link href="/register">Register</Link>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Container>
      </nav>
      <div className="h-20 w-full"></div>
    </>
  );
};

export default NavBar;
