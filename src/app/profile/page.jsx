import React from "react";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Link from "next/link";

const profile = async () => {
  const session = await getServerSession(options);

  return (
    <div>
      <h1>Session Name: {session?.user?.name}</h1>
      <h1>Session Role: {session?.user?.role}</h1>
      <Link href="/api/auth/signout?callbackUrl=/">logout</Link>
    </div>
  );
};

export default profile;
