import { Dialog, Button, Flex, TextField, Text } from "@radix-ui/themes";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import UsersField from "../../_components/UsersField";
import { User } from "@prisma/client";
import axios from "axios";
import { Context } from "../../_providers/Context";
import Search from "../../_components/Search";

export interface FetchedList {
  id: string;
  name: string;
  members: string[];
}

interface Props {
  trigger: ReactNode;
  postAction: (list: FetchedList) => void;
  initialName?: string;
  stringMembers?: string[];
  listId?: string;
}

const ListWindow = ({
  trigger,
  postAction,
  stringMembers,
  initialName,
  listId,
}: Props) => {
  const [members, setMembers] = useState<User[]>([]);
  const [listName, setListName] = useState<string>(initialName || "");
  const { viewer } = useContext(Context);

  const addOrUpdate = async () => {
    if (listId) {
      const res = await axios.patch<FetchedList>("/api/list", {
        id: listId,
        name: listName,
        members: members.map((m) => m.id),
      });
      postAction(res.data);
    } else {
      const res = await axios.post<FetchedList>("/api/list", {
        name: listName,
        ownerId: viewer?.id,
        members: members.map((m) => m.id),
      });
      postAction(res.data);
      setMembers([]);
    }
  };

  useEffect(() => {
    if (stringMembers)
      axios
        .post<User[]>("/api/user/getSome", { userIds: stringMembers })
        .then((res) => setMembers(res.data));
  }, [stringMembers]);

  if (!viewer) return null;
  return (
    <Dialog.Root>
      <Dialog.Trigger>{trigger}</Dialog.Trigger>

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
              value={listName}
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
              onClick={() => (listId ? null : setMembers([]))}
            >
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button
              disabled={members.length === 0 || !listName}
              onClick={addOrUpdate}
            >
              Save
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ListWindow;
