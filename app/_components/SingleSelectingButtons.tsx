"use client";
import { CheckIcon } from "@radix-ui/react-icons";
import {
  ButtonsLabel,
  PostFiltersObject,
  PostFilters,
} from "../(main)/filter/Filters";
import { useState } from "react";
import useTheme from "next-theme";

interface Props {
  options: { label: string; value: string }[];
  selectedValue: string;
  toggleSelected: (selectedValue: string) => void;
}

const SingleSelectingButtons = ({
  options,
  selectedValue,
  toggleSelected,
}: Props) => {
  const collapseNumber = 10;
  const [collapse, setCollapse] = useState(true);
  if (options.length > collapseNumber && collapse) {
    options = [...options.slice(0, collapseNumber)];
  }

  const { theme } = useTheme();

  const buttonClass =
    "py-3 px-4 inline-flex items-center gap-x-2 rounded-t-md text-sm font-medium focus:z-10 border  " +
    (theme === "light"
      ? "border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
      : "");

  return (
    <div className="max-w-sm w-44 flex flex-col rounded-lg shadow-sm">
      {options.map((option) => (
        <button
          type="button"
          className={buttonClass}
          key={option.value}
          onClick={() => {
            toggleSelected(option.value);
          }}
        >
          {selectedValue === option.value && <CheckIcon />}
          {option.label}
        </button>
      ))}
      {collapse && options.length >= collapseNumber && (
        <button className={buttonClass} onClick={() => setCollapse(false)}>
          ...more
        </button>
      )}
    </div>
  );
};

export default SingleSelectingButtons;
