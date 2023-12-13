import { Notification } from "@prisma/client";
import { Text } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import { Notif } from "../interfaces";

const NotificationText = ({ notif }: { notif: Notif }) => {
  if (notif.type === "like")
    return (
      <Link href={"posts/" + notif.associated}>
        <Text>{notif.fromUser.name} liked your post.</Text>
      </Link>
    );
  if (notif.type === "comment")
    return (
      <Link href={"posts/" + notif.associated}>
        <Text>{notif.fromUser.name} commented on your post.</Text>
      </Link>
    );
  if (notif.type === "follow")
    return (
      <Link href={"profile/" + notif.associated}>
        <Text>{notif.fromUser.name} followed you.</Text>
      </Link>
    );
  if (notif.type === "repost")
    return (
      <Link href={"posts/" + notif.associated}>
        <Text>{notif.fromUser.name} reposted your post.</Text>
      </Link>
    );
  return;
  null;
};

export default NotificationText;
