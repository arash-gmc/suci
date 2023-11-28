"use client";
import PostTable from "@/app/_components/PostTable";
import { Prisma } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./filter/Filter";
import { PostsWithUsers } from "./interfaces";
import { Box, Flex, Grid } from "@radix-ui/themes";
import PostsGrid from "./_components/PostsGrid";
import NewPost from "./NewPost";

const TimeLine = () => {
  const [posts, setPosts] = useState<PostsWithUsers[]>([]);
  const [where, setWhere] = useState<Prisma.PostsWhereInput>({});

  useEffect(() => {
    axios
      .post<PostsWithUsers[]>("/api/post/complex", where)
      .then((res) => setPosts(res.data));
  }, [where]);
  return (
    <Flex gap="3">
      <Box></Box>
      <Box width="100%">
        <NewPost />
        <PostsGrid posts={posts} />
      </Box>

      <Filter setWhere={setWhere} />
    </Flex>
  );
};

export default TimeLine;
