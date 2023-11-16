"use client";
import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const fields = [
    { label: "Name", value: "name", type: "text" },
    { label: "Email", value: "email", type: "email" },
    { label: "Password", value: "password", type: "password" },
  ];

  const { register, handleSubmit } = useForm();
  const router = useRouter();
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/api/user", data);
        router.push("/api/auth/signin");
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
