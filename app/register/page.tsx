"use client";
import { Button, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import { signIn } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { newUserSchema } from "../api/user/schema";

const RegisterPage = () => {
  type InputFields = z.infer<typeof newUserSchema>;

  const fields: { label: string; type: string; value: keyof InputFields }[] = [
    { label: "Name", value: "name", type: "text" },
    { label: "Email", value: "email", type: "email" },
    { label: "Password", value: "password", type: "password" },
  ];

  const { register, handleSubmit } = useForm<InputFields>();
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
      <h1 className="text-center my-10">Register with Suci</h1>
      <Flex gap="5" direction="column" className="max-w-2xl mx-auto">
        {fields.map((field) => (
          <TextField.Input
            key={field.value}
            placeholder={field.label}
            size="3"
            type={field.type}
            {...register(field.value)}
          />
        ))}
        <Flex>
          <Button size="4">Register</Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default RegisterPage;
