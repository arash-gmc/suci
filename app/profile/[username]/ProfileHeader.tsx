"use client";
import { User } from "@prisma/client";
import { Grid, Heading, Flex, Text, Button } from "@radix-ui/themes";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import FollowButton from "./FollowButton";
import ProfilePicture from "@/app/_components/ProfilePicture";
import { getYear } from "date-fns";

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

  useEffect(() => {
    axios.get<Counts>("/api/user/counts/" + user.id).then((res) => {
      setFollowers(res.data.followersCounts);
      setFollowings(res.data.followingsCounts);
      setPostsCount(res.data.postsCounts);
    });
  }, []);

  const getStatus = () => {
    let status = "";
    if (user.brithYear)
      status += getYear(Date.now()) - user.brithYear + " years old";
    if (user.gender) {
      status = "A " + status;
      if (user.gender === "male") status += " boy";
      if (user.gender === "female") status += " girl";
    }
    if (user.city) {
      status += " from " + user.city;
    }
    return status;
  };

  return (
    <Grid columns={{ initial: "1", sm: "2" }}>
      <Flex gap="3">
        <ProfilePicture user={user} size="lg" />
        <Flex direction="column" pt="3">
          <Heading my="2">{user.name}</Heading>
          <Text size="2" color="gray">
            @{user.username}
          </Text>
          <Text size="2" color="gray">
            {user.email}
          </Text>
          <Text size="2">{getStatus()}</Text>

          <FollowButton
            followerId={user.id}
            followingId={session?.user.id}
            setFollowers={setFollowers}
          />
        </Flex>
      </Flex>
      <Flex direction="column" justify="center" py={{ initial: "5", sm: "0" }}>
        <Flex justify="center" gap={{ initial: "5", md: "8" }}>
          <Text>{postsCount} Posts</Text>
          <Text>{followers} followers</Text>
          <Text>{followings} followings</Text>
        </Flex>
      </Flex>
    </Grid>
  );
};

export default ProfileHeader;
