import { Flex } from "@radix-ui/themes";
import NewPost from "./NewPost";
import prisma from "@/prisma/client";
import TimeLine from "./TimeLine";

export default async function Home() {
  return <TimeLine />;
}
