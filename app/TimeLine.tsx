"use client";
import PostTable from "@/components/PostTable";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { PostsWithUsers } from "./Interfaces";

const TimeLine = () => {
  const [posts, setPosts] = useState<PostsWithUsers[]>([]);
  useEffect(() => {
    axios.get<PostsWithUsers[]>("/api/post").then((res) => setPosts(res.data));
  }, []);
  return <PostTable posts={posts} />;
};

export default TimeLine;
