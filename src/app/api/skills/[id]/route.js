import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import connectDB from "../../../../config/db";
import Skill from "../../../../models/skill";
import path from "path";

//! Handler for PUT requests to update a skill
export async function PUT(request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const file = formData.get("image"); // Use "image" to match the frontend formData key

  const id = request.url.split("/").pop();
  await connectDB();

  try {
    const skill = await Skill.findById(id);
    if (!skill) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 });
    }

    skill.name = name;
    skill.description = description;

    if (file && file.size > 0) {
      // Delete the old image if it exists
      if (skill.imageUrl) {
        const oldImagePath = path.join(process.cwd(), "public", skill.imageUrl);
        try {
          await fs.unlink(oldImagePath);
          console.log("Old image file deleted successfully");
        } catch (err) {
          console.error("Error deleting old image file:", err);
        }
      }

      // Save the new image
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(process.cwd(), "public", "skills", fileName);
      await fs.writeFile(filePath, buffer);
      skill.imageUrl = `/skills/${fileName}`;
    }

    await skill.save();

    return NextResponse.json(
      { message: "Skill updated successfully", skill },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating skill:", error);
    return NextResponse.json(
      { message: "Error updating skill" },
      { status: 500 }
    );
  }
}
//! Handler for DELETE requests to delete a skill
export async function DELETE(request) {
  try {
    //? Extract _id from the URL using URLSearchParams
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop(); // Extract the last part of the URL path

    console.log("Received _id:", id);
    await connectDB();
    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 });
    }

    //? Delete the associated image file
    if (skill.imageUrl) {
      const imagePath = path.join(process.cwd(), "public", skill.imageUrl);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Error deleting image file:", err);
        } else {
          console.log("Image file deleted successfully");
        }
      });
    }

    return NextResponse.json(
      { message: "Skill and associated image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting skill:", error);
    return NextResponse.json(
      { message: "Error deleting skill" },
      { status: 500 }
    );
  }
}

//! Handler for GET requests to fetch one skill
export async function GET(request) {
  // Changed to GET for data fetching
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop(); // Extract the last part of the URL path

  try {
    await connectDB();

    const skill = await Skill.findById(id);

    if (!skill) {
      return NextResponse.json({ message: "Skill not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Skill retrieved successfully", skill },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching skill:", error);
    return NextResponse.json(
      { message: "Error retrieving skill from database" },
      { status: 500 }
    );
  }
}

// Config to disable body parsing for form data handling
export const config = {
  api: {
    bodyParser: false,
  },
};
