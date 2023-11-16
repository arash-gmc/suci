import { getServerSession } from "next-auth";
import React from "react";
import { nextauthConfig } from "./api/auth/[...nextauth]/route";
import { Container, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";

const NavBar = async () => {
  const session = await getServerSession(nextauthConfig);

  return (
    <nav className="border-b-2 mb-5 p-2">
      <Container>
        <Flex justify="between" className="text-sm text-gray-700">
          <Flex>
            <Link href="/">Home</Link>
          </Flex>
          {session && (
            <Flex gap="5">
              <Text>{session?.user?.name}</Text>
              <Link href="/api/auth/signout">Sign Out</Link>
            </Flex>
          )}
          {!session && (
            <Flex gap="5">
              <Link href="/api/auth/signin">SignIn</Link>
              <Link href="/register">Register</Link>
            </Flex>
          )}
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
