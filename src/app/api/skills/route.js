import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import connectDB from "../../../config/db";
import Skill from "../../../models/skill";

// Connect to the database
connectDB();

// Handler for GET requests to fetch skills
export const GET = async (req) => {
  try {
    const skills = await Skill.find({});
    return NextResponse.json(skills);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

// Handler for POST requests to add a new skill
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
    await fs.writeFile(filePath, buffer);
    const imageUrl = `/skills/${fileName}`;

    const newSkill = new Skill({ name, description, imageUrl });
    await newSkill.save();

    return NextResponse.json({ message: "Skill added successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error adding skill" },
      { status: 500 }
    );
  }
};

// Config to disable body parsing for form data handling
export const config = {
  api: {
    bodyParser: false,
  },
};
