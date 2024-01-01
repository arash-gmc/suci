"use client";
import React from "react";
import UserInformations from "./UserInformations";
import { Tabs, Box, Text, Container } from "@radix-ui/themes";
import ResetPassword from "./ResetPassword";
import DeleteAccount from "./DeleteAccount";
import ChangePicture from "./ChangePicture";

const page = () => {
  return (
    <Container>
      <Tabs.Root defaultValue="userInfo">
        <Tabs.List>
          <Tabs.Trigger value="userInfo">Informations</Tabs.Trigger>

          <Tabs.Trigger value="password">Password</Tabs.Trigger>
          <Tabs.Trigger value="delete">Delete Account</Tabs.Trigger>
        </Tabs.List>

        <Box
          px="4"
          pt="3"
          pb="2"
        >
          <Tabs.Content value="userInfo">
            <UserInformations />
          </Tabs.Content>

          <Tabs.Content value="password">
            <ResetPassword />
          </Tabs.Content>

          <Tabs.Content value="delete">
            <DeleteAccount />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Container>
  );
};

export default page;
