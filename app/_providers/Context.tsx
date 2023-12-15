"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { Session } from "next-auth";
import React, { ReactNode, useEffect, useState } from "react";

interface Context {
  viewer: User | null;
}

export const Context = React.createContext<Context>({} as Context);
interface Props {
  children: ReactNode;
  session: Session | null;
}
const ContextProvider = ({ children, session }: Props) => {
  const [viewer, setViewer] = useState<User | null>(null);
  useEffect(() => {
    if (session) {
      axios
        .get<User>("/api/user/getOne", {
          headers: { userId: session?.user.id },
        })
        .then((res) => setViewer(res.data));
    }
  }, [session]);
  return <Context.Provider value={{ viewer }}>{children}</Context.Provider>;
};

export default ContextProvider;
