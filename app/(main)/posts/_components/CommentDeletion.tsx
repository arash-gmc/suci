"use client";
import { Context } from "@/app/_providers/Context";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

interface Props {
  authorId: string;
  commentId: string;
  deleteComment: () => void;
}

const CommentDeletion = ({ authorId, commentId, deleteComment }: Props) => {
  const { viewer } = useContext(Context);
  const router = useRouter();
  if (!viewer || viewer.id !== authorId) return null;
  const deletePost = async () => {
    await axios.delete("/api/comment/delete", { headers: { commentId } });
    deleteComment();
    router.refresh();
  };
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <button className=" text-red-600 text-sm">Delete</button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{ maxWidth: 450 }}>
        <AlertDialog.Title>Revoke access</AlertDialog.Title>
        <AlertDialog.Description size="2">
          This comment will be deleted. Are you sure?
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

export default CommentDeletion;
