"use client";
import { FilterObject } from "@/app/Interfaces";
import { Prisma } from "@prisma/client";
import React, { SetStateAction } from "react";

interface Props {
  filters: FilterObject[];
  setWhere: (value: SetStateAction<Prisma.PostsWhereInput>) => void;
}

const FilterList = ({ setWhere, filters }: Props) => {
  return (
    <div className="max-w-sm w-44 flex flex-col rounded-lg shadow-sm">
      {filters.map((filter) => (
        <button
          type="button"
          className="py-3 px-4 inline-flex items-center gap-x-2 rounded-t-md text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          key={filter.value}
          onClick={() => setWhere(filter.where)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterList;
