"use client";
import React from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { Button } from "@radix-ui/themes";

interface Info {
  public_id: string;
}

const page = () => {
  return (
    <>
      <CldUploadWidget
        uploadPreset="qxnmut04"
        options={{
          sources: ["local"],
          multiple: false,
          cropping: true,
          croppingAspectRatio: 1,
        }}
        onUpload={(result, widget) => {
          if (result.event !== "success") return;
          const info = result.info as Info;
          console.log(info, result);
        }}
      >
        {({ open }) => <Button onClick={() => open()}>Upload</Button>}
      </CldUploadWidget>
      <CldImage
        src="lqzrb4sfnb1zybkuff6a"
        width={600}
        height={800}
        alt="arash"
      />
    </>
  );
};

export default page;
