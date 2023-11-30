import { Container, Flex, Text } from "@radix-ui/themes";
import Link from "next/link";
import { PostsWithUsers } from "../interfaces";
import PostFooter from "./PostFooter";
import ProfilePicture from "./ProfilePicture";

const SinglePost = ({ post }: { post: PostsWithUsers }) => {
  const author = post.author;

  return (
    <Container>
      <Flex gap="3" mx="3" px="3" className="border-b-2 pb-6">
        <Flex direction="column">
          <Link href={"/profile/" + author.username}>
            <ProfilePicture user={author} size="md" />
          </Link>
        </Flex>

        <Flex
          direction="column"
          gap="2"
          className="max-h-26 overflow-hidden"
          width="100%"
        >
          <Flex align="baseline" gap="2">
            <Text size="4" className="font-bold">
              {author.name}
            </Text>
            <Text size="1" color="gray">
              @{author.username}
            </Text>
            <Text size="1" color="gray" ml="1">
              1h
            </Text>
          </Flex>
          <Text>{post.text}</Text>
          <PostFooter post={post} />
        </Flex>
      </Flex>
    </Container>
  );
};

export default SinglePost;
