"use client";
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import {
  Popover,
  Button,
  Flex,
  Avatar,
  Box,
  TextArea,
  Checkbox,
  Text,
} from "@radix-ui/themes";
import React, { useContext } from "react";
import { FaRegComment } from "react-icons/fa6";
import ProfilePicture from "./ProfilePicture";
import { Context } from "../_providers/Context";

const AddComment = () => {
  const { viewer } = useContext(Context);
  if (!viewer) return null;
  return (
    <Popover.Root>
      <Popover.Trigger>
        <button>
          <FaRegComment />
        </button>
      </Popover.Trigger>
      <Popover.Content style={{ width: 360 }}>
        <Flex gap="3">
          <Flex>
            <ProfilePicture
              user={viewer}
              size="sm"
            />
          </Flex>
          <Box grow="1">
            <TextArea
              placeholder="Write a comment…"
              style={{ height: 80 }}
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
                <Button size="1">Send Comment</Button>
              </Popover.Close>
            </Flex>
          </Box>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default AddComment;
