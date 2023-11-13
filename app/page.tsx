import { Button, Container, TextField } from "@radix-ui/themes";
import NewPost from "./NewPost";

export default function Home() {
  return (
    <>
      <Container>
        <NewPost />
      </Container>
    </>
  );
}
