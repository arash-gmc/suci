import { Context } from "@/app/_providers/Context";
import { Flex, Text } from "@radix-ui/themes";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useContext } from "react";

const UserMenu = () => {
  const { viewer } = useContext(Context);
  if (!viewer) return null;
  return (
    <Flex
      direction="column"
      p="2"
      className="absolute top-11 -left-44 border-2 border-purple-500 w-48 bg-slate-50 rounded-md text-md min-w-max font-bold"
    >
      <Flex direction="column" className="border-b-2 py-2">
        <Text>{viewer.name}</Text>
        <Text size="2" color="gray" className="font-normal">
          @{viewer.username}
        </Text>
      </Flex>
      <Link className="border-b-2 py-2" href={"/profile/" + viewer.username}>
        Profile
      </Link>
      <Link className="border-b-2 py-2" href="profile/edit">
        Edit Profile
      </Link>
      <Link className="border-b-2 py-2" href="/posts/bookmarks">
        Bookmarks
      </Link>
      <button className="text-left py-2" onClick={() => signOut()}>
        Sign Out
      </button>
    </Flex>
  );
};

export default UserMenu;
