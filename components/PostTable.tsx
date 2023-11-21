import { Table } from "@radix-ui/themes";
import Link from "next/link";
import { PostsWithUsers } from "../app/Interfaces";

const PostTable = ({ posts }: { posts: PostsWithUsers[] }) => {
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
            <Table.Cell>
              <Link href={"/profile/" + post.authorId}>{post.author.name}</Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default PostTable;
