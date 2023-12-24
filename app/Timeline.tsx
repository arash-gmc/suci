"use client";
import { Box, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import NewPost from "./posts/_components/NewPost";
import { PostAndRef } from "./interfaces";
import PostsGrid from "./posts/_components/PostsGrid";
import { Context } from "./_providers/Context";
import Filters from "./filter/Filters";

const TimeLine = () => {
  const [posts, setPosts] = useState<PostAndRef[]>([]);

  const [isLoading, setLoading] = useState<boolean>(true);
  const { where } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .post<PostAndRef[]>("/api/post/get-all", where)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((e) =>
        console.log("there is a problem with getting posts from api.", e)
      )
      .finally(() => setLoading(false));
  }, [where]);
  return (
    <Flex gap="3">
      <Box width="100%">
        <NewPost setPosts={setPosts} />
        <PostsGrid
          posts={posts}
          isLoading={isLoading}
        />
      </Box>
      <Box display={{ initial: "none", sm: "block" }}>
        <Filters />
      </Box>
    </Flex>
  );
};

export default TimeLine;
