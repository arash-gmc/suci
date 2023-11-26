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
  const sizeMap = {
    sm: 60,
    md: 72,
    lg: 180,
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
        size="4"
        fallback={fallback}
      />
    );
  }
  return (
    <CldImage
      src={user.imagePublicId}
      width={sizeMap[size]}
      height={sizeMap[size]}
      crop="thumb"
      className="rounded-full"
      alt="profile-picture"
    />
  );
};

export default ProfilePicture;
