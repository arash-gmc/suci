import { Avatar, Box, Container, Flex, Text } from "@radix-ui/themes";
import { CldImage } from "next-cloudinary";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { FaRegComment, FaRetweet } from "react-icons/fa6";
import React from "react";

const Tweet = () => {
  return (
    <Container>
      <Flex gap="3" mx="5" className="border-b-2 pb-6">
        <Flex direction="column">
          <CldImage
            src="njva9rsrvzdxfvljc7w8"
            width={76}
            height={76}
            crop="thumb"
            className="rounded-full mt-3"
            alt="profile-picture"
          />
        </Flex>

        <Flex
          direction="column"
          gap="2"
          className="max-h-26 overflow-hidden"
          width="100%"
        >
          <Flex align="baseline" gap="2">
            <Text size="4" className="font-bold">
              Arash Ghamisi
            </Text>
            <Text size="1" color="gray">
              @arash_gm30
            </Text>
            <Text size="1" color="gray" ml="1">
              1h
            </Text>
          </Flex>
          <Text>
            What an exhouting day! Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Placeat unde maiores sit doloremque hic! Similique
            praesentium veniam ipsum, nisi temporibus soluta porro magni fugit
            provident molestias accusantium eligendi unde debitis quidem, autem
            est exercitationem ut dolorum perspiciatis voluptatibus architecto
            consectetur nihil quae! Deserunt natus, quam placeat deleniti
            consectetur ad perferendis sint eos corporis quae minus beatae
            voluptatibus corrupti nulla, provident maxime vitae tempora
            quibusdam est iure commodi pariatur doloremque recusandae. Quasi
            quod, quaerat odit illum iusto molestias quas molestiae similique
            labore quibusdam ab laborum fugit consequuntur quos sequi optio
            velit aliquid sint. Dolorum earum ratione ut excepturi nam
            necessitatibus laborum?
          </Text>
          <Flex justify="center" className="text-2xl" gap="8" align="center">
            <BiLike />
            <BiDislike />
            <FaRetweet />
            <FaRegComment />
            <GoBookmark />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Tweet;
