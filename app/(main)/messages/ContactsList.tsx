import { Badge, Box, Button, Flex, Text, TextField } from "@radix-ui/themes";
import ProfilePicture from "../../_components/ProfilePicture";
import { ChatContactsInfo } from "../../api/message/users/route";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import AddContact from "./AddContact";
import TextCompress from "@/app/_components/TextCompress";
import useTheme from "next-theme";

interface Props {
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  selectedUserId: string | null;
  contactsInfo: ChatContactsInfo[];
}
const ContactsList = ({ setUser, selectedUserId, contactsInfo }: Props) => {
  const [searched, setSearched] = useState("");
  const [contacts, setContacts] = useState<ChatContactsInfo[]>([]);
  const { theme } = useTheme();
  useEffect(() => {
    if (searched) {
      const filtered = contactsInfo.filter((contact) =>
        contact.user.name?.toLowerCase().startsWith(searched.toLowerCase())
      );
      setContacts(filtered);
    } else {
      setContacts(contactsInfo);
    }
  }, [searched, contactsInfo]);
  return (
    <Flex
      direction="column"
      justify="between"
      width="100%"
      className={
        "overflow-y-scroll border-r-2 " +
        (theme === "light" ? "bg-slate-100" : "bg-slate-600")
      }
    >
      <Box>
        <Box p="4" shrink="0">
          <TextField.Root>
            <TextField.Input
              placeholder="Find..."
              value={searched}
              onChange={(e) => setSearched(e.currentTarget.value)}
            />
            <TextField.Slot>
              <MagnifyingGlassIcon height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
        </Box>
        <Flex direction="column" className="w-full">
          {contacts.map((contact) => (
            <Flex
              key={contact.user.id}
              p="2"
              align="center"
              justify="between"
              className={
                (theme === "light"
                  ? contact.user.id === selectedUserId
                    ? "bg-sky-200 "
                    : "bg-white "
                  : contact.user.id === selectedUserId
                  ? "bg-sky-700 "
                  : "bg-slate-700 ") + "m-1 rounded-2xl cursor-pointer px-3"
              }
              onClick={() => setUser(contact.user.id)}
            >
              <Flex align="center" gap="2">
                <ProfilePicture size="md" user={contact.user} />
                <Box>
                  <Text as="p">{contact.user.name}</Text>
                  <Text color="gray" size="2">
                    <TextCompress compressSize={40}>
                      {contact.lastMessage}
                    </TextCompress>
                  </Text>
                </Box>
              </Flex>
              {!!contact.unseens && <Badge>{contact.unseens}</Badge>}
            </Flex>
          ))}
        </Flex>
      </Box>
      <Flex p="4" mb="2" justify="center" shrink="0">
        <AddContact setUser={(userId: string) => setUser(userId)} />
      </Flex>
    </Flex>
  );
};

export default ContactsList;
