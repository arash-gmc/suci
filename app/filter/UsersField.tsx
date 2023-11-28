import { User } from "@prisma/client";
import { Box, Flex, Grid, Text } from "@radix-ui/themes";
import React from "react";
import ProfilePicture from "../_components/ProfilePicture";

const UsersField = ({ users }: { users: User[] }) => {
  return (
    <Box className="border-2 w-full border-dashed rounded-lg py-5 mt-5">
      <Grid columns="4" gapY="5">
        {users.map((user) => (
          <Flex direction="column" align="center" key={user.id}>
            <ProfilePicture size="sm" user={user} />
            <Text>{user.name}</Text>
          </Flex>
        ))}
      </Grid>
    </Box>
  );
};

export default UsersField;
