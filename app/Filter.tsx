import ButtonGroups from "@/components/ButtonGroup";
import React, { SetStateAction, useEffect, useState } from "react";
import { FilterObject } from "./interfaces";
import axios from "axios";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";

interface Props {
  setWhere: (value: SetStateAction<Prisma.PostsWhereInput>) => void;
}

const Filter = ({ setWhere }: Props) => {
  const [followings, setFollowings] = useState<string[]>([]);
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated")
      axios
        .get("/api/user/followings", { headers: { userId: session?.user.id } })
        .then((res) => setFollowings(res.data));
  }, [status]);

  const filters: FilterObject[] = [
    { label: "All", value: "all", onClick: () => setWhere({}) },
    {
      label: "Followings",
      value: "followings",
      onClick: () => setWhere({ authorId: { in: followings } }),
    },
  ];

  if (status === "authenticated")
    return (
      <div className="fixed right-5">
        <ButtonGroups options={filters} />
      </div>
    );
  return null;
};

export default Filter;
