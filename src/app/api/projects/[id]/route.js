import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import connectDB from "../../../../config/db";
import Project from "../../../../models/projects";
import path from "path";

//! Handler for DELETE requests to delete a project
export async function DELETE(request) {
  try {
    // Extract _id from the URL using URLSearchParams
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Extract the last part of the URL path

    console.log("Received _id:", id);
    await connectDB();
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    // Delete project and associated images
    const deletionPromises = [];
    if (project.projectLogo) {
      deletionPromises.push(
        fs.unlink(
          path.join(process.cwd(), "public", project.projectLogo.slice(1))
        )
      );
    }
    for (const imageUrl of project.projectMainImages) {
      deletionPromises.push(
        fs.unlink(path.join(process.cwd(), "public", imageUrl.slice(1)))
      );
    }
    for (const imageUrl of project.projectSecondaryImages) {
      deletionPromises.push(
        fs.unlink(path.join(process.cwd(), "public", imageUrl.slice(1)))
      );
    }
    deletionPromises.push(project.deleteOne());

    await Promise.all(deletionPromises);

    return NextResponse.json(
      { message: "Project and associated images deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project or images:", error);
    return NextResponse.json(
      { message: "Error deleting project" },
      { status: 500 }
    );
  }
}

//! Handler for GET requests to fetch  one project
export async function GET(request) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // Extract the last part of the URL path
  console.log("id is:" + id);
  try {
    await connectDB();

    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (error) {
    console.error("Error fetching Project:", error);
    return NextResponse.json(
      { message: "Error retrieving Project from database" },
      { status: 500 }
    );
  }
}

//! Handler for PUT requests to update a project
export async function PUT(request) {
  try {
    const formData = await request.formData();
    const id = request.url.split("/").pop(); // Extract the last part of the URL path

    console.log("Received _id:", id);
    await connectDB();
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }

    console.log("Received formData:", formData); // Log the formData object

    const projectSkills = formData.get("projectSkills"); // Extract projectSkills value

    console.log("Received projectSkills:", projectSkills); // Log the projectSkills value

    // Update project fields
    project.projectTitle = formData.get("projectTitle");
    project.projectType = formData.get("projectType");
    project.projectUrl = formData.get("projectUrl");
    project.githubUrl = formData.get("githubUrl");
    project.projectDescription1 = formData.get("projectDescription1");
    project.projectDescription2 = formData.get("projectDescription2");
    project.dateFinished = formData.get("dateFinished");
    project.projectSkills = JSON.parse(projectSkills); // Parse projectSkills

    // Save the updated project
    await project.save();

    return NextResponse.json(
      { message: "Project updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { message: "Error updating project" },
      { status: 500 }
    );
  }
}
