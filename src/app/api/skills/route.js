import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import connectDB from "../../../config/db";
import Skill from "../../../models/skill";

//! Connect to the database
connectDB();

//! Handler for GET requests to fetch skills
export const GET = async (req) => {
  try {
    await connectDB();
    const skills = await Skill.find();
    return NextResponse.json(skills); // Ensure this line returns JSON data
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

//! Handler for POST requests to add a new skill
export const POST = async (req) => {
  const formData = await req.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const file = formData.get("skillLogo");

  if (!name || !description || !file) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), "public", "skills", fileName);
  try {
    // Ensure the directory exists
    const dirPath = path.join(process.cwd(), "public", "skills");
    console.log(`Ensuring directory exists: ${dirPath}`);
    await fs.mkdir(dirPath, { recursive: true });

    console.log(`Writing file to: ${filePath}`);
    await fs.writeFile(filePath, buffer);
    console.log("File written successfully");

    // Change permissions after writing the file
    console.log(`Changing permissions for: ${filePath}`);
    await fs.chmod(filePath, 0o755); // 0o755 grants read, write, and execute permissions

    const imageUrl = `/skills/${fileName}`;

    const newSkill = new Skill({ name, description, imageUrl });
    await newSkill.save();

    console.log("Skill added to the database");

    return NextResponse.json({ message: "Skill added successfully!" });
  } catch (error) {
    console.error("Error writing file:", error);
    return NextResponse.json(
      { message: "Error adding skill" },
      { status: 500 }
    );
  }
};
