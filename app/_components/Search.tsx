"use client";
import { User } from "@prisma/client";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, TextField, Text, Flex } from "@radix-ui/themes";
import axios from "axios";
import React, { useRef, useState } from "react";
import ProfilePicture from "./ProfilePicture";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

interface Props {
  onUserClick: (user: User) => void;
  hiddenUsersId?: string[];
  searchPosts?: boolean;
  onSearchPosts?: () => void;
}

const Search = ({
  onUserClick,
  hiddenUsersId,
  searchPosts,
  onSearchPosts,
}: Props) => {
  const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
    if (e.currentTarget.value) {
      setLoading(true);
      setSearchedUsers([]);
      axios
        .get<User[]>("/api/user/search/" + e.currentTarget.value)
        .then((res) => setSearchedUsers(res.data))
        .finally(() => setLoading(false));
    } else {
      setSearchedUsers([]);
    }
  };
  let filteredUsers: User[] = [];
  if (hiddenUsersId) {
    filteredUsers = searchedUsers.filter(
      (user) => !hiddenUsersId.includes(user.id)
    );
  } else {
    filteredUsers = searchedUsers;
  }
  return (
    <Box className="relative">
      <TextField.Root>
        <TextField.Input
          placeholder="Search Users"
          type="text"
          onChange={onSearch}
          value={searchText}
        />
        <TextField.Slot>
          <MagnifyingGlassIcon
            height="16"
            width="16"
          />
        </TextField.Slot>
      </TextField.Root>
      {searchText && (
        <Flex
          className="absolute bg-white w-full z-10"
          direction="column"
        >
          {loading && (
            <Flex
              justify="center"
              py="3"
              color="blue"
            >
              <Spinner />
            </Flex>
          )}
          {filteredUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => {
                onUserClick(user);
                setSearchText("");
              }}
              className="p-2 border-b-2 "
            >
              <Flex
                gap="2"
                align="center"
                className=""
              >
                <ProfilePicture
                  user={user}
                  size="sm"
                />
                <Text>{user.name}</Text>
              </Flex>
            </button>
          ))}
          {searchPosts && (
            <Text
              color="blue"
              className="py-3 text-center font-bold cursor-pointer"
              onClick={() => {
                router.push("/posts/search?searched=" + searchText);
                setSearchText("");
                if (onSearchPosts) onSearchPosts();
              }}
            >
              Search for &#34;{searchText}&#34; in posts
            </Text>
          )}
        </Flex>
      )}
    </Box>
  );
};

export default Search;
