"use client";
import DeletionAlert from "@/app/_components/DeletionAlert";
import Spinner from "@/app/_components/Spinner";
import { Context } from "@/app/_providers/Context";
import { Flex, Button, Box, Heading, Text, Checkbox } from "@radix-ui/themes";
import axios from "axios";
import router from "next/router";
import React, { useContext, useRef, useState } from "react";

const DeleteAccount = () => {
  const { viewer } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const deleteAction = () => {
    if (viewer) {
      setLoading(true);
      axios
        .delete("/api/user/delete", {
          headers: { userId: viewer.id },
        })
        .then((res) => router.push("/login"))
        .finally(() => setLoading(false));
    }
  };
  if (!viewer) return null;
  return (
    <Box>
      <Heading my="3">Deleting Account</Heading>
      <Text
        color="red"
        className="font-bold"
        as="p"
      >
        Caution!
      </Text>
      <Text as="p">
        You are about to delete your account. This action is not reversible.
      </Text>
      <Text
        as="label"
        size="2"
      >
        <Flex
          gap="2"
          my="2"
        >
          <Checkbox onCheckedChange={() => setChecked((prev) => !prev)} /> I
          understand, But i want to delete my account.
        </Flex>
      </Text>

      <DeletionAlert
        trigger={
          <Button
            color="red"
            my="4"
            disabled={loading || !checked}
          >
            Delete Account
            {loading && <Spinner />}
          </Button>
        }
        action={deleteAction}
        label="your profile"
      />
    </Box>
  );
};

export default DeleteAccount;
