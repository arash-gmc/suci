import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import NavBar from "./NavBar";
import Session from "./_providers/Session";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Suci",
  description: "Social Media for all intersts",
};

export default function RootLayout({
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
          <NavBar />
          <Session>
            <Container>{children}</Container>
          </Session>
        </Theme>
      </body>
    </html>
  );
}
