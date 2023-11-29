import React, { SetStateAction, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Prisma, User } from "@prisma/client";
import AddList from "./AddList";
import { Flex } from "@radix-ui/themes";
import DefaultFilters from "./DefaultFilters";
import Lists from "./Lists";
import { Context } from "../_providers/Context";

interface Props {
  setWhere: (value: SetStateAction<Prisma.PostsWhereInput>) => void;
}

const Filter = ({ setWhere }: Props) => {
  const { viewer, status } = useContext(Context);

  if (!viewer) return null;

  return (
    <Flex direction="column" gap="3">
      <DefaultFilters setWhere={setWhere} user={viewer} />
      <Lists setWhere={setWhere} user={viewer} />
      <AddList />
    </Flex>
  );
};

export default Filter;
