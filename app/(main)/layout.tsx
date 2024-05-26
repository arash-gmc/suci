import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import Session from "../_providers/Session";
import ThemeProviderComponent from "../_providers/Theme";
import ViewerContextProvider from "../_providers/ViewerContext";
import PostFilterContextProvider from "../_providers/PostFilterProvider";
import Main from "./Main";
import "./globals.css";

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
          <ViewerContextProvider>
            <PostFilterContextProvider>
              <ThemeProviderComponent>
                <Main>{children}</Main>
              </ThemeProviderComponent>
            </PostFilterContextProvider>
          </ViewerContextProvider>
        </Session>
      </body>
    </html>
  );
}
