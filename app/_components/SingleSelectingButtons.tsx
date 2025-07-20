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
  title?: String;
}

const SingleSelectingButtons = ({
  options,
  selectedValue,
  toggleSelected,
  title,
}: Props) => {
  const collapseNumber = 10;
  const [collapse, setCollapse] = useState(true);
  if (options.length > collapseNumber && collapse) {
    options = [...options.slice(0, collapseNumber)];
  }

  const { theme } = useTheme();

  const buttonClass =
    "py-3 px-4 inline-flex items-center gap-x-2 text-sm focus:z-10 border  " +
    (theme === "light"
      ? "border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50"
      : "");

  return (
    <div className="max-w-sm w-44 flex flex-col rounded-lg shadow-sm">
      {title && (
        <button
          className={buttonClass + " text-white font-bold rounded-t-xl"}
          style={{ backgroundColor: "var(--accent-8)" }}
        >
          {title}
        </button>
      )}
      {options.map((option, index) => (
        <button
          type="button"
          className={
            buttonClass + (index === options.length - 1 ? " rounded-b-xl" : "")
          }
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
