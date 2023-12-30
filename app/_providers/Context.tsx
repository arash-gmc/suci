"use client";
import { Prisma, User } from "@prisma/client";
import axios from "axios";
import { Session } from "next-auth";
import React, { ReactNode, useEffect, useState } from "react";

interface Context {
  viewer: User | null;
  where: Prisma.PostsWhereInput;
  setWhere: React.Dispatch<React.SetStateAction<Prisma.PostsWhereInput>>;
}

export const Context = React.createContext<Context>({} as Context);
interface Props {
  children: ReactNode;
  session: Session | null;
}
const ContextProvider = ({ children, session }: Props) => {
  const [viewer, setViewer] = useState<User | null>(null);
  const [where, setWhere] = useState<Prisma.PostsWhereInput>({});
  useEffect(() => {
    if (session) {
      const controller = new AbortController();
      axios
        .get<User>("/api/user/getOne", {
          headers: { userId: session?.user.id },
          signal: controller.signal,
        })
        .then((res) => setViewer(res.data));
    }
  }, [session]);
  return (
    <Context.Provider value={{ viewer, where, setWhere }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
