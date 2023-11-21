import { Posts, Prisma, User } from "@prisma/client";

export interface PostsWithUsers extends Posts {
  author: User;
}

export interface FilterObject {
  label: string;
  value: string;
  where: Prisma.PostsWhereInput;
}
