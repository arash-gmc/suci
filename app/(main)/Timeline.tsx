"use client";
import { Box, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import NewPost from "./posts/_components/NewPost";
import { PostAndRef } from "./interfaces";
import PostsGrid from "./posts/_components/PostsGrid";
import { Context } from "../_providers/Context";
import Filters from "./filter/Filters";

const TimeLine = () => {
  const [posts, setPosts] = useState<PostAndRef[]>([]);

  const [isLoading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 6;
  const { where } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    setPage(0);
    if (where)
      axios
        .post<PostAndRef[]>("/api/post/get-all", { where, page, pageSize })
        .then((res) => {
          setPosts(res.data);
        })
        .catch((e) =>
          console.log("there is a problem with getting posts from api.", e)
        )
        .finally(() => setLoading(false));
    axios.post<number>("/api/post/count", { where }).then((res) => {
      const total = Math.floor(res.data / pageSize) || 0;
      setTotalPages(total);
    });
  }, [where]);
  const loadMore = () => {
    axios
      .post<PostAndRef[]>("/api/post/get-all", {
        where,
        page: page + 1,
        pageSize,
      })
      .then((res) => {
        setPosts((prev) => [...prev, ...res.data]);
      });
    setPage((prev) => prev + 1);
  };
  return (
    <Flex gap="3">
      <Box width="100%">
        <NewPost setPosts={setPosts} />
        <PostsGrid
          posts={posts}
          isLoading={isLoading}
        />
        {page < totalPages && (
          <Flex justify="center">
            <button
              className="font-bold text-lg text-slate-600 m-5"
              onClick={() => loadMore()}
            >
              more...
            </button>
          </Flex>
        )}
      </Box>
      <Box display={{ initial: "none", sm: "block" }}>
        <Filters />
      </Box>
    </Flex>
  );
};

export default TimeLine;
