"use client";
import { useContext, useEffect, useState } from "react";
import MultiSelectingButtons from "../../_components/MultiSelectingButtons";
import { Context } from "../../_providers/Context";
import axios from "axios";
import SingleSelectingButtons from "../../_components/SingleSelectingButtons";
import { Flex, Button } from "@radix-ui/themes";
import ListWindow, { FetchedList } from "./ListWindow";
import { PlusIcon } from "@radix-ui/react-icons";
export type PostFilters = "all" | "age" | "city" | "boys" | "girls" | "reposts";
export type PostFiltersObject = Record<PostFilters, boolean>;
export interface ButtonsLabel {
  label: string;
  value: keyof PostFiltersObject;
}

const Filters = () => {
  const { viewer, setWhere, selectedFilters, setSelectedFilters } =
    useContext(Context);
  const options: ButtonsLabel[] = [
    { label: "All", value: "all" },
    { label: "Boys", value: "boys" },
    { label: "Girls", value: "girls" },
    ...(viewer?.brithYear
      ? [{ label: "Around My Age", value: "age" as PostFilters }]
      : []),
    ...(viewer?.city
      ? [{ label: "Live in " + viewer.city, value: "city" as PostFilters }]
      : []),
    { label: "Include Reposts", value: "reposts" },
  ];

  const [followings, setFollowings] = useState<string[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  const [fetchedLists, setFetchedLists] = useState<FetchedList[]>([]);
  const [selectedList, setSelectedList] = useState("all");
  const [fristLoad, setFristLoad] = useState(true);
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
    if (fristLoad) {
      setFristLoad(false);
      return;
    }
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

  const toggleStatus = (filter: PostFilters) =>
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
      {viewer && (
        <SingleSelectingButtons
          options={listsOptions}
          selectedValue={selectedList}
          toggleSelected={(selected) => setSelectedList(selected)}
        />
      )}
      <ListWindow
        postAction={(list) => setFetchedLists((prev) => [...prev, list])}
        trigger={
          <Button variant="outline">
            <PlusIcon />
            Add List
          </Button>
        }
      />
    </Flex>
  );
};

export default Filters;
