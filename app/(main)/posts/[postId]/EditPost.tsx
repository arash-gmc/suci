"use client";
import ProfilePicture from "@/app/_components/ProfilePicture";
import { Context } from "@/app/_providers/Context";
import { Popover, Flex, Box, TextArea, Button } from "@radix-ui/themes";
import React, { useContext, useEffect, useState } from "react";
import { FaRegComment } from "react-icons/fa6";

interface Props {
  initialText: string | null;
  authorId: string;
}

const EditPost = ({ authorId, initialText }: Props) => {
  const { viewer } = useContext(Context);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    if (initialText) setEditedText(initialText);
  }, [initialText]);
  const applyEdit = () => {};
  if (!viewer || viewer.id !== authorId) return null;
  return (
    <Popover.Root>
      <Popover.Trigger>
        <button>Edit</button>
      </Popover.Trigger>
      <Popover.Content style={{ width: 360 }}>
        <Flex gap="3">
          <Flex align="start">
            <ProfilePicture
              user={viewer}
              size="sm"
            />
          </Flex>
          <Box grow="1">
            <TextArea
              placeholder="Post Text..."
              style={{ height: 80 }}
              value={editedText}
              onChange={(e) => setEditedText(e.currentTarget.value)}
            />
            <Flex
              gap="3"
              mt="3"
              justify="between"
            >
              <Popover.Close>
                <Button
                  size="1"
                  variant="outline"
                >
                  Cancel
                </Button>
              </Popover.Close>
              <Popover.Close>
                <Button
                  size="1"
                  onClick={() => applyEdit()}
                  disabled={!editedText}
                  variant="outline"
                >
                  Save
                </Button>
              </Popover.Close>
            </Flex>
          </Box>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default EditPost;
