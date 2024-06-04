"use client";
import CalloutComponent from "@/app/_components/Callout";
import SelectComponent from "@/app/_components/SelectComponent";
import Spinner from "@/app/_components/Spinner";
import UploadProfile from "@/app/_components/UploadProfile";
import { ViewerContext } from "@/app/_providers/ViewerContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Flex, Heading, Text, TextField } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const years: { label: string; value: string }[] = [];
years.push({ label: "None", value: "0" });
for (let i = 2010; i > 1950; i--) {
  years.push({ label: i.toString(), value: i.toString() });
}

const fieldsScema = z.object({
  name: z.string().min(3).max(255),
  username: z.string().min(3).max(255),
  email: z.string().email(),
  city: z.string().max(255).optional(),
});

const UserInformations = () => {
  const { viewer } = useContext(ViewerContext);
  type InputFields = z.infer<typeof fieldsScema>;
  const { register, formState, handleSubmit } = useForm<InputFields>({
    resolver: zodResolver(fieldsScema),
  });
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
  }[] = [
    { label: "Name", value: "name" },
    { label: "Username", value: "username" },
    { label: "Email", value: "email" },
    { label: "City", value: "city" },
  ];

  const showError = (message: string) => {
    setCalloutColor("red");
    setCalloutMessage(message);
    calloutRef.current?.scrollIntoView();
  };
  const updateUser = (data: InputFields) => {
    if (!viewer) return;
    const sendingObject = {
      id: viewer.id,
      name: data.name,
      username: data.username,
      email: data.email,
      city: data.city,
      brithYear,
      gender,
      publicId,
    };

    setLoading(true);
    axios
      .patch("/api/user/update", sendingObject)
      .then((res) => {
        setCalloutColor("green");
        setCalloutMessage("Your changes has successfully applied.");
        calloutRef.current?.scrollIntoView();
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
      <form onSubmit={handleSubmit((data) => updateUser(data))}>
        <Flex direction="column" gap="5" px={{ initial: "1", sm: "4" }}>
          <Heading my="3">Edit User Informations</Heading>
          {textFields.map((field) => (
            <Flex key={field.value}>
              <Text className="w-1/3">{field.label}</Text>
              <div className="w-full relative">
                <TextField.Root>
                  <TextField.Input
                    defaultValue={viewer[field.value] || ""}
                    placeholder={field.label}
                    {...register(field.value)}
                    className="w-full"
                  />
                </TextField.Root>
                <Text size="1" color="red" className="absolute">
                  {formState.errors[field.value]?.message}
                </Text>
              </div>
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
          <Flex className="mt-4" align="center">
            <Flex className="w-1/3" align="center">
              Profile Picture
            </Flex>
            <Flex className="w-full" align="center" gap="5">
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
                  type="button"
                  variant="soft"
                  onClick={() => setPublicId(null)}
                >
                  Remove
                </Button>
              )}
            </Flex>
          </Flex>

          <Flex className="w-full" my="5" gap="4" justify="end">
            <Link href={"/profile/" + viewer?.username}>
              <Button type="button">Back to Profile</Button>
            </Link>

            <Button disabled={loading}>Apply {loading && <Spinner />}</Button>
          </Flex>

          <Box ref={calloutRef}>
            {!!calloutMessage && (
              <CalloutComponent color={calloutColor} message={calloutMessage} />
            )}
          </Box>
        </Flex>
      </form>
    </Box>
  );
};

export default UserInformations;
