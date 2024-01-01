"use client";
import { Context } from "@/app/_providers/Context";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

interface Props {
  authorId: string;
  postId: string;
}

const DeletionAlert = ({ authorId, postId }: Props) => {
  const { viewer } = useContext(Context);
  const router = useRouter();
  if (!viewer || viewer.id !== authorId) return null;
  const deletePost = async () => {
    await axios.delete("/api/post/delete", { headers: { postId } });
    router.back();
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <button className="font-bold text-red-600">Delete</button>
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
              onClick={() => deletePost()}
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
