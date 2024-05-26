"use client";
import { Prisma } from "@prisma/client";
import React, { ReactNode, useState } from "react";

interface PostFilterContextType {
  whereObj: Prisma.PostsWhereInput;
  setWhereObj: React.Dispatch<React.SetStateAction<Prisma.PostsWhereInput>>;
}

export const PostFilterContext = React.createContext<PostFilterContextType>(
  {} as PostFilterContextType
);
interface Props {
  children: ReactNode;
}
const PostFilterContextProvider = ({ children }: Props) => {
  const [whereObj, setWhereObj] = useState<Prisma.PostsWhereInput>({});

  return (
    <PostFilterContext.Provider
      value={{
        whereObj: whereObj,
        setWhereObj: setWhereObj,
      }}
    >
      {children}
    </PostFilterContext.Provider>
  );
};

export default PostFilterContextProvider;
