"use client";
import { Box, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import NewPost from "./posts/_components/NewPost";
import { PostAndRef } from "./interfaces";
import PostsGrid from "./posts/_components/PostsGrid";
import { Context } from "../_providers/Context";
import Filters from "./filter/Filters";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../_components/Spinner";

const TimeLine = () => {
  const [posts, setPosts] = useState<PostAndRef[]>([]);

  const [isLoading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;
  const { where } = useContext(Context);

  useEffect(() => {
    setLoading(true);
    if (where) {
      setPage(0);
      setPosts([]);
      axios
        .post<PostAndRef[]>("/api/post/get-all", { where, page: 0, pageSize })
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
    }
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
    <Box width="100%">
      <NewPost setPosts={setPosts} />
      <InfiniteScroll
        dataLength={posts.length}
        hasMore={page < totalPages}
        loader={
          <Flex
            justify="center"
            m="3"
          >
            {!isLoading && <Spinner />}
          </Flex>
        }
        next={loadMore}
      >
        <PostsGrid
          posts={posts}
          isLoading={isLoading}
        />
      </InfiniteScroll>
    </Box>
  );
};

export default TimeLine;
