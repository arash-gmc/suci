import { Container, Flex } from "@radix-ui/themes";
import NewPost from "./NewPost";
import PostTable from "./PostTable";

export default function Home() {
  return (
    <>
      <Flex direction="column" gap="2">
        <NewPost />
        <PostTable posts={[{ id: 1, text: "hello" }]} />
      </Flex>
    </>
  );
}
