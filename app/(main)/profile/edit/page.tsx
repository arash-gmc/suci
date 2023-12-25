"use client";
import SelectComponent from "@/app/_components/SelectComponent";
import { Context } from "@/app/_providers/Context";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import React, { Ref, useContext, useEffect, useRef, useState } from "react";

const years: { label: string; value: string }[] = [];
years.push({ label: "None", value: "0" });
for (let i = 2010; i > 1950; i--) {
  years.push({ label: i.toString(), value: i.toString() });
}

const page = () => {
  const { viewer } = useContext(Context);
  const nameRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const [brithYear, setBrithYear] = useState<string>("0");
  const [gender, setGender] = useState<string>("none");
  useEffect(() => {
    if (viewer) {
      setGender(viewer?.gender || "none");
      setBrithYear(viewer?.brithYear ? viewer?.brithYear + "" : "0");
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
  if (!viewer) return null;
  return (
    <div>
      <Container>
        <Box className="w-full md:w-2/3">
          <Flex
            direction="column"
            gap="3"
            px="4"
          >
            <Heading my="3">Edit your profile</Heading>
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
              <Text className="w-1/3">Year of brith</Text>
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
              justify="center"
              px="3"
              my="5"
            >
              <Button
                onClick={() => {
                  axios
                    .patch("/api/user/update", {
                      id: viewer.id,
                      name: nameRef.current?.value,
                      username: usernameRef.current?.value,
                      email: emailRef.current?.value,
                      city: cityRef.current?.value,
                      brithYear: brithYear,
                      gender: gender,
                    })
                    .then((res) => console.log(res.data));
                }}
              >
                Update
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Container>
    </div>
  );
};

export default page;
