import { Box, Button, Flex, Link, Popover, Text } from "@radix-ui/themes";
import React, { useContext } from "react";
import Search from "../../_components/Search";
import { ViewerContext } from "../../_providers/ViewerContext";

interface Props {
  setUser: (userId: string) => void;
  mini?: boolean;
}

const AddContact = ({ setUser, mini }: Props) => {
  const { viewer } = useContext(ViewerContext);
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button size="3" variant="outline" className="bg-white">
          {mini ? "+" : "+ Add New Chat"}
        </Button>
      </Popover.Trigger>
      <Popover.Content style={{ width: 360, height: 240 }}>
        <Flex direction="column" gap="2" align="start">
          Search for a user to add in message box.
          <Flex gap="3">
            <Search
              onUserClick={(user) => setUser(user.id)}
              hiddenUsersId={viewer?.id ? [viewer.id] : []}
            />
            <Popover.Close>
              <Button variant="outline">Close</Button>
            </Popover.Close>
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};

export default AddContact;
