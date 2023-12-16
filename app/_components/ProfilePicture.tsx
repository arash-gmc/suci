"use client";
import { User } from "@prisma/client";
import { Avatar } from "@radix-ui/themes";
import { CldImage } from "next-cloudinary";
import React from "react";

interface Props {
  user: User;
  size: "sm" | "md" | "lg";
}

const ProfilePicture = ({ user, size }: Props) => {
  const sizeMap: Record<
    string,
    {
      picture: number;
      avatar: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
    }
  > = {
    sm: { picture: 44, avatar: "3" },
    md: { picture: 76, avatar: "5" },
    lg: { picture: 174, avatar: "9" },
  };
  if (!user.imagePublicId) {
    let color: "gray" | "indigo" | "pink" = "gray";
    let fallback = "?";

    if (user.gender === "male") color = "indigo";
    if (user.gender === "female") color = "pink";
    if (user.name) {
      const nameChuncks = user.name.trim().split(" ");
      let fallback = "";
      nameChuncks.forEach((c) => (fallback += c[0]));
    }
    if (user.name) fallback = user.name[0];
    return (
      <Avatar
        variant="solid"
        color={color}
        radius="full"
        size={sizeMap[size].avatar}
        fallback={fallback}
      />
    );
  }
  return (
    <CldImage
      src={user.imagePublicId}
      width={sizeMap[size].picture}
      height={sizeMap[size].picture}
      crop="thumb"
      className="rounded-full"
      alt="profile-picture"
    />
  );
};

export default ProfilePicture;
