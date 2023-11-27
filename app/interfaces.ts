import { Posts, Prisma, User } from "@prisma/client";
import React from "react";

export interface PostsWithUsers extends Posts {
  author: User;
}

export interface ButtonGroupProps {
  label: string;
  labelIcon?: React.ReactNode;
  value: string;
  onClick: () => void;
}
