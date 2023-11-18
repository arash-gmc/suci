import prisma from "@/prisma/client";
import { Posts, User } from "@prisma/client";
import { Table } from "@radix-ui/themes";

interface PostsWithUsers extends Posts {
  author: User;
}

const PostTable = async ({ posts }: { posts: PostsWithUsers[] }) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Post</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Author</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {posts.map((post) => (
          <Table.Row key={post.id}>
            <Table.Cell>{post.id}</Table.Cell>
            <Table.Cell>{post.text}</Table.Cell>
            <Table.Cell>{post.author.name}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default PostTable;
