import React, { useEffect, useState } from "react";
import Image from "next/image";
// import balls from "../../public/balls.svg";
import { Flex } from "@radix-ui/themes";

const LoadingBalls = () => {
  const [svgContent, setSvgContent] = useState("");

  useEffect(() => {
    fetch("../../public/balls.svg")
      .then((res) => res.text())
      .then(setSvgContent);
  }, []);
  return (
    <Flex justify="center" className="h-screen">
      <Image src="/balls.svg" alt="Loading..." height={100} width={100} />
    </Flex>
  );
};

export default LoadingBalls;
