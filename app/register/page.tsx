"use client";
import {
  Button,
  Flex,
  Grid,
  Heading,
  Select,
  TextField,
} from "@radix-ui/themes";
import axios from "axios";
import { signIn } from "next-auth/react";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { newUserSchema } from "../api/user/schema";
import SelectComponent from "@/components/Select";

const years: { label: string; value: string }[] = [];
for (let i = 2010; i > 1950; i--) {
  years.push({ label: i.toString(), value: i.toString() });
}

const RegisterPage = () => {
  type InputFields = z.infer<typeof newUserSchema>;

  const fields: {
    label: string;
    type: React.HTMLInputTypeAttribute;
    value: keyof InputFields;
  }[] = [
    { label: "Name", value: "name", type: "text" },
    { label: "Email", value: "email", type: "email" },
    { label: "Password", value: "password", type: "password" },
    { label: "City", value: "city", type: "text" },
  ];

  const { register, handleSubmit, control } = useForm<InputFields>();
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/user", data);
        await signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: "/",
        });
      })}
    >
      <Flex gap="4" direction="column" className="max-w-2xl mx-auto">
        <Heading my="5" size="5">
          Register with Suci
        </Heading>
        {fields.map((field) => (
          <TextField.Input
            key={field.value}
            placeholder={field.label}
            size="2"
            type={field.type}
            {...register(field.value)}
          />
        ))}
        <SelectComponent
          name="gender"
          label="Gender"
          control={control}
          items={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
          ]}
        />
        <SelectComponent
          name="brithYear"
          label="Year of Brith"
          control={control}
          items={years}
        />
        <Flex>
          <Button size="3">Register</Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default RegisterPage;
