import { Box, Container, Flex } from "@radix-ui/themes";
import TimeLine from "./Timeline";
import Filters from "./filter/Filters";

export default async function Home() {
  return (
    <>
      <Container>
        <Flex gap="3">
          <TimeLine />
          <Box
            display={{ initial: "none", sm: "block" }}
            className="relative w-60 overflow-y-scroll"
          >
            <Box>
              <Box className="overflow-y-scroll fixed h-screen pb-24">
                <Filters />
              </Box>
            </Box>
          </Box>
        </Flex>
      </Container>
    </>
  );
}
