"use client";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-theme";
import React, { PropsWithChildren } from "react";

const ThemeProviderComponent = ({ children }: PropsWithChildren) => {
  const darkMode = true;

  if (darkMode)
    return (
      <ThemeProvider attribute="class">
        <Theme accentColor="cyan" grayColor="slate" radius="large">
          {children}
        </Theme>
      </ThemeProvider>
    );
};

export default ThemeProviderComponent;
