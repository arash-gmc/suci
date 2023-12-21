import { PlusIcon } from "@radix-ui/react-icons";
import { Dialog, Button, Flex, TextField, Text } from "@radix-ui/themes";
import React, { useContext, useRef, useState } from "react";
import UsersField from "../_components/UsersField";
import { User } from "@prisma/client";
import axios from "axios";
import { Context } from "../_providers/Context";
import Search from "../_components/Search";

export interface FetchedList {
  id: string;
  name: string;
  members: string[];
}

interface Props {
  add: (list: FetchedList) => void;
}

const AddList = ({ add }: Props) => {
  const [members, setMembers] = useState<User[]>([]);
  const [listName, setListName] = useState<string>("");
  const { viewer } = useContext(Context);

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

          <Text
            as="div"
            size="2"
            mb="1"
            weight="bold"
          >
            List Members
          </Text>

          <Search
            onUserClick={(user) => setMembers((prev) => [...prev, user])}
            hiddenUsersId={members.map((user) => user.id)}
          />
          <UsersField
            users={members}
            onUserClick={(user) =>
              setMembers((prev) =>
                prev.filter((member) => member.id !== user.id)
              )
            }
          />
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
                const res = await axios.post<FetchedList>("/api/list", {
                  name: listName,
                  ownerId: viewer?.id,
                  members: members.map((m) => m.id),
                });
                add(res.data);
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
