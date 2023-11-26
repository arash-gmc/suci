"use client";
import { User } from "@prisma/client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, TextField, Text, Flex } from "@radix-ui/themes";
import axios from "axios";
import React, { useRef, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import Link from "next/link";

const Search = () => {
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
  const searchRef = useRef<HTMLInputElement>(null);
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchText = e.currentTarget.value;
    if (searchText) {
      axios
        .get<User[]>("/api/user/search", {
          headers: { searchText },
        })
        .then((res) => setSearchedUsers(res.data));
    } else {
      setSearchedUsers([]);
    }
  };

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
      {searchRef.current?.value && (
        <Flex className="absolute bg-white w-full z-10" direction="column">
          {searchedUsers.map((user) => (
            <Link href={"/profile/" + user.username}>
              <Flex
                key={user.id}
                gap="2"
                align="center"
                className="border-b-2 py-3"
              >
                <ProfilePicture user={user} size="sm" />
                <Text>{user.name}</Text>
              </Flex>
            </Link>
          ))}
        </Flex>
      )}
    </Box>
  );
};

export default Search;
