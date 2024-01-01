"use client";
import { Context } from "@/app/_providers/Context";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import React, { useContext } from "react";

const DeletionAlert = ({ authorId }: { authorId: string }) => {
  const { viewer } = useContext(Context);
  if (!viewer || viewer.id !== authorId) return null;
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <button>Delete</button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Revoke access</AlertDialog.Title>
        <AlertDialog.Description size="2">
          This post will be deleted. Are you sure?
        </AlertDialog.Description>

        <Flex
          gap="3"
          mt="4"
          justify="end"
        >
          <AlertDialog.Cancel>
            <Button
              variant="soft"
              color="gray"
            >
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button
              variant="solid"
              color="red"
            >
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeletionAlert;
