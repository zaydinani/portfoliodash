import React from "react";
import { getServerSession } from "next-auth";
import { options } from "../App/api/auth/[...nextauth]/options";
import Link from "next/link";
import "../../styles/profile.scss";

const profile = async () => {
  const session = await getServerSession(options);

  return (
    <div className="container">
      <img src="/zayd.jpg" alt="" />
      <p>your name: {session?.user?.name}</p>
      <p>Session Role: {session?.user?.role}</p>
      {/*
      <input
        type="file"
        id="skillLogo"
        name="skillLogo" // Add name attribute
        className="imageInput"
        accept="image/*"
      />
      */}
      <Link href="/api/auth/signout?callbackUrl=/">logout</Link>
    </div>
  );
};

export default profile;
