import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import ContextProvider from "../_providers/Context";
import { getServerSession } from "next-auth";
import { nextauthConfig } from "../api/auth/[...nextauth]/route";

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
          <ContextProvider session={session}>{children}</ContextProvider>
        </Theme>
      </body>
    </html>
  );
}
