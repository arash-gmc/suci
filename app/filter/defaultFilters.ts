import { SetStateAction } from "react";
import { ButtonGroupProps } from "../interfaces";
import { Prisma, User } from "@prisma/client";

interface Props {
  setWhere: (value: SetStateAction<Prisma.PostsWhereInput>) => void;
  followings: string[];
  followers: string[];
  user: User | null;
}

export function getFilters({ setWhere, followings, followers, user }: Props) {
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

  return filters;
}
