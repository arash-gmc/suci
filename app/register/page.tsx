"use client";
import { Box, Button, Flex, TextField } from "@radix-ui/themes";
import React from "react";

const page = () => {
  const fields = [
    { label: "Name", value: "name" },
    { label: "Email", value: "email" },
    { label: "Password", value: "password" },
    { label: "Repeat Passwor", value: "repeatPassword" },
  ];
  return (
    <form>
      <h1 className="text-center my-10">Register with Suci</h1>
      <Flex gap="5" direction="column" className="max-w-2xl mx-auto">
        {fields.map((field) => (
          <TextField.Input
            key={field.value}
            placeholder={field.label}
            size="3"
          />
        ))}
        <Flex>
          <Button size="4">Register</Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default page;
