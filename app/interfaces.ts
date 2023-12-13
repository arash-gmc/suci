import { Notification, Posts, Prisma, User } from "@prisma/client";
import React from "react";

interface PostAndAuthor extends Posts {
  author: User;
}

export interface PostAndRef extends Posts {
  author: User;
  postRef: PostAndAuthor;
}

export interface Notif extends Notification {
  fromUser: User;
}

export interface ButtonGroupProps {
  label: string;
  labelIcon?: React.ReactNode;
  value: string;
  onClick: () => void;
}
