"use client";
import { Button } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import React, { SetStateAction, useEffect, useState } from "react";

interface Props {
  followingId: string | undefined;
  followerId: string;
  setFollowers: (action: "follow" | "unfollow") => void;
}

const FollowButton = ({ followerId, followingId, setFollowers }: Props) => {
  const [isFollowing, setFollowing] = useState<boolean | null>(null);

  useEffect(() => {
    if (followerId && followingId)
      axios
        .get<boolean>("/api/user/follow", {
          headers: { followerId, followingId },
        })
        .then((res) => setFollowing(res.data))
        .catch((e: AxiosError) => console.log(e.message));
  }, [followingId, followerId]);

  const unfollow = () => {
    axios
      .delete("/api/user/follow", {
        data: { followerId, followingId },
      })
      .then(() => {
        setFollowing(false);
        setFollowers("unfollow");
      })
      .catch((e: AxiosError) => console.log(e.message));
  };
  const follow = () => {
    axios
      .post("/api/user/follow", {
        followerId,
        followingId,
      })
      .then(() => {
        setFollowing(true);
        setFollowers("follow");
      })
      .catch((e: AxiosError) => console.log(e.message));
  };

  if (!followingId) return null;
  if (followerId === followingId) return null;

  if (isFollowing === null) return null;

  if (isFollowing)
    return (
      <Button
        onClick={unfollow}
        variant="outline"
      >
        Unfollow
      </Button>
    );
  if (!isFollowing) return <Button onClick={follow}>Follow</Button>;
};

export default FollowButton;
