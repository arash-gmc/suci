"use client";
import React, { useState } from "react";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import { Button } from "@radix-ui/themes";
import Tweet from "../_components/Tweet";

interface Info {
  public_id: string;
}

const page = () => {
  return <Tweet />;
};

export default page;
