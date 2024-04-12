"use client";
import Logo from "@/app/_components/Logo";
import Spinner from "@/app/_components/Spinner";
import { Button, Flex, Grid, TextField, Text } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useRef, useState } from "react";

interface Props {
  searchParams: { error: string };
}

const LoginForm = ({ searchParams }: Props) => {
  const testUser = true;
  const [email, setEmail] = useState(testUser ? "test" : "");
  const [password, setPassword] = useState(testUser ? "123456" : "");
  const [loading, setLoading] = useState(false);

  const logIn = () => {
    setLoading(true);
    signIn("credentials", {
      email,
      password,
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <Flex
      direction="column"
      align="center"
      gap={{ initial: "5", sm: "7" }}
      className="w-full"
      mt="6"
    >
      <Logo size="8" />
      <Flex direction="column" gap="5" className="w-full" mt="5">
        <TextField.Input
          id="username"
          placeholder="Username or Email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
        />

        <TextField.Input
          id="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <Flex className="text-red-600 text-sm" justify="center">
          {!!searchParams.error && (
            <Text>Can not login with these inputs.</Text>
          )}
        </Flex>
      </Flex>

      <Button size="3" type="button" disabled={loading} onClick={() => logIn()}>
        Login
        {loading && <Spinner />}
      </Button>

      <Text align="center" className="pt-10">
        Don&#39;t have an account?{" "}
        <Link href="/register" style={{ color: "var(--accent-9)" }}>
          Signup
        </Link>
      </Text>
      <Text align="center">
        Or back to{" "}
        <Link href="/" style={{ color: "var(--accent-9)" }}>
          home
        </Link>{" "}
        without login
      </Text>
    </Flex>
  );
};

export default LoginForm;
