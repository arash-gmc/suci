"use client";
import { Context } from "@/app/_providers/Context";
import React, { useContext, useEffect, useState } from "react";
import ListWindow, { FetchedList } from "../../filter/ListWindow";
import axios from "axios";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import DeletionAlert from "@/app/_components/DeletionAlert";
import Spinner from "@/app/_components/Spinner";
import { PlusIcon } from "@radix-ui/react-icons";

const ListsEdition = () => {
  const { viewer } = useContext(Context);

  const [lists, setLists] = useState<FetchedList[] | null>(null);
  useEffect(() => {
    if (viewer)
      axios
        .get<FetchedList[]>("/api/list", { headers: { userId: viewer.id } })
        .then((res) => setLists(res.data));
  }, [viewer]);
  const deleteList = (listId: string) => {
    if (!lists) return;
    axios.delete("/api/list", { headers: { listId } });
    const newLists = lists.filter((list) => list.id !== listId);
    setLists(newLists);
  };
  const updateList = (list: FetchedList) => {
    if (!lists) return;
    const newLists = lists.map((ls) => (ls.id === list.id ? list : ls));
    setLists(newLists);
  };
  const addList = (list: FetchedList) => {
    if (!lists) return;
    const newLists = [...lists, list];
    setLists(newLists);
  };
  if (!viewer) return null;
  if (!lists)
    return (
      <Flex
        mt="5"
        justify="center"
      >
        <Spinner />
      </Flex>
    );

  return (
    <Flex
      direction="column"
      mx="4"
      align="start"
      className="text-lg"
      mt="6"
      gap="3"
    >
      <Heading mb="4">Lists Editation</Heading>
      {lists.length === 0 ? (
        <Flex
          className="sm:text-xl"
          justify="center"
          my="5"
        >
          You have no list yet. Use the bellow button to create one.
        </Flex>
      ) : (
        <>
          {lists.map((list) => (
            <Flex
              gap="3"
              key={list.id}
              align="end"
            >
              <Text size={{ initial: "6", sm: "7" }}>{list.name}</Text>
              <ListWindow
                initialName={list.name}
                stringMembers={list.members}
                listId={list.id}
                postAction={(list) => updateList(list)}
                trigger={
                  <button className="font-bold text-blue-600">Edit</button>
                }
              />
              <DeletionAlert
                label={list.name + " list"}
                action={() => deleteList(list.id)}
                trigger={
                  <button className="font-bold text-red-600">Delete</button>
                }
              />
            </Flex>
          ))}
        </>
      )}
      <ListWindow
        postAction={(list) => addList(list)}
        trigger={
          <Button mt="5">
            <PlusIcon /> Add New List
          </Button>
        }
      />
    </Flex>
  );
};

export default ListsEdition;
