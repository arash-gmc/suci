"use client";
import React, { useContext, useEffect, useState } from "react";
import { Flex, Grid, Text } from "@radix-ui/themes";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { FaRetweet } from "react-icons/fa6";
import axios from "axios";
import { ActionType } from "@prisma/client";
import AddComment from "./AddComment";
import { Context } from "@/app/_providers/Context";

interface Counts {
  likes: number;
  dislikes: number;
  bookmarks: number;
  reposts: number;
  comments: number;
}

interface Interactions {
  like: boolean;
  dislike: boolean;
  bookmark: boolean;
  repost: boolean;
  comment: boolean;
}

const PostFooter = ({ postId }: { postId: string }) => {
  const { viewer } = useContext(Context);
  const [counts, setCounts] = useState<Counts>({} as Counts);
  const [interactions, setInteractions] = useState<Interactions>(
    {} as Interactions
  );
  useEffect(() => {
    if (viewer && postId)
      axios
        .get<Interactions>("/api/post/actions", {
          headers: { postId, userId: viewer?.id },
        })
        .then((res) => setInteractions(res.data))
        .catch((e) =>
          console.log("error during fetch user interactions".toUpperCase(), e)
        );
  }, [viewer, postId]);
  useEffect(() => {
    if (postId)
      axios
        .get<Counts>("/api/post/actions/counts", { headers: { postId } })
        .then((res) => setCounts(res.data));
  }, [postId]);

  const doAction = (action: ActionType) => {
    if (viewer)
      axios
        .post("/api/post/actions", {
          userId: viewer?.id,
          postId,
          actionType: action,
        })
        .then((res) => {
          setCounts((prev) => ({
            ...prev,
            [action + "s"]:
              action === "like"
                ? prev.likes + 1
                : action === "dislike"
                ? prev.dislikes + 1
                : action === "bookmark"
                ? prev.bookmarks + 1
                : null,
          }));
          setInteractions((prev) => ({ ...prev, [action]: true }));
        });
  };

  const undoAction = (action: ActionType) => {
    if (viewer)
      axios
        .delete("/api/post/actions", {
          headers: {
            userId: viewer?.id,
            postId,
            actionType: action,
          },
        })
        .then((res) => {
          setCounts((prev) => ({
            ...prev,
            [action + "s"]:
              action === "like"
                ? prev.likes - 1
                : action === "dislike"
                ? prev.dislikes - 1
                : action === "bookmark"
                ? prev.bookmarks - 1
                : null,
          }));
          setInteractions((prev) => ({ ...prev, [action]: false }));
        });
  };
  const repost = () => {
    axios
      .post("/api/post/repost", { postId, userId: viewer?.id })
      .then((res) => {
        setCounts((prev) => ({ ...prev, reposts: prev.reposts + 1 }));
        setInteractions((prev) => ({ ...prev, repost: true }));
      });
  };

  const unrepost = () => {
    axios
      .delete("/api/post/repost", {
        headers: { postId, userId: viewer?.id },
      })
      .then((res) => {
        setCounts((prev) => ({ ...prev, reposts: prev.reposts - 1 }));
        setInteractions((prev) => ({ ...prev, repost: false }));
      });
  };

  const items = [
    {
      value: "like",
      done: interactions?.like,
      color: "text-blue-500",
      icon: interactions?.like ? <BiSolidLike /> : <BiLike />,
      count: counts?.likes,
      onClick: interactions?.like
        ? () => undoAction("like")
        : () => doAction("like"),
    },
    {
      value: "dislike",
      done: interactions?.dislike,
      color: "text-rose-600",
      icon: interactions?.dislike ? <BiSolidDislike /> : <BiDislike />,
      count: counts?.dislikes,
      onClick: interactions?.dislike
        ? () => undoAction("dislike")
        : () => doAction("dislike"),
    },
    {
      value: "repost",
      icon: <FaRetweet />,
      done: interactions.repost,
      color: "text-green-700",
      count: counts.reposts,
      onClick: () => (interactions.repost ? unrepost() : repost()),
    },
    {
      value: "comment",
      icon: (
        <AddComment
          postId={postId}
          addCount={() =>
            setCounts((prev) => ({ ...prev, comments: prev.comments + 1 }))
          }
          setStatus={() =>
            setInteractions((prev) => ({ ...prev, comment: true }))
          }
        />
      ),
      done: interactions.comment,
      color: "text-purple-600",
      count: counts.comments,
      onClick: () => null,
    },
    {
      value: "bookmark",
      done: interactions?.bookmark,
      color: "text-orange-400",
      icon: interactions?.bookmark ? <GoBookmarkFill /> : <GoBookmark />,
      count: counts?.bookmarks,
      onClick: interactions?.bookmark
        ? () => undoAction("bookmark")
        : () => doAction("bookmark"),
    },
  ];
  if (!viewer) return null;

  return (
    <Flex
      justify="center"
      className="text-2xl text-gray-500"
      gap={{ initial: "5", sm: "8" }}
      align="center"
    >
      {items.map((item) => (
        <Flex
          align="center"
          className={
            "cursor-pointer " + (item.done ? item.color + " font-bold" : "")
          }
          key={item.value}
          onClick={(e) => item.onClick()}
        >
          <Text
            className="w-3 whitespace-nowrap"
            size="2"
          >
            {item.count ? item.count : null}
          </Text>
          <Text size={{ initial: "5", sm: "6" }}>{item.icon}</Text>
        </Flex>
      ))}
    </Flex>
  );
};

export default PostFooter;
