"use client";
import { useContext, useEffect, useState } from "react";
import ActiveButtons from "../_components/ActiveButtons";
import { Context } from "../_providers/Context";
export type filters = "all" | "age" | "city" | "boys" | "girls" | "reposts";
export type Statuses = Record<filters, boolean>;
export interface ButtonsLabel {
  label: string;
  value: keyof Statuses;
}
const Filters = () => {
  const { viewer, setWhere } = useContext(Context);
  const options: ButtonsLabel[] = [
    { label: "All", value: "all" },
    { label: "Boys", value: "boys" },
    { label: "Girls", value: "girls" },
  ];

  if (viewer?.brithYear) options.push({ label: "Around My Age", value: "age" });
  if (viewer?.city)
    options.push({ label: "Live in " + viewer.city, value: "city" });
  options.push({ label: "Include Reposts", value: "reposts" });

  const [status, setStatus] = useState<Statuses>({
    all: true,
    age: false,
    city: false,
    boys: false,
    girls: false,
    reposts: true,
  });

  useEffect(() => {
    setWhere({
      author: {
        AND: [
          {
            brithYear:
              status.age && viewer?.brithYear
                ? { gt: viewer?.brithYear - 5, lt: viewer?.brithYear + 5 }
                : undefined,
          },
          { city: status.city && viewer?.city ? viewer.city : undefined },
          {
            gender: status.boys ? "male" : status.girls ? "female" : undefined,
          },
        ],
      },
      refId: status.reposts ? undefined : null,
    });
  }, [status]);
  if (!viewer) return null;
  return (
    <>
      <ActiveButtons
        options={options}
        status={status}
        toggleStatus={(filter) =>
          filter === "all"
            ? setStatus({
                all: true,
                age: false,
                city: false,
                boys: false,
                girls: false,
                reposts: true,
              })
            : filter === "boys"
            ? setStatus((prev) => ({
                ...prev,
                boys: !prev.boys,
                girls: false,
                all: false,
              }))
            : filter === "girls"
            ? setStatus((prev) => ({
                ...prev,
                boys: false,
                girls: !prev.girls,
                all: false,
              }))
            : setStatus((prev) => ({
                ...prev,
                [filter]: !prev[filter],
                all: false,
              }))
        }
      />
    </>
  );
};

export default Filters;
