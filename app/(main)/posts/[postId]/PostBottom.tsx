"use client";
import UserFieldPopover from "@/app/_components/UserFieldPopover";
import { CommentAndAuthor } from "@/app/(main)/interfaces";
import { Flex, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import EditPost from "./EditPost";
import { User } from "@prisma/client";
import axios from "axios";
import DeletionAlert from "@/app/_components/DeletionAlert";
import { useRouter } from "next/navigation";

interface Props {
  postId: string;
  comments: CommentAndAuthor[];
  authorId: string;
  postText: string | null;
}

const PostBottom = ({ postId, comments, authorId, postText }: Props) => {
  const [likers, setLikers] = useState<User[]>([]);
  const [reposters, setReposters] = useState<User[]>([]);
  const router = useRouter();
  useEffect(() => {
    if (!postId) return;
    axios
      .get("/api/post/actions/likers", { headers: { postId } })
      .then((res) => setLikers(res.data));
    axios
      .get("/api/post/actions/reposters", { headers: { postId } })
      .then((res) => setReposters(res.data));
  }, [postId]);

  const deletePost = async () => {
    await axios.delete("/api/post/delete", { headers: { postId } });
    router.back();
  };

  const commenters = comments.map((comment) => comment.author);
  return (
    <Flex justify="between" mt="3" mx="8" className=" text-sm">
      <Flex gap="4" className="text-gray-600">
        {likers.length > 0 && (
          <UserFieldPopover
            label={likers.length + " likes"}
            users={likers}
            title="People who liked this post."
          />
        )}
        {commenters.length > 0 && <Text>{comments.length + " comments"}</Text>}
        {reposters.length > 0 && (
          <UserFieldPopover
            label={reposters.length + " reposts"}
            users={reposters}
            title="People who reposted this post."
          />
        )}
      </Flex>
      <Flex gap="4">
        <EditPost authorId={authorId} initialText={postText} postId={postId} />
        <DeletionAlert
          action={() => deletePost()}
          label="this post"
          trigger={<button className=" text-red-600 font-bold">Delete</button>}
        />
      </Flex>
    </Flex>
  );
};

export default PostBottom;
