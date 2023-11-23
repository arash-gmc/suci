import { Button } from "@radix-ui/themes";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import React, { useState } from "react";

const UploadTest = () => {
  const [publicId, setPublicId] = useState("njva9rsrvzdxfvljc7w8");
  return (
    <>
      <CldUploadWidget
        uploadPreset="qxnmut04"
        options={{
          cropping: true,
          croppingAspectRatio: 1,
        }}
        onUpload={(result, widget) => {
          if (result.event !== "success") return;
          const info = result.info as { public_id: string };
          setPublicId(info.public_id);
          console.log(result);
        }}
      >
        {({ open }) => <Button onClick={() => open()}>Upload</Button>}
      </CldUploadWidget>
      {publicId && (
        <CldImage
          src={publicId}
          width="300"
          height="300"
          crop="thumb"
          alt="arash"
        />
      )}
    </>
  );
};

export default UploadTest;
