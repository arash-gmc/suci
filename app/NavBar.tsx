"use client";
import { Container, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
  const { data: session, status } = useSession();

  return (
    <nav className="border-b-2 mb-5 p-2">
      <Container>
        <Flex justify="between" className="text-sm text-gray-700">
          <Flex>
            <Link href="/">Home</Link>
          </Flex>
          {status === "authenticated" && (
            <Flex gap="5">
              <Link href={"/profile/" + session.user.id}>
                {session?.user?.name}
              </Link>
              <Link href="/api/auth/signout">Sign Out</Link>
            </Flex>
          )}
          {status === "unauthenticated" && (
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
