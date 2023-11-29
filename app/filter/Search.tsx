"use client";
import { User } from "@prisma/client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, TextField, Text, Flex } from "@radix-ui/themes";
import axios from "axios";
import React, { useRef, useState } from "react";
import ProfilePicture from "../_components/ProfilePicture";

interface Props {
  addUser: (user: User) => void;
  listUsers: User[];
}

const Search = ({ addUser, listUsers }: Props) => {
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.currentTarget.value;
    if (searchText) {
      axios
        .get<User[]>("/api/user/search", {
          headers: { searchText },
        })
        .then((res): void => {
          const fetchedUsers = res.data;
          const filteredUsers = fetchedUsers.filter((fetchedUser) => {
            let pass = true;
            listUsers.forEach((listUser) => {
              if (fetchedUser.id === listUser.id) pass = false;
            });
            return pass;
          });

          setSearchedUsers(filteredUsers);
        });
    } else {
      setSearchedUsers([]);
    }
  };
  const searched = searchRef.current?.value;
  return (
    <Box className="relative">
      <TextField.Root>
        <TextField.Input
          placeholder="Search Users"
          onChange={onSearch}
          ref={searchRef}
        />
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
      {searched && (
        <Flex className="absolute bg-white w-full z-10" direction="column">
          {searchedUsers.map((user) => (
            <Flex
              key={user.id}
              gap="2"
              align="center"
              className="border-b-2 py-3 cursor-pointer"
              onClick={() => {
                addUser(user);
                searchRef.current!.value = "";
              }}
            >
              <ProfilePicture user={user} size="sm" />
              <Text>{user.name}</Text>
            </Flex>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Search;
