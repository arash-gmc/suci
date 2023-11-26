"use client";
import { User } from "@prisma/client";
import { Grid, Heading, Flex, Text, Button } from "@radix-ui/themes";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import FollowButton from "./FollowButton";

interface Props {
  user: User;
  postsCount: number;
  session: Session | null;
}

interface Counts {
  followersCounts: number;
  followingsCounts: number;
  postsCounts: number;
}

const ProfileHeader = ({ user, session }: Props) => {
  const [followers, setFollowers] = useState(0);
  const [followings, setFollowings] = useState(0);
  const [postsCount, setPostsCount] = useState(0);
  //const [isFollowing, setIsFollowing] = useState<boolean>(false);

  useEffect(() => {
    axios.get<Counts>("/api/user/counts/" + user.id).then((res) => {
      setFollowers(res.data.followersCounts);
      setFollowings(res.data.followingsCounts);
      setPostsCount(res.data.postsCounts);
    });
  }, []);

  // useEffect(() => {
  //   if (!session) return;
  //   axios
  //     .get<boolean>("/api/user/follow", {
  //       headers: { followerId: session?.user.id, followingId: user.id },
  //     })
  //     .then((res) => setIsFollowing(res.data))
  //     .catch((e: AxiosError) => console.log(e.message));
  // }, []);

  // const FollowButton = () => {
  //   const followingId = session?.user.id;
  //   const followerId = user.id;
  //   if (!followingId) return null;
  //   if (followerId === followingId) return null;

  //   const unfollow = () => {
  //     axios
  //       .delete("/api/user/follow", {
  //         data: { followerId, followingId },
  //       })
  //       .then(() => {
  //         setIsFollowing(false);
  //         setFollowers((prev) => prev - 1);
  //       })
  //       .catch((e: AxiosError) => console.log(e.message));
  //   };
  //   const follow = () => {
  //     axios
  //       .post("/api/user/follow", {
  //         followerId,
  //         followingId,
  //       })
  //       .then(() => {
  //         setIsFollowing(true);
  //         setFollowers((prev) => prev + 1);
  //       })
  //       .catch((e: AxiosError) => console.log(e.message));
  //   };

  //   if (isFollowing)
  //     return (
  //       <Button size="3" onClick={unfollow} variant="outline">
  //         Unfollow
  //       </Button>
  //     );
  //   if (!isFollowing)
  //     return (
  //       <Button size="3" onClick={follow}>
  //         Follow
  //       </Button>
  //     );
  // };

  return (
    <Grid columns="2">
      <Heading>{user.name}</Heading>
      <Flex direction="column" gap="3">
        <Flex justify="between">
          <Text>{postsCount} Posts</Text>
          <Text>{followers} followers</Text>
          <Text>{followings} followings</Text>
        </Flex>
        <Flex justify="center">
          <FollowButton
            followerId={user.id}
            followingId={session?.user.id}
            setFollowers={setFollowers}
          />
        </Flex>
      </Flex>
    </Grid>
  );
};

export default ProfileHeader;
