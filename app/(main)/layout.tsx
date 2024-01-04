import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Box, Theme } from "@radix-ui/themes";
import Session from "../_providers/Session";
import ContextProvider from "../_providers/Context";
import NavBar from "./navbar/NavBar";
import MiniNavbar from "./navbar/MiniNavbar";

export const metadata: Metadata = {
  title: "Suci",
  description: "Social Media for all intersts",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Theme
          accentColor="purple"
          grayColor="gray"
          radius="large"
        >
          <Session>
            <ContextProvider>
              <Box display={{ initial: "none", sm: "block" }}>
                <NavBar />
              </Box>
              <Box display={{ initial: "block", sm: "none" }}>
                <MiniNavbar />
              </Box>
              <div id="root-div">{children}</div>
            </ContextProvider>
          </Session>
        </Theme>
      </body>
    </html>
  );
}
