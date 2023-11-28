import ButtonGroups from "@/app/_components/ButtonGroup";
import React, { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { Prisma, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import AddList from "./AddList";
import { Flex } from "@radix-ui/themes";
import DefaultFilters from "./DefaultFilters";
import Lists from "./Lists";

interface Props {
  setWhere: (value: SetStateAction<Prisma.PostsWhereInput>) => void;
}

const Filter = ({ setWhere }: Props) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get<User>("/api/user/getOne", { headers: { userId: session.user.id } })
        .then((res) => setUser(res.data));
    }
  }, [status]);

  if (!user) return null;

  return (
    <Flex direction="column" gap="3">
      <DefaultFilters setWhere={setWhere} user={user} />
      <Lists setWhere={setWhere} user={user} />
      <AddList />
    </Flex>
  );
};

export default Filter;
