"use client";
import UploadProfile from "@/app/_components/UploadProfile";
import { Context } from "@/app/_providers/Context";
import { Flex, Button } from "@radix-ui/themes";
import { CldImage } from "next-cloudinary";
import React, { useContext, useState } from "react";

const ChangePicture = () => {
  const [publicId, setPublicId] = useState<string | null>(null);
  const { viewer } = useContext(Context);
  useEffect(() => {
    if (viewer) {
      setPublicId(viewer.imagePublicId);
    }
  }, [viewer]);
  return (
    <Flex
      className="mt-4"
      align="center"
    >
      <Flex
        className="w-1/3"
        align="center"
      >
        Profile Picture
      </Flex>
      <Flex
        className="w-full"
        align="center"
        gap="5"
      >
        <UploadProfile passPublicId={(pId) => setPublicId(pId)} />

        {publicId && (
          <CldImage
            src={publicId}
            width={68}
            height={68}
            crop="thumb"
            className="rounded-full"
            alt="profile-picture"
          />
        )}
        {publicId && (
          <Button
            variant="soft"
            onClick={() => setPublicId(null)}
          >
            Remove
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default ChangePicture;

function useEffect(
  arg0: () => void,
  arg1: ({
    id: string;
    name: string | null;
    hashedPassword: string;
    email: string | null;
    username: string;
    emailVerified: Date | null;
    image: string | null;
    imagePublicId: string | null;
    brithYear: number | null;
    city: string | null;
    gender: import(".prisma/client").$Enums.Gender | null;
  } | null)[]
) {
  throw new Error("Function not implemented.");
}
