"use client";
import { ButtonGroupProps } from "@/app/interfaces";
import { useState } from "react";

interface Props {
  options: ButtonGroupProps[];
}

const ButtonGroups = ({ options }: Props) => {
  const collapseNumber = 3;
  const [collapse, setCollapse] = useState(true);
  if (options.length > collapseNumber && collapse) {
    options = [...options.slice(0, collapseNumber)];
    options.push({
      label: "... More",
      value: "more",
      onClick: () => setCollapse(false),
    });
  }
  return (
    <div className="max-w-sm w-44 flex flex-col rounded-lg shadow-sm">
      {options.map((option) => (
        <button
          type="button"
          className="py-3 px-4 inline-flex items-center gap-x-2 rounded-t-md text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          key={option.value}
          onClick={() => option.onClick()}
        >
          {option.labelIcon} {option.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroups;
