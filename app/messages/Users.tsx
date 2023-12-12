import { User } from "@prisma/client";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../_providers/Context";
import { Flex, Text } from "@radix-ui/themes";
import ProfilePicture from "../_components/ProfilePicture";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  selectedUserId: string | null;
}
const Users = ({ setUser, selectedUserId }: Props) => {
  const [users, setUsers] = useState<User[]>([]);
  const { viewer } = useContext(Context);
  useEffect(() => {
    if (viewer?.id)
      axios
        .get<User[]>("/api/message/users", { headers: { userId: viewer?.id } })
        .then((res) => setUsers(res.data));
  }, [viewer]);

  return (
    <Flex
      direction="column"
      className="w-full"
    >
      {users.map((user) => (
        <Flex
          key={user.id}
          gap="2"
          py="2"
          align="center"
          className={
            (user.id === selectedUserId ? "bg-sky-200 " : "") +
            "border-b-2 cursor-pointer px-3 mx-1 "
          }
          onClick={() => setUser(user.id)}
        >
          <ProfilePicture
            size="md"
            user={user}
          />
          <Text>{user.name}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default Users;
