import ButtonGroups from "@/app/_components/ButtonGroup";
import React, { SetStateAction, useEffect, useState } from "react";
import { ButtonGroupProps } from "./interfaces";
import axios from "axios";
import { Prisma, User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { PlusIcon } from "@radix-ui/react-icons";

interface Props {
  setWhere: (value: SetStateAction<Prisma.PostsWhereInput>) => void;
}

const Filter = ({ setWhere }: Props) => {
  const { data: session, status } = useSession();

  const [followings, setFollowings] = useState<string[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get<User>("/api/user/getOne", { headers: { userId: session.user.id } })
        .then((res) => setUser(res.data));
      axios
        .get("/api/user/followings", {
          headers: { userId: session?.user.id, relation: "following" },
        })
        .then((res) => setFollowings(res.data));
      axios
        .get("/api/user/followings", {
          headers: { userId: session?.user.id, relation: "follower" },
        })
        .then((res) => setFollowers(res.data));
    }
  }, [status]);

  if (status === "unauthenticated") return null;
  if (status === "loading") return null;

  const filters: ButtonGroupProps[] = [
    { label: "All", value: "all", onClick: () => setWhere({}) },
    {
      label: "Followings",
      value: "followings",
      onClick: () => setWhere({ authorId: { in: followings } }),
    },
    {
      label: "Followers",
      value: "followers",
      onClick: () => setWhere({ authorId: { in: followers } }),
    },
    {
      label: "Boys",
      value: "males",
      onClick: () => setWhere({ author: { gender: "male" } }),
    },
    {
      label: "Girls",
      value: "females",
      onClick: () => setWhere({ author: { gender: "female" } }),
    },
  ];
  if (user?.city)
    filters.push({
      label: "Live in " + user.city,
      value: "myCity",
      onClick: () => setWhere({ author: { city: user.city } }),
    });

  if (user?.brithYear)
    filters.push({
      label: "Around my age",
      value: "myAge",
      onClick: () =>
        setWhere({
          author: {
            brithYear: { gt: user.brithYear! - 5, lt: user.brithYear! + 5 },
          },
        }),
    });

  return <ButtonGroups options={filters} />;
};

export default Filter;
