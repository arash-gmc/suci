"use client";
import { User } from "@prisma/client";
import { Dialog, Button, Flex, Popover } from "@radix-ui/themes";
import React from "react";
import UsersField from "./UsersField";
import { useRouter } from "next/navigation";

interface Props {
  label: string;
  title?: string;
  users: User[];
}

const UserFieldPopover = ({ label, title, users }: Props) => {
  const router = useRouter();
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <button>{label}</button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 550 }}>
        <Dialog.Title>{title}</Dialog.Title>

        <UsersField
          users={users}
          onUserClick={(user) => router.push("/profile/" + user.username)}
        />
        <Flex
          width="100%"
          justify="end"
          mt="4"
        >
          <Dialog.Close>
            <Button>Close</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UserFieldPopover;
