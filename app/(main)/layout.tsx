import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Box, Theme } from "@radix-ui/themes";
import Session from "../_providers/Session";
import ContextProvider from "../_providers/Context";
import NavBar from "./navbar/NavBar";
import MiniNavbar from "./navbar/MiniNavbar";
import ThemeProviderComponent from "../_providers/Theme";
import Main from "./Main";

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
        <Session>
          <ContextProvider>
            <ThemeProviderComponent>
              <Main>{children}</Main>
            </ThemeProviderComponent>
          </ContextProvider>
        </Session>
      </body>
    </html>
  );
}
