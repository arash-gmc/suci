import { PlusIcon } from "@radix-ui/react-icons";
import { Dialog, Button, Flex, TextField, Text } from "@radix-ui/themes";
import React, { useContext, useRef, useState } from "react";
import Search from "./Search";
import UsersField from "./UsersField";
import { User } from "@prisma/client";
import axios from "axios";
import { Context } from "../_providers/Context";

const AddList = () => {
  const [members, setMembers] = useState<User[]>([]);
  const [listName, setListName] = useState<string>("");
  const { viewer } = useContext(Context);
  const addMember = (user: User) => {
    setMembers((prev) => [...prev, user]);
  };

  if (!viewer) return null;
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
        <Dialog.Description
          size="2"
          mb="4"
        >
          Use The Searchbar to add new peoples to your list
        </Dialog.Description>

        <Flex
          direction="column"
          gap="3"
        >
          <label>
            <Text
              as="div"
              size="2"
              mb="1"
              weight="bold"
            >
              List Name
            </Text>
            <TextField.Input
              placeholder="Enter your List Name"
              onChange={(e) => setListName(e.currentTarget.value)}
            />
          </label>
          <label>
            <Text
              as="div"
              size="2"
              mb="1"
              weight="bold"
            >
              List Members
            </Text>
            <Search
              addUser={addMember}
              listUsers={members}
            />
            <UsersField users={members} />
          </label>
        </Flex>

        <Flex
          gap="3"
          mt="4"
          justify="end"
        >
          <Dialog.Close>
            <Button
              variant="soft"
              color="gray"
              onClick={() => setMembers([])}
            >
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              disabled={members.length === 0 || !listName}
              onClick={async () => {
                await axios.post("/api/list", {
                  name: listName,
                  ownerId: viewer?.id,
                  members: members.map((m) => m.id),
                });
                setMembers([]);
              }}
            >
              Save
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddList;
