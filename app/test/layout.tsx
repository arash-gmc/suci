import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";

//const inter = Inter({ subsets: ["latin"] });

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
      <body>{children}</body>
    </html>
  );
}
