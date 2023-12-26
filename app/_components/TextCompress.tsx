import React from "react";

interface Props {
  children: string | null;
  compressSize?: number;
}
const TextCompress = ({ children, compressSize }: Props) => {
  if (!compressSize) compressSize = 20;
  if (!children) return null;
  if (compressSize > children.length) return children;
  return <span>{children.slice(0, compressSize) + " ..."}</span>;
};

export default TextCompress;
