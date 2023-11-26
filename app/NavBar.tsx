"use client";
import { Container, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { userAgent } from "next/server";
import Search from "./_components/Search";

const NavBar = () => {
  const { data: session, status } = useSession();

  const AuthLinks = () => {
    if (status === "authenticated")
      return (
        <>
          <Link href={"/profile/" + session.user.id}>
            {session?.user?.name}
          </Link>
          <Link href="/api/auth/signout">Sign Out</Link>
        </>
      );
    if (status === "unauthenticated")
      return (
        <>
          <Link href="/api/auth/signin">SignIn</Link>
          <Link href="/register">Register</Link>
        </>
      );
    if (status === "loading") return <></>;
  };

  return (
    <nav className="border-b-2 mb-5 p-2">
      <Container>
        <Flex justify="between" className="text-sm text-gray-700">
          <Flex>
            <Link href="/">Home</Link>
          </Flex>
          <Flex gap="5" align="center">
            <Search />
            <AuthLinks />
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
