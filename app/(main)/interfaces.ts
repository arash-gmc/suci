import {
  Comment,
  Message,
  Notification,
  Posts,
  Prisma,
  User,
} from "@prisma/client";
import React from "react";

export interface PostAndAuthor extends Posts {
  author: User;
}

export interface PostAndRef extends Posts {
  author: User;
  postRef: PostAndAuthor;
}

export interface CommentAndAuthor extends Comment {
  author: User;
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

export interface MessageDeliver extends Message {
  deliver: boolean;
}
