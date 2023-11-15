import { getServerSession } from "next-auth";
import React from "react";
import { nextauthConfig } from "./api/auth/[...nextauth]/route";

const NavBar = async () => {
  const session = await getServerSession(nextauthConfig);
  console.log(session?.user);
  return <div>Nav</div>;
};

export default NavBar;
