import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Box, Container, Theme, ThemePanel } from "@radix-ui/themes";
import NavBar from "./NavBar";
import Session from "./_providers/Session";
import ContextProvider from "./_providers/Context";
import { getServerSession } from "next-auth";
import { nextauthConfig } from "./api/auth/[...nextauth]/route";
import MiniNavbar from "./MiniNavbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Suci",
  description: "Social Media for all intersts",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(nextauthConfig);

  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme
          accentColor="purple"
          grayColor="gray"
          radius="large"
          scaling="105%"
        >
          <ContextProvider session={session}>
            <Box display={{ initial: "none", sm: "block" }}>
              <NavBar />
            </Box>
            <Box display={{ initial: "block", sm: "none" }}>
              <MiniNavbar />
            </Box>
            <Box pt="6">{children}</Box>
          </ContextProvider>
        </Theme>
      </body>
    </html>
  );
}
