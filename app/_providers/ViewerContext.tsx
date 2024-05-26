"use client";
import { Prisma, User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { ReactNode, useEffect, useState } from "react";
import { PostFiltersObject } from "../(main)/filter/Filters";

interface ViewerContextType {
  viewer: User | null | undefined;
  selectedFilters: PostFiltersObject;
  setSelectedFilters: React.Dispatch<React.SetStateAction<PostFiltersObject>>;
}

export const ViewerContext = React.createContext<ViewerContextType>(
  {} as ViewerContextType
);
interface Props {
  children: ReactNode;
}
const ViewerContextProvider = ({ children }: Props) => {
  const { data: rawUser, status } = useSession();
  const [viewer, setViewer] = useState<User | null | undefined>(undefined);
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
    <ViewerContext.Provider
      value={{
        viewer,
        selectedFilters,
        setSelectedFilters,
      }}
    >
      {children}
    </ViewerContext.Provider>
  );
};

export default ViewerContextProvider;
