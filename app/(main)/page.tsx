import { Box, Container, Flex } from "@radix-ui/themes";
import TimeLine from "./Timeline";
import Filters from "./filter/Filters";
import GuestWelcome from "./GuestWelcome";

export default async function Home() {
  return (
    <Box
      style={{ backgroundColor: "var(--gray-3)" }}
      pt={{ initial: "0", sm: "6" }}
    >
      <Container>
        <Flex gap="3">
          <TimeLine />
          <Box
            display={{ initial: "none", sm: "block" }}
            className="relative w-60 overflow-y-auto"
          >
            <Box>
              <Box className="overflow-y-auto fixed h-screen pb-20">
                <Filters />
              </Box>
            </Box>
          </Box>
        </Flex>
        <GuestWelcome />
      </Container>
    </Box>
  );
}
