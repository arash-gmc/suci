import { Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

interface Props {
  children: string | null;
  compressSize?: number;
  moreLink?: string;
}
const TextCompress = ({ children, compressSize, moreLink }: Props) => {
  if (!compressSize) compressSize = 32;
  if (!children) return null;
  if (compressSize + 5 >= children.length) return children;
  return (
    <>
      <span>{children.slice(0, compressSize)} ...</span>
      {moreLink ? (
        <Link href={moreLink}>
          <Text
            weight="bold"
            style={{ color: "var(--accent-9)" }}
            className="whitespace-nowrap pl-2"
          >
            more{">>"}
          </Text>
        </Link>
      ) : (
        <span>...</span>
      )}
    </>
  );
};

export default TextCompress;
