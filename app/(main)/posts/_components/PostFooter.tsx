"use client";
import React, { useContext, useEffect, useState } from "react";
import { Flex, Grid, Text } from "@radix-ui/themes";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { FaRetweet } from "react-icons/fa6";
import axios from "axios";
import { ActionType } from "@prisma/client";
import QuickComment from "./QuickComment";
import { Context } from "@/app/_providers/Context";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Counts {
  likes: number;
  dislikes: number;
  bookmarks: number;
  reposts: number;
  comments: number;
}

type Actions = "like" | "dislike" | "bookmark" | "repost" | "comment";

type ActionsBoolean = {
  [K in Actions]: boolean;
};

// type Counts = {
//   [K in Actions]: number;
// };

const PostFooter = ({ postId }: { postId: string }) => {
  const { viewer } = useContext(Context);
  const [counts, setCounts] = useState<Counts>({} as Counts);
  const [animations, setAnimation] = useState<ActionsBoolean>({
    like: false,
    dislike: false,
    bookmark: false,
    repost: false,
    comment: false,
  });
  const [interactions, setInteractions] = useState<ActionsBoolean>(
    {} as ActionsBoolean
  );
  const router = useRouter();
  useEffect(() => {
    if (viewer && postId)
      axios
        .get<ActionsBoolean>("/api/post/actions", {
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
        <QuickComment
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
      color: "text-orange-600",
      count: counts.comments,
      onClick: () => null,
    },
    {
      value: "bookmark",
      done: interactions?.bookmark,
      color: "text-yellow-400",
      icon: interactions?.bookmark ? <GoBookmarkFill /> : <GoBookmark />,
      count: counts?.bookmarks,
      onClick: interactions?.bookmark
        ? () => undoAction("bookmark")
        : () => doAction("bookmark"),
    },
  ];

  return (
    <Flex
      justify="center"
      className="text-2xl text-gray-500"
      gap={{ initial: "4", xs: "6", sm: "8" }}
      align="center"
      height={{ initial: "4", sm: "5" }}
    >
      {items.map((item) => (
        <Flex
          align="center"
          className={item.done ? item.color + " font-bold" : ""}
          key={item.value}
        >
          <Text className="w-3 whitespace-nowrap select-none" size="2">
            {item.count ? item.count : null}
          </Text>
          {item.value === "comment" ? (
            <Text size={{ initial: "5", sm: "6" }}>{item.icon}</Text>
          ) : (
            <button
              onClick={() => {
                if (!viewer) return router.push("/api/auth/signin");
                setAnimation((prev) => ({ ...prev, [item.value]: true }));
                setTimeout(
                  () =>
                    setAnimation((prev) => ({ ...prev, [item.value]: false })),
                  400
                );
                item.onClick();
              }}
            >
              <motion.div
                animate={
                  animations[item.value as Actions]
                    ? { scale: 1.3, y: -10 }
                    : undefined
                }
              >
                <Text size={{ initial: "5", sm: "6" }}>{item.icon}</Text>
              </motion.div>
            </button>
          )}
        </Flex>
      ))}
    </Flex>
  );
};

export default PostFooter;
