"use client";
import { User } from "@prisma/client";
import { Grid, Heading, Flex, Text, Button } from "@radix-ui/themes";
import { Session } from "next-auth";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import FollowButton from "./FollowButton";
import ProfilePicture from "@/app/_components/ProfilePicture";
import { getYear } from "date-fns";
import SendMessage from "./SendMessage";

interface Props {
  user: User;
  postsCount: number;
  session: Session | null;
}

interface Counts {
  follower: number;
  following: number;
  post: number;
}

const ProfileHeader = ({ user, session }: Props) => {
  const [counts, setCounts] = useState<Counts>({} as Counts);

  useEffect(() => {
    axios.get<Counts>("/api/user/counts/" + user.id).then((res) => {
      setCounts(res.data);
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

  const setFolllowes = (action: "follow" | "unfollow") => {
    if (action === "follow")
      setCounts((prev) => ({ ...prev, follower: prev.follower + 1 }));
    if (action === "unfollow")
      setCounts((prev) => ({ ...prev, follower: prev.follower - 1 }));
  };

  return (
    <Flex
      align="center"
      justify="center"
      gap="5"
      direction={{ initial: "column", sm: "row" }}
    >
      <Flex gap="6">
        <ProfilePicture
          user={user}
          size="lg"
        />
        <Flex
          direction="column"
          pt="3"
        >
          <Heading my="2">{user.name}</Heading>
          <Text
            size="2"
            color="gray"
          >
            @{user.username}
          </Text>
          <Text
            size="2"
            color="gray"
          >
            {user.email}
          </Text>
          <Text size="2">{getStatus()}</Text>
          <Grid
            gap="2"
            my="3"
            columns="2"
          >
            <FollowButton
              followerId={user.id}
              followingId={session?.user.id}
              setFollowers={setFolllowes}
            />
            <SendMessage
              profileId={user.id}
              profileName={user.name}
            />
          </Grid>
        </Flex>
      </Flex>

      {Object.keys(counts).length > 0 && (
        <Flex
          direction={{ initial: "row", sm: "column" }}
          justify="center"
          gap={{ initial: "8", sm: "3" }}
          className="font-bold border-l-2 max-sm:border-0"
          my="3"
          p="2"
        >
          <Text>{counts.post} Posts</Text>
          <Text>{counts.follower} followers</Text>
          <Text>{counts.following} followings</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default ProfileHeader;
