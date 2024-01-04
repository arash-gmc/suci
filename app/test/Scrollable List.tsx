"use client";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../_components/Spinner";

const allNumbers: number[] = [];
for (let index = 0; index < 1000; index++) {
  allNumbers.push(index);
}

const getNumbers = (c: number) =>
  new Promise<number[]>((resolve, reject) => {
    setTimeout(() => {
      const jump = 20;
      resolve(allNumbers.slice(c * jump, c * jump + jump));
    }, 1000);
  });

const Scrollpage = () => {
  useEffect(() => {
    loadNew();
  }, []);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [chuk, setchuk] = useState(0);

  const loadNew = () => {
    getNumbers(chuk)
      .then((res) =>
        setNumbers((prev) => (chuk === 0 ? [...res] : [...prev, ...res]))
      )
      .catch((e) => console.log("ERROR:", e));
    setchuk((prev) => prev + 1);
    console.log(chuk);
  };

  return (
    <Flex justify="center">
      <Flex
        className=" w-52 bg-green-400 h-48 overflow-auto mt-24 "
        id="ss"
        direction="column-reverse"
      >
        <InfiniteScroll
          dataLength={numbers.length}
          hasMore={true}
          loader={<Spinner />}
          next={loadNew}
          style={{ display: "flex", flexDirection: "column-reverse" }}
          scrollableTarget="ss"
          inverse
        >
          {numbers.map((num) => (
            <Text key={num}>{num}</Text>
          ))}
        </InfiniteScroll>
      </Flex>
    </Flex>
  );
};

export default Scrollpage;
