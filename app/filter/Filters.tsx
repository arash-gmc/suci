"use client";
import { useContext, useEffect, useState } from "react";
import MultiSelectingButtons from "../_components/MultiSelectingButtons";
import { Context } from "../_providers/Context";
import axios from "axios";
import SingleSelectingButtons from "../_components/SingleSelectingButtons";
import { Flex } from "@radix-ui/themes";
import AddList, { FetchedList } from "./AddList";
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

  const [selectedFilters, setSelectedFilters] = useState<Statuses>({
    all: true,
    age: false,
    city: false,
    boys: false,
    girls: false,
    reposts: true,
  });

  const [followings, setFollowings] = useState<string[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  const [fetchedLists, setFetchedLists] = useState<FetchedList[]>([]);
  const [selectedList, setSelectedList] = useState("all");
  useEffect(() => {
    if (viewer) {
      axios
        .get<string[]>("/api/user/follow/list-string", {
          headers: { userId: viewer.id, relation: "following" },
        })
        .then((res) => {
          setFollowings(res.data);
        });
      axios
        .get<string[]>("/api/user/follow/list-string", {
          headers: { userId: viewer.id, relation: "follower" },
        })
        .then((res) => setFollowers(res.data));
      axios
        .get<FetchedList[]>("/api/list", { headers: { userId: viewer?.id } })
        .then((res) => setFetchedLists(res.data));
    }
  }, [viewer]);

  const listsOptions: { label: string; value: string }[] = [
    { label: "All", value: "all" },
    { label: "Following", value: "following" },
    { label: "Followers", value: "follower" },
  ];
  fetchedLists.forEach((list) =>
    listsOptions.push({ label: list.name, value: list.id })
  );

  useEffect(() => {
    setWhere({
      author: {
        AND: [
          {
            brithYear:
              selectedFilters.age && viewer?.brithYear
                ? { gt: viewer?.brithYear - 5, lt: viewer?.brithYear + 5 }
                : undefined,
          },
          {
            city:
              selectedFilters.city && viewer?.city ? viewer.city : undefined,
          },
          {
            gender: selectedFilters.boys
              ? "male"
              : selectedFilters.girls
              ? "female"
              : undefined,
          },
          {
            id:
              selectedList === "all"
                ? undefined
                : {
                    in:
                      selectedList === "following"
                        ? followings
                        : selectedList === "follower"
                        ? followers
                        : fetchedLists.find((list) => list.id === selectedList)
                        ? fetchedLists.find((list) => list.id === selectedList)
                            ?.members
                        : undefined,
                  },
          },
        ],
      },
      refId: selectedFilters.reposts ? undefined : null,
    });
  }, [selectedFilters, selectedList]);

  const toggleStatus = (filter: filters) =>
    filter === "all"
      ? setSelectedFilters({
          all: true,
          age: false,
          city: false,
          boys: false,
          girls: false,
          reposts: true,
        })
      : filter === "boys"
      ? setSelectedFilters((prev) => ({
          ...prev,
          boys: !prev.boys,
          girls: false,
          all: false,
        }))
      : filter === "girls"
      ? setSelectedFilters((prev) => ({
          ...prev,
          boys: false,
          girls: !prev.girls,
          all: false,
        }))
      : setSelectedFilters((prev) => ({
          ...prev,
          [filter]: !prev[filter],
          all: false,
        }));

  if (!viewer) return null;
  return (
    <Flex
      direction="column"
      gap="2"
    >
      <MultiSelectingButtons
        options={options}
        status={selectedFilters}
        toggleStatus={toggleStatus}
      />
      <SingleSelectingButtons
        options={listsOptions}
        selectedValue={selectedList}
        toggleSelected={(selected) => setSelectedList(selected)}
      />
      <AddList add={(list) => setFetchedLists((prev) => [...prev, list])} />
    </Flex>
  );
};

export default Filters;
