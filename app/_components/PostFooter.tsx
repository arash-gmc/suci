import React, { useContext, useEffect, useState } from "react";
import { Flex, Text } from "@radix-ui/themes";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { FaRegComment, FaRetweet } from "react-icons/fa6";
import { Context } from "../_providers/Context";
import axios from "axios";
import { PostsWithUsers } from "../interfaces";
import { ActionType } from "@prisma/client";

interface Counts {
  likes: number;
  dislikes: number;
  bookmarks: number;
}

interface Interactions {
  like: boolean;
  dislike: boolean;
  bookmark: boolean;
}

const PostFooter = ({ post }: { post: PostsWithUsers }) => {
  const { viewer } = useContext(Context);
  const [counts, setCounts] = useState<Counts>({} as Counts);
  const [interactions, setInteractions] = useState<Interactions>(
    {} as Interactions
  );
  useEffect(() => {
    if (viewer)
      axios
        .get<Interactions>("/api/post/actions", {
          headers: { postId: post.id, userId: viewer?.id },
        })
        .then((res) => setInteractions(res.data))
        .catch((e) =>
          console.log("error during fetch user interactions".toUpperCase(), e)
        );
  }, [viewer]);
  useEffect(() => {
    axios
      .get<Counts>("/api/post/actions/counts", { headers: { postId: post.id } })
      .then((res) => setCounts(res.data));
  }, []);

  const doAction = (action: ActionType) => {
    axios
      .post("/api/post/actions", {
        userId: viewer?.id,
        postId: post.id,
        actionType: action,
      })
      .then((res) => {
        setCounts((prev) => ({
          ...prev,
          [action + "s"]:
            action === "like"
              ? prev.likes++
              : action === "dislike"
              ? prev.dislikes++
              : action === "bookmark"
              ? prev.bookmarks++
              : null,
        }));
        setInteractions((prev) => ({ ...prev, [action]: true }));
      });
  };

  const undoAction = (action: ActionType) => {
    axios
      .delete("/api/post/actions", {
        headers: {
          userId: viewer?.id,
          postId: post.id,
          actionType: action,
        },
      })
      .then((res) => {
        setCounts((prev) => ({
          ...prev,
          [action + "s"]:
            action === "like"
              ? prev.likes--
              : action === "dislike"
              ? prev.dislikes--
              : action === "bookmark"
              ? prev.bookmarks--
              : null,
        }));
        setInteractions((prev) => ({ ...prev, [action]: false }));
      });
  };

  const items = [
    {
      value: "like",
      icon: interactions?.like ? <BiSolidLike /> : <BiLike />,
      count: counts?.likes,
      onClick: interactions?.like
        ? () => undoAction("like")
        : () => doAction("like"),
    },
    {
      value: "dislike",
      icon: interactions?.dislike ? <BiSolidDislike /> : <BiDislike />,
      count: counts?.dislikes,
      onClick: interactions?.dislike
        ? () => undoAction("dislike")
        : () => doAction("dislike"),
    },
    { value: "retweet", icon: <FaRetweet />, count: null, onClick: () => null },
    {
      value: "comment",
      icon: <FaRegComment />,
      count: null,
      onClick: () => null,
    },
    {
      value: "bookmark",
      icon: interactions?.bookmark ? <GoBookmarkFill /> : <GoBookmark />,
      count: counts?.bookmarks,
      onClick: interactions?.bookmark
        ? () => undoAction("bookmark")
        : () => doAction("bookmark"),
    },
  ];
  if (!viewer) return null;

  return (
    <Flex justify="center" className="text-2xl" gap="8" align="center">
      {items.map((item) => (
        <Flex
          align="center"
          gap="1"
          className="cursor-pointer"
          key={item.value}
          onClick={(e) => item.onClick()}
        >
          <Text size="2">{item.count ? item.count : null}</Text>
          {item.icon}
        </Flex>
      ))}
    </Flex>
  );
};

export default PostFooter;
