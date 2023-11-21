"use client";
import PostTable from "@/components/PostTable";
import { Prisma } from "@prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
import Filter from "./Filter";
import { PostsWithUsers } from "./interfaces";
import { Box, Flex, Grid } from "@radix-ui/themes";

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
        <PostTable posts={posts} />
      </Box>

      <Filter setWhere={setWhere} />
    </Flex>
  );
};

export default TimeLine;
