import { NextResponse } from "next/server";
import admin from "../../../models/admin";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const adminData = body.formData;
    if (!adminData?.name || !adminData.password) {
      return NextResponse.json(
        { message: "all fields are required" },
        { status: 400 }
      );
    }
    const hashPassword = await bcrypt.hash(adminData.password, 16);
    adminData.password = hashPassword;
    await admin.create(adminData);
    return NextResponse.json({ message: "admin created" }, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "error", error }, { status: 500 });
  }
}

// Disable default body parsing
export const config = {
  api: {
    bodyParser: false,
  },
};
