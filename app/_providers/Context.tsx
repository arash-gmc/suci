"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { PropsWithChildren, useEffect, useState } from "react";

interface Context {
  viewer: User | null;
  status: "authenticated" | "unauthenticated" | "loading";
}

export const Context = React.createContext<Context>({} as Context);

const ContextProvider = ({ children }: PropsWithChildren) => {
  const { data: session, status } = useSession();
  const [viewer, setViewer] = useState<User | null>(null);
  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get<User>("/api/user/getOne", {
          headers: { userId: session?.user.id },
        })
        .then((res) => setViewer(res.data));
    }
  }, [status]);
  return (
    <Context.Provider value={{ viewer, status }}>{children}</Context.Provider>
  );
};

export default ContextProvider;
