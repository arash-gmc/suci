"use client";
import PostTable from "@/components/PostTable";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FilterObject, PostsWithUsers } from "./Interfaces";
import FilterList from "@/components/ButtonGroup";
import { Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";

const TimeLine = () => {
  const [followings, setFollowings] = useState<string[]>([]);
  const filters: FilterObject[] = [
    { label: "All", value: "all", where: {} },
    {
      label: "Followings",
      value: "followings",
      where: { authorId: { in: followings } },
    },
  ];
  const { data: session, status } = useSession();
  const [posts, setPosts] = useState<PostsWithUsers[]>([]);
  const [where, setWhere] = useState<Prisma.PostsWhereInput>({});
  useEffect(() => {
    if (status === "authenticated")
      axios
        .get("/api/user/followings", { headers: { userId: session?.user.id } })
        .then((res) => setFollowings(res.data));
  }, [status]);
  useEffect(() => {
    axios
      .post<PostsWithUsers[]>("/api/post/complex", where)
      .then((res) => setPosts(res.data));
  }, [where]);
  return (
    <>
      <PostTable posts={posts} />
      <div className="fixed right-5">
        {status === "authenticated" && (
          <FilterList setWhere={setWhere} filters={filters} />
        )}
      </div>
    </>
  );
};

export default TimeLine;
