"use client";
import { Button } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  followingId: string | undefined;
  followerId: string;
}

const FollowButton = ({ followerId, followingId }: Props) => {
  if (!followingId) return null;
  if (followerId === followingId) return null;

  const [isFollowing, setFollowing] = useState(false);

  useEffect(() => {
    axios
      .get<boolean>("/api/user/follow", {
        headers: { followerId, followingId },
      })
      .then((res) => setFollowing(res.data));
  }, []);

  const unfollow = async () => {
    await axios.delete("/api/user/follow", {
      data: { followerId, followingId },
    });
    setFollowing(false);
  };
  const follow = async () => {
    const res = await axios.post("/api/user/follow", {
      followerId,
      followingId,
    });
    setFollowing(true);
  };

  if (isFollowing)
    return (
      <Button size="3" onClick={unfollow} variant="outline">
        Unfollow
      </Button>
    );
  if (!isFollowing)
    return (
      <Button size="3" onClick={follow}>
        Follow
      </Button>
    );
};

export default FollowButton;
