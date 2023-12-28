import { Flex } from "@radix-ui/themes";
import React from "react";
import { number } from "zod";

interface Props {
  curr: Date;
  prev: Date;
}
const months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const weekdays: string[] = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
const DisplayDate = ({ curr, prev }: Props) => {
  const current = new Date(curr);
  const previous = new Date(prev);
  if (
    current.getDate() === previous.getDate() &&
    current.getMonth() === previous.getMonth() &&
    current.getFullYear() === previous.getFullYear()
  )
    return null;
  return (
    <Flex
      justify="center"
      className="text-slate-500 text-sm"
      width="100%"
      gap="2"
      my="2"
    >
      <span>{weekdays[current.getDay()]}</span>
      <span>
        {current.getDate()} {months[current.getMonth()]}
      </span>
      {current.getFullYear() !== new Date().getFullYear() ? (
        <span>current.getFullYear()</span>
      ) : null}
    </Flex>
  );
};

export default DisplayDate;
