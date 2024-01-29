import { User } from "@prisma/client";
import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import React from "react";
import ProfilePicture from "./ProfilePicture";
interface Props {
  users: User[];
  onUserClick?: (user: User) => void;
}

const UsersField = ({ users, onUserClick }: Props) => {
  return (
    <Box className="border-2 w-full border-dashed rounded-lg py-5 mt-5">
      <Grid
        columns={{ initial: "3", xs: "4", sm: "5" }}
        gapY="5"
        className="overflow-y-auto"
      >
        {users.map((user) => (
          <Flex
            direction="column"
            align="center"
            key={user.id}
            className={onUserClick ? "cursor-pointer" : ""}
            onClick={() => (onUserClick ? onUserClick(user) : null)}
          >
            <ProfilePicture
              size="sm"
              user={user}
            />
            <span>{user.name?.split(' ')[0]}</span>
          </Flex>
        ))}
      </Grid>
    </Box>
  );
};

export default UsersField;
