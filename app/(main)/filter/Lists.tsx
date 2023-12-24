import { Prisma, User } from "@prisma/client";
import axios from "axios";
import React, { SetStateAction, useEffect, useState } from "react";
import { ButtonGroupProps } from "../interfaces";
import ButtonGroups from "../../_components/ButtonGroup";

interface Props {
  setWhere: (value: SetStateAction<Prisma.PostsWhereInput>) => void;
  user: User | null;
}

interface List {
  id: string;
  name: string;
  members: string[];
}

const Lists = ({ setWhere, user }: Props) => {
  const [fetchedLists, setFetchedLists] = useState<List[]>([]);
  useEffect(() => {
    if (user) {
      axios
        .get<List[]>("/api/list", { headers: { userId: user?.id } })
        .then((res) => setFetchedLists(res.data));
    }
  }, [user]);

  if (fetchedLists.length === 0) return null;

  const listButtons: ButtonGroupProps[] = fetchedLists.map((list) => ({
    label: list.name,
    value: "list-" + list.id,
    onClick: () => setWhere({ authorId: { in: list.members } }),
  }));

  return <ButtonGroups options={listButtons} />;
};

export default Lists;
