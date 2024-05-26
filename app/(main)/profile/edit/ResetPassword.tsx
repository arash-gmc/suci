"use client";
import CalloutComponent from "@/app/_components/Callout";
import Spinner from "@/app/_components/Spinner";
import { ViewerContext } from "@/app/_providers/ViewerContext";
import {
  Button,
  Callout,
  Container,
  Flex,
  Heading,
  Text,
  TextField,
} from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import React, { Ref, useContext, useRef, useState } from "react";
import { BiArrowBack } from "react-icons/bi";

const ResetPassword = () => {
  const oldPassword = useRef<HTMLInputElement>(null);
  const newPassword1 = useRef<HTMLInputElement>(null);
  const newPassword2 = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [calloutColor, setCalloutColor] = useState<"red" | "green" | "blue">(
    "blue"
  );
  const { viewer } = useContext(ViewerContext);
  const fields: { label: string; value: string; ref: Ref<HTMLInputElement> }[] =
    [
      { label: "Old Password", value: "oldPassword", ref: oldPassword },
      { label: "New Password", value: "newPassword1", ref: newPassword1 },
      {
        label: "Repeat",
        value: "newPassword2",
        ref: newPassword2,
      },
    ];
  const resetPassword = () => {
    if (!viewer) return;
    if (
      !oldPassword.current?.value ||
      !newPassword1.current?.value ||
      !newPassword2.current?.value
    ) {
      setMessage("One or some of the fields are empty.");
      setCalloutColor("red");
      return;
    }
    if (newPassword1.current?.value !== newPassword2.current?.value) {
      setMessage("Repeat does not match!");
      setCalloutColor("red");
      return;
    }
    if (newPassword1.current.value.length < 5) {
      setMessage("Password must be atleast 5 Character");
      setCalloutColor("red");
      return;
    }
    setLoading(true);
    axios
      .post("/api/user/reset-password", {
        userId: viewer.id,
        newPassword: newPassword1.current?.value,
        oldPassword: oldPassword.current?.value,
      })
      .then((res) => {
        setMessage("Password has changed successfully.");
        setCalloutColor("green");
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        setMessage(
          "Can not change password by this values. Change Values an try again."
        );
        console.log(error.response?.data);
        setCalloutColor("red");
        setLoading(false);
      });
  };
  return (
    <Container>
      <Flex direction="column" gap="4" px="4" className="md:w-2/3 min-w-fit">
        <Heading my="3">Reset Password</Heading>
        {fields.map((field) => (
          <Flex key={field.value}>
            <Text className="w-1/2 max-sm:w-3/4">{field.label}</Text>
            <TextField.Root className="w-full">
              <TextField.Input type="password" ref={field.ref} />
            </TextField.Root>
          </Flex>
        ))}
        <Flex gap="5" my="5" justify="end">
          <Button onClick={() => resetPassword()} disabled={loading}>
            Reset Password {loading && <Spinner />}
          </Button>
        </Flex>
        {message && <CalloutComponent color={calloutColor} message={message} />}
      </Flex>
    </Container>
  );
};

export default ResetPassword;
