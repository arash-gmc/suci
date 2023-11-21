"use client";
import PostTable from "@/components/PostTable";
import { Prisma } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import { PostsWithUsers } from "./interfaces";

const TimeLine = () => {
  const [posts, setPosts] = useState<PostsWithUsers[]>([]);
  const [where, setWhere] = useState<Prisma.PostsWhereInput>({});

  useEffect(() => {
    axios
      .post<PostsWithUsers[]>("/api/post/complex", where)
      .then((res) => setPosts(res.data));
  }, [where]);
  return (
    <>
      <PostTable posts={posts} />

      <Filter setWhere={setWhere} />
    </>
  );
};

export default TimeLine;
