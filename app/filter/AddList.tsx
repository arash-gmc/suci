import { PlusIcon } from "@radix-ui/react-icons";
import { Dialog, Button, Flex, TextField, Text } from "@radix-ui/themes";
import React, { useState } from "react";
import Search from "./Search";
import UsersField from "./UsersField";
import { User } from "@prisma/client";

const AddList = () => {
  const [members, setMembers] = useState<User[]>([]);
  const addMember = (user: User) => {
    setMembers((prev) => [...prev, user]);
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>
          <PlusIcon />
          Add List
        </Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 550, minHeight: 600 }}>
        <Dialog.Title>Create a New List</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Use The Searchbar to add new peoples to your list
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              List Name
            </Text>
            <TextField.Input placeholder="Enter your List Name" />
          </label>
          <label>
            <Text>List Members</Text>
            <Search addUser={addMember} listUsers={members} />
            <UsersField users={members} />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={() => setMembers([])}>
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddList;
