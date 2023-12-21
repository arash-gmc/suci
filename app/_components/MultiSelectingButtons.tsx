"use client";
import { CheckIcon } from "@radix-ui/react-icons";
import { ButtonsLabel, Statuses, filters } from "../filter/Filters";
import { useState } from "react";

interface Props {
  options: { label: string; value: filters }[];
  status: Statuses;
  toggleStatus: (filter: filters) => void;
}

const MultiSelectingButtons = ({ options, status, toggleStatus }: Props) => {
  const collapseNumber = 10;
  const [collapse, setCollapse] = useState(true);
  if (options.length > collapseNumber && collapse) {
    options = [...options.slice(0, collapseNumber)];
  }

  return (
    <div className="max-w-sm w-44 flex flex-col rounded-lg shadow-sm">
      {options.map((option) => (
        <button
          type="button"
          className="py-3 px-4 inline-flex items-center gap-x-2 rounded-t-md text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          key={option.value}
          onClick={() => {
            toggleStatus(option.value);
          }}
        >
          {status[option.value] && <CheckIcon />}
          {option.label}
        </button>
      ))}
      {collapse && options.length >= collapseNumber && (
        <button
          className="py-3 px-4 inline-flex items-center gap-x-2 rounded-t-md text-sm font-medium focus:z-10 border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
          onClick={() => setCollapse(false)}
        >
          ...more
        </button>
      )}
    </div>
  );
};

export default MultiSelectingButtons;
