"use client";
import { Prisma, User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { ReactNode, useEffect, useState } from "react";
import { PostFiltersObject } from "../(main)/filter/Filters";

interface Context {
  viewer: User | null | undefined;
  where: Prisma.PostsWhereInput;
  setWhere: React.Dispatch<React.SetStateAction<Prisma.PostsWhereInput>>;
  selectedFilters: PostFiltersObject;
  setSelectedFilters: React.Dispatch<React.SetStateAction<PostFiltersObject>>;
}

export const Context = React.createContext<Context>({} as Context);
interface Props {
  children: ReactNode;
}
const ContextProvider = ({ children }: Props) => {
  const { data: rawUser, status } = useSession();
  const [viewer, setViewer] = useState<User | null | undefined>(undefined);
  const [where, setWhere] = useState<Prisma.PostsWhereInput>({});
  const [selectedFilters, setSelectedFilters] = useState<PostFiltersObject>({
    all: true,
    age: false,
    city: false,
    boys: false,
    girls: false,
    reposts: true,
  });
  useEffect(() => {
    if (status === "authenticated") {
      const controller = new AbortController();
      axios
        .get<User>("/api/user/getOne", {
          headers: { userId: rawUser.user.id },
          signal: controller.signal,
        })
        .then((res) => setViewer(res.data));
    }
    if (status === "unauthenticated") setViewer(null);
  }, [status]);
  return (
    <Context.Provider
      value={{
        viewer,
        where,
        setWhere,
        selectedFilters,
        setSelectedFilters,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
