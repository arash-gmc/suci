"use client";
import { Box, Button, Dialog, Flex } from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import Logo from "../_components/Logo";
import { ViewerContext } from "../_providers/ViewerContext";
import Link from "next/link";

const GuestWelcome = () => {
  const { viewer } = useContext(ViewerContext);
  const [showWindow, setShowWindow] = useState(false);
  useEffect(() => {
    const visitTimes = Number(localStorage.getItem("visitTimes")) || 0;
    if (visitTimes % 5 === 0)
      setTimeout(() => {
        setShowWindow(true);
      }, 3000);
    localStorage.setItem("visitTimes", visitTimes + 1 + "");
  }, []);
  if (viewer === null)
    return (
      <Dialog.Root open={showWindow}>
        <Dialog.Content>
          <Flex
            gap="5"
            px={{ initial: "1", sm: "3" }}
            py={{ initial: "3", sm: "6" }}
            direction="column"
          >
            <Flex justify="center" display={{ initial: "none", sm: "flex" }}>
              <div className="border-2  rounded-full p-5 w-36 h-36">
                <Flex height="100%" align="center">
                  <Logo size="7" />
                </Flex>
              </div>
            </Flex>

            <Flex className="text-lg" gap="5" direction="column">
              <p>
                Welcome to Suci, A greate social media Platform for Sharing your
                Thoughts.
              </p>
              <p>To use this website properly, please login.</p>
              <Flex direction="column" align="center" gap="2">
                <Flex gap="3" justify="center">
                  <Link href="api/auth/signin">
                    <Button size="3">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button size="3">Register</Button>
                  </Link>
                </Flex>
                Or
                <Flex>
                  <Button size="3" onClick={() => setShowWindow(false)}>
                    Continue as a guest
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    );
  return null;
};

export default GuestWelcome;
