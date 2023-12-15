import { SetStateAction, useEffect, useState } from "react";
import { ButtonGroupProps } from "../interfaces";
import { Prisma, User } from "@prisma/client";
import axios from "axios";
import ButtonGroups from "@/app/_components/ButtonGroup";

interface Props {
  setWhere: (value: SetStateAction<Prisma.PostsWhereInput>) => void;
  user: User | null;
}

const DefaultFilters = ({ setWhere, user }: Props) => {
  const [followings, setFollowings] = useState<string[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  useEffect(() => {
    if (user) {
      axios
        .get("/api/user/followings", {
          headers: { userId: user.id, relation: "following" },
        })
        .then((res) => setFollowings(res.data));
      axios
        .get("/api/user/followings", {
          headers: { userId: user.id, relation: "follower" },
        })
        .then((res) => setFollowers(res.data));
    }
  }, [user]);
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

export default DefaultFilters;
