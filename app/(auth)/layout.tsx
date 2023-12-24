import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Box, Flex, Theme } from "@radix-ui/themes";

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme
          accentColor="purple"
          grayColor="gray"
          radius="large"
          scaling="105%"
        >
          <Flex
            className=" w-full sm:py-8 min-h-screen"
            justify="center"
            align="start"
            style={{ background: "var(--accent-6)" }}
          >
            <Box className="p-8 sm:rounded-xl bg-slate-50 w-1/4 min-w-fit z-10 max-sm:w-full max-sm:min-h-screen ">
              {children}
            </Box>
          </Flex>
        </Theme>
      </body>
    </html>
  );
}
