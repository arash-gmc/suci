"use client";
import React, { useContext, useEffect, useState } from "react";
import { Flex, Grid, Text } from "@radix-ui/themes";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { FaRetweet } from "react-icons/fa6";
import axios from "axios";
import { ActionType } from "@prisma/client";
import QuickComment from "./QuickComment";
import { ViewerContext } from "@/app/_providers/ViewerContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Actions = "like" | "dislike" | "bookmark" | "repost" | "comment";

type ActionsBoolean = {
  [K in Actions]: boolean;
};

type Counts = {
  [K in Actions]: number;
};

interface ActionItem {
  value: Actions;
  icon: React.JSX.Element;
  onClick: () => void;
}

const PostFooter = ({ postId }: { postId: string }) => {
  const { viewer } = useContext(ViewerContext);
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
      axios.post("/api/post/actions", {
        userId: viewer?.id,
        postId,
        actionType: action,
      });
    setCounts((prev) => ({
      ...prev,
      [action]: prev[action] + 1,
    }));
    setInteractions((prev) => ({ ...prev, [action]: true }));
  };

  const undoAction = (action: ActionType) => {
    if (viewer)
      axios.delete("/api/post/actions", {
        headers: {
          userId: viewer?.id,
          postId,
          actionType: action,
        },
      });
    setCounts((prev) => ({
      ...prev,
      [action]: prev[action] - 1,
    }));
    setInteractions((prev) => ({ ...prev, [action]: false }));
  };
  const repost = () => {
    axios.post("/api/post/repost", { postId, userId: viewer?.id });
    setCounts((prev) => ({ ...prev, repost: prev.repost + 1 }));
    setInteractions((prev) => ({ ...prev, repost: true }));
  };

  const unrepost = () => {
    axios.delete("/api/post/repost", {
      headers: { postId, userId: viewer?.id },
    });
    setCounts((prev) => ({ ...prev, repost: prev.repost - 1 }));
    setInteractions((prev) => ({ ...prev, repost: false }));
  };

  const items: ActionItem[] = [
    {
      value: "like",
      icon: interactions?.like ? <BiSolidLike /> : <BiLike />,
      onClick: interactions?.like
        ? () => undoAction("like")
        : () => doAction("like"),
    },
    {
      value: "dislike",
      icon: interactions?.dislike ? <BiSolidDislike /> : <BiDislike />,
      onClick: interactions?.dislike
        ? () => undoAction("dislike")
        : () => doAction("dislike"),
    },
    {
      value: "repost",
      icon: <FaRetweet />,
      onClick: () => (interactions.repost ? unrepost() : repost()),
    },
    {
      value: "comment",
      icon: (
        <QuickComment
          postId={postId}
          addCount={() =>
            setCounts((prev) => ({ ...prev, comment: prev.comment + 1 }))
          }
          setStatus={() =>
            setInteractions((prev) => ({ ...prev, comment: true }))
          }
        />
      ),
      onClick: () => null,
    },
    {
      value: "bookmark",
      icon: interactions?.bookmark ? <GoBookmarkFill /> : <GoBookmark />,
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
          className={interactions[item.value] ? "font-bold" : ""}
          style={{
            color: interactions[item.value]
              ? "var(--accent-9)"
              : "var(--gray-9)",
          }}
          key={item.value}
        >
          <Text className="w-3 whitespace-nowrap select-none" size="2">
            {counts[item.value] ? counts[item.value] : null}
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
                    ? { scale: 1.2, y: -6 }
                    : undefined
                }
                whileHover={{
                  rotate: [10, -10, 0],
                  scale: 1.06,
                }}
                transition={{ duration: 0.2 }}
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
