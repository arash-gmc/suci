"use client";
import CalloutComponent from "@/app/_components/Callout";
import SelectComponent from "@/app/_components/SelectComponent";
import Spinner from "@/app/_components/Spinner";
import UploadProfile from "@/app/_components/UploadProfile";
import { Context } from "@/app/_providers/Context";
import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import React, { Ref, useContext, useEffect, useRef, useState } from "react";

const years: { label: string; value: string }[] = [];
years.push({ label: "None", value: "0" });
for (let i = 2010; i > 1950; i--) {
  years.push({ label: i.toString(), value: i.toString() });
}

const UserInformations = () => {
  const { viewer } = useContext(Context);
  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const calloutRef = useRef<HTMLDivElement>(null);
  const [brithYear, setBrithYear] = useState<string>("0");
  const [gender, setGender] = useState<string>("none");
  const [publicId, setPublicId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [calloutMessage, setCalloutMessage] = useState("");
  const [calloutColor, setCalloutColor] = useState<"blue" | "red" | "green">(
    "blue"
  );
  useEffect(() => {
    if (viewer) {
      setGender(viewer?.gender || "none");
      setBrithYear(viewer?.brithYear ? viewer?.brithYear + "" : "0");
      setPublicId(viewer.imagePublicId);
    }
  }, [viewer]);
  const textFields: {
    label: string;
    value: "name" | "username" | "city" | "email";
    ref: Ref<HTMLInputElement>;
  }[] = [
    { label: "Name", value: "name", ref: nameRef },
    { label: "Username", value: "username", ref: usernameRef },
    { label: "Email", value: "email", ref: emailRef },
    { label: "City", value: "city", ref: cityRef },
  ];

  const showError = (message: string) => {
    setCalloutColor("red");
    setCalloutMessage(message);
    calloutRef.current?.scrollIntoView();
  };
  const updateUser = () => {
    if (!viewer) return;
    if (nameRef.current?.value === "")
      return showError("name field must have a value");
    if (usernameRef.current?.value === "")
      return showError("username field must have a value");
    if (emailRef.current?.value === "")
      return showError("email field must have a value");

    setLoading(true);
    axios
      .patch("/api/user/update", {
        id: viewer.id,
        name: nameRef.current?.value,
        username: usernameRef.current?.value,
        email: emailRef.current?.value,
        city: cityRef.current?.value,
        brithYear,
        gender,
        publicId,
      })
      .then((res) => {
        setCalloutColor("green");
        setCalloutMessage("Your changes has successfully applied.");
      })
      .catch((error: AxiosError) => {
        showError(
          typeof error.response?.data === "string"
            ? error.response?.data
            : "There is a problem with changing your profile. Change values and try aggain."
        );
      })
      .finally(() => setLoading(false));
  };
  if (!viewer) return null;
  return (
    <Box className="w-full md:w-2/3">
      <Flex
        direction="column"
        gap="3"
        px={{ initial: "1", sm: "4" }}
      >
        <Heading my="3">Edit User Informations</Heading>
        {textFields.map((field) => (
          <Flex key={field.value}>
            <Text className="w-1/3">{field.label}</Text>
            <TextField.Root className="w-full">
              <TextField.Input
                defaultValue={viewer[field.value] || ""}
                placeholder={field.label}
                ref={field.ref}
                className="w-full"
              />
            </TextField.Root>
          </Flex>
        ))}
        <Flex>
          <Text className="w-1/3">Brith Year</Text>
          <Flex className="w-full">
            <SelectComponent
              defaultValue={viewer.brithYear + ""}
              setState={setBrithYear}
              state={brithYear}
              items={years}
              label="Year of Brith"
            />
          </Flex>
        </Flex>
        <Flex>
          <Text className="w-1/3">Gender</Text>
          <Flex className="w-full">
            <SelectComponent
              defaultValue={viewer.gender}
              setState={setGender}
              state={gender}
              items={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "None", value: "none" },
              ]}
              label="Gender"
            />
          </Flex>
        </Flex>
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

        <Flex
          className="w-full"
          my="5"
          gap="4"
          justify="end"
        >
          <Link href={"/profile/" + viewer?.username}>
            <Button>Back to Profile</Button>
          </Link>

          <Button
            onClick={updateUser}
            disabled={loading}
          >
            Apply {loading && <Spinner />}
          </Button>
        </Flex>

        <Box ref={calloutRef}>
          {!!calloutMessage && (
            <CalloutComponent
              color={calloutColor}
              message={calloutMessage}
            />
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default UserInformations;
