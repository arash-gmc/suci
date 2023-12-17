"use client";
import { Text } from "@radix-ui/themes";
import React from "react";
import { Notif } from "../interfaces";
import { useRouter } from "next/navigation";

const NotificationText = ({ notif }: { notif: Notif }) => {
  const router = useRouter();
  if (notif.type === "like")
    return (
      <button
        className="text-start"
        onClick={() => router.push("/posts/" + notif.associated)}
      >
        <Text>{notif.fromUser.name} liked your post.</Text>
      </button>
    );
  if (notif.type === "comment")
    return (
      <button onClick={() => router.push("posts/" + notif.associated)}>
        <Text>{notif.fromUser.name} commented on your post.</Text>
      </button>
    );
  if (notif.type === "follow")
    return (
      <button onClick={() => router.push("profile/" + notif.associated)}>
        <Text>{notif.fromUser.name} followed you.</Text>
      </button>
    );
  if (notif.type === "repost")
    return (
      <button onClick={() => router.push("posts/" + notif.associated)}>
        <Text>{notif.fromUser.name} reposted your post.</Text>
      </button>
    );
  return;
  null;
};

export default NotificationText;
