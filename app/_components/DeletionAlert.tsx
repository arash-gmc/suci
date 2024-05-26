"use client";
import { ViewerContext } from "@/app/_providers/ViewerContext";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { ReactNode, useContext } from "react";

interface Props {
  label: string;
  trigger: ReactNode;
  action: () => void;
}

const DeletionAlert = ({ trigger, action, label }: Props) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>{trigger}</AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Revoke access</AlertDialog.Title>
        <AlertDialog.Description size="2">
          You are about to remove {label}. Are you sure?
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" onClick={() => action()}>
              Delete
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeletionAlert;
