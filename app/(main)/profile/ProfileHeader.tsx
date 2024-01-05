"use client";
import { User } from "@prisma/client";
import { Grid, Heading, Flex, Text, Button } from "@radix-ui/themes";
import { Session } from "next-auth";
import React, { useContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import FollowButton from "./FollowButton";
import ProfilePicture from "@/app/_components/ProfilePicture";
import { getYear } from "date-fns";
import SendMessage from "./SendMessage";
import CountsComponent from "./Counts";
import { Context } from "@/app/_providers/Context";
import Link from "next/link";

interface Props {
  user: User;
  postsCount: number;
  session: Session | null;
}

export interface Counts {
  follower: number;
  following: number;
  post: number;
}

const ProfileHeader = ({ user, session }: Props) => {
  const [counts, setCounts] = useState<Counts>({} as Counts);
  const [followings, setFollowings] = useState<User[]>([]);
  const [followers, setFollowers] = useState<User[]>([]);
  const { viewer } = useContext(Context);

  useEffect(() => {
    if (user.id) {
      axios.get<Counts>("/api/user/counts/" + user.id).then((res) => {
        setCounts(res.data);
      });
      axios
        .get<User[]>("/api/user/follow/list-user", {
          headers: { userId: user.id, relation: "following" },
        })
        .then((res) => setFollowings(res.data));
      axios
        .get<User[]>("/api/user/follow/list-user", {
          headers: { userId: user.id, relation: "follower" },
        })
        .then((res) => setFollowers(res.data));
    }
  }, [user]);

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
      mt="5"
      align="center"
      justify="center"
      gap="5"
      direction={{ initial: "column", sm: "row" }}
    >
      <Flex
        gap={{ initial: "5", sm: "8" }}
        align="start"
      >
        <ProfilePicture
          user={user}
          size="lg"
        />
        <Flex
          direction="column"
          pt="3"
          mr={{ initial: "2", sm: "0" }}
        >
          <Text
            my="3"
            size="8"
            className="font-bold"
          >
            {user.name}
          </Text>
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
            {viewer && user && (
              <>
                {viewer?.id !== user.id ? (
                  <>
                    <FollowButton
                      followerId={user.id}
                      followingId={session?.user.id}
                      setFollowers={setFolllowes}
                    />
                    <SendMessage
                      profileId={user.id}
                      profileName={user.name}
                    />
                  </>
                ) : (
                  <>
                    <Link href="/profile/edit">
                      <Button size="1">Edit Profile</Button>
                    </Link>
                    <Link href="/posts/bookmarks">
                      <Button size="1">Bookmarks</Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </Grid>
        </Flex>
      </Flex>
      <CountsComponent
        counts={counts}
        followings={followings}
        followers={followers}
        userName={user.name}
      />
    </Flex>
  );
};

export default ProfileHeader;
