import { Posts, User } from "@prisma/client";

export interface PostsWithUsers extends Posts {
  author: User;
}
