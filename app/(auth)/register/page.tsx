"use client";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { newUserSchema } from "../../api/user/register/schema";
import SelectController from "@/app/_components/SelectController";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import Logo from "@/app/_components/Logo";
import Link from "next/link";
import UploadProfile from "@/app/_components/UploadProfile";

const years: { label: string; value: string }[] = [];
for (let i = 2010; i > 1950; i--) {
  years.push({ label: i.toString(), value: i.toString() });
}

const RegisterPage = () => {
  type InputFields = z.infer<typeof newUserSchema>;
  const [publicId, setPublicId] = useState<string | undefined>();
  const fields: {
    label: string;
    type: React.HTMLInputTypeAttribute;
    value: keyof InputFields;
  }[] = [
    { label: "Name", value: "name", type: "text" },
    { label: "Username", value: "username", type: "text" },
    { label: "Email", value: "email", type: "email" },
    { label: "Password", value: "password", type: "password" },
    { label: "City", value: "city", type: "text" },
  ];
  const onSubmit = async (data: InputFields) => {
    try {
      await axios.post("/api/user/register", {
        ...data,
        imagePublicId: publicId,
      });
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const { register, handleSubmit, control } = useForm<InputFields>();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex gap="4" direction="column" className="max-w-2xl mx-auto">
        <Flex align="center" gap="1" width="100%" justify="center" mb="5">
          <Text className="font-bold" size="5">
            Signup in{" "}
          </Text>
          <Logo size="6" />
        </Flex>

        {fields.map((field) => (
          <TextField.Input
            key={field.value}
            placeholder={field.label}
            size="2"
            type={field.type}
            {...register(field.value)}
          />
        ))}
        <SelectController
          name="gender"
          label="Gender"
          control={control}
          items={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
        <SelectController
          name="brithYear"
          label="Year of Brith"
          control={control}
          items={years}
        />
        <Flex my="2" gap="5" align="center" justify="center">
          <Text>Profile Picture</Text>

          <UploadProfile passPublicId={(pId) => setPublicId(pId)} />
          {publicId && <CheckCircledIcon />}
        </Flex>
        <Flex justify="center">
          <Button size="3">Register</Button>
        </Flex>
        <Flex justify="center" gap="2" align="center">
          Already have an account?
          <Link href="/login">
            <Button size="2" variant="ghost" type="button">
              Sign in
            </Button>
          </Link>
        </Flex>
      </Flex>
    </form>
  );
};

export default RegisterPage;
