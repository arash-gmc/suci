"use client";
import { Button, Flex, TextArea } from "@radix-ui/themes";
import axios from "axios";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { CommentAndAuthor, PostAndRef } from "../../interfaces";
import { ViewerContext } from "../../../_providers/ViewerContext";
import Spinner from "@/app/_components/Spinner";

interface Props {
  setComments: Dispatch<SetStateAction<CommentAndAuthor[]>>;
  postId: string;
}

const NewComment = ({ setComments: setComments, postId }: Props) => {
  const { viewer } = useContext(ViewerContext);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState<string>("");
  const addComment = async () => {
    setLoading(true);
    const res = await axios
      .post<CommentAndAuthor>("/api/comment/for-post", {
        authorId: viewer?.id,
        postId,
        text: commentText,
      })
      .finally(() => setLoading(false));
    setComments((prev) => [...prev, res.data]);
    setCommentText("");
  };
  if (viewer)
    return (
      <Flex
        mx={{ initial: "2", sm: "5" }}
        my="4"
        gap={{ initial: "2", sm: "5" }}
        align="center"
      >
        <Flex width="100%">
          <TextArea
            placeholder="Leave a comment ..."
            onChange={(e) => setCommentText(e.currentTarget.value)}
            rows={2}
            className="p-2"
            value={commentText}
            style={{ backgroundColor: "var(--accent-1)" }}
          />
        </Flex>
        <Button
          disabled={!commentText || loading}
          onClick={addComment}
          size="2"
        >
          Send
          {loading && <Spinner />}
        </Button>
      </Flex>
    );
  return null;
};

export default NewComment;
