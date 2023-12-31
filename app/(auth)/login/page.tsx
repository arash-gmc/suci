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
  const EmailRef = useRef<HTMLInputElement>(null);
  const PasswordRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const logIn = () => {
    setLoading(true);
    signIn("credentials", {
      email: EmailRef.current?.value,
      password: PasswordRef.current?.value,
      redirect: true,
      callbackUrl: "/",
    });
  };
  return (
    <Flex
      direction="column"
      align="center"
      gap="7"
      className="w-full"
    >
      <Logo size="8" />
      <Flex
        direction="column"
        gap="5"
        className="w-full"
      >
        <TextField.Input
          id="username"
          placeholder="Username or Email"
          ref={EmailRef}
        />

        <TextField.Input
          id="Password"
          type="password"
          placeholder="Password"
          ref={PasswordRef}
        />
        <Flex
          className="text-red-600 text-sm"
          justify="center"
        >
          {!!searchParams.error && (
            <Text>Can not login with these inputs.</Text>
          )}
        </Flex>
      </Flex>
      <Grid
        columns="2"
        gap="2"
        px="2"
      >
        <Button
          size="3"
          type="button"
          disabled={loading}
          onClick={() => logIn()}
          style={{ backgroundColor: "var(--accent-9)" }}
        >
          Login
          {loading && <Spinner />}
        </Button>
        <Link href="/">
          <Button
            size="3"
            type="button"
            style={{ backgroundColor: "var(--accent-9)" }}
          >
            Continue as Guest
          </Button>
        </Link>
      </Grid>
      <Flex
        align="center"
        gap="2"
      >
        Don&#39;t have an account?
        <Link href="/register">
          <Button
            size="2"
            variant="ghost"
            type="button"
          >
            Signup
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default LoginForm;
