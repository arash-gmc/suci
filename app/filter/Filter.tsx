import ButtonGroups from "@/app/_components/ButtonGroup";
import React, { SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { Prisma, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getFilters } from "./defaultFilters";
import AddList from "./AddList";
import { Flex } from "@radix-ui/themes";

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

  const filters = getFilters({
    setWhere,
    user,
  });

  if (status === "unauthenticated") return null;
  if (status === "loading") return null;
  if (!user) return null;

  return (
    <Flex direction="column" gap="3">
      <ButtonGroups options={filters} />
      <AddList />
    </Flex>
  );
};

export default Filter;
