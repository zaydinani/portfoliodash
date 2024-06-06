import { NextResponse } from "next/server";
import Project from "../../../models/projects";
import fs from "fs/promises";
import path from "path";
import connectDB from "../../../config/db";

//! Connect to the database
connectDB();

//! Handler for GET requests to fetch skills
export const GET = async (req) => {
  try {
    await connectDB();
    const projects = await Project.find();
    console.log(projects);
    return NextResponse.json(projects); // Ensure this line returns JSON data
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
};

//! post request to add project
export const POST = async (req) => {
  const formData = await req.formData();
  const projectTitle = formData.get("projectTitle");
  const projectType = formData.get("projectType");
  const projectUrl = formData.get("projectUrl");
  const githubUrl = formData.get("githubUrl");
  const projectDescription1 = formData.get("projectDescription1");
  const projectDescription2 = formData.get("projectDescription2");
  const dateFinished = formData.get("dateFinished");
  const projectSkills = JSON.parse(formData.get("projectSkills"));
  const projectLogo = formData.get("projectLogo");
  const projectMainImages = formData.getAll("projectMainImages");
  const projectSecondaryImages = formData.getAll("projectSecondaryImages");

  if (
    !projectTitle ||
    !projectType ||
    !projectDescription1 ||
    !projectDescription2 ||
    !dateFinished ||
    !projectSkills ||
    !Array.isArray(projectSkills) ||
    projectSkills.length === 0
  ) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const uploadFile = async (file, directory) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const directoryPath = path.join(process.cwd(), "public", directory);
    const filePath = path.join(directoryPath, fileName);

    try {
      await fs.mkdir(directoryPath, { recursive: true });
      await fs.writeFile(filePath, buffer);
      return `/${directory}/${fileName}`;
    } catch (error) {
      console.error(error);
      throw new Error("Error saving file");
    }
  };

  let imageUrl = "";
  try {
    if (projectLogo) {
      imageUrl = await uploadFile(projectLogo, "projects");
    }

    const mainImagesUrls = [];
    for (const file of projectMainImages) {
      const url = await uploadFile(file, "projects/main");
      mainImagesUrls.push(url);
    }

    const galleryUrls = [];
    for (const file of projectSecondaryImages) {
      const url = await uploadFile(file, "projects/gallery");
      galleryUrls.push(url);
    }

    const newProject = new Project({
      projectTitle,
      projectType,
      projectUrl,
      githubUrl,
      projectDescription1,
      projectDescription2,
      dateFinished,
      projectSkills,
      projectLogo: imageUrl,
      projectMainImages: mainImagesUrls,
      projectSecondaryImages: galleryUrls,
    });

    await newProject.save();

    return NextResponse.json({ message: "Project added successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error adding project" },
      { status: 500 }
    );
  }
};
