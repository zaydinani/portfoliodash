import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import connectDB from "../../../config/db";
import Article from "../../../models/articles";

//! Connect to the database
connectDB();

//! Handler for POST requests to add a new article
export const POST = async (req) => {
  const formData = await req.formData();
  const title = formData.get("title");
  const content = formData.get("content");
  const articleBannerImage = formData.get("image");
  if (!title || !content) {
    return NextResponse.json(
      { message: "Title and content are required fields" },
      { status: 400 }
    );
  }
  const uploadImage = async (file) => {
    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${Date.now()}-${file.name}`;
    const directoryPath = path.join(process.cwd(), "public", "articlesBanner"); // Define directoryPath here

    try {
      await fs.mkdir(directoryPath, { recursive: true });
      await fs.writeFile(path.join(directoryPath, fileName), buffer);
      return `/articlesBanner/${fileName}`; // Return the modified path
    } catch (error) {
      console.error(error);
      throw new Error("Error saving image");
    }
  };

  let articleBannerImageUrl = "";
  if (articleBannerImage) {
    articleBannerImageUrl = await uploadImage(articleBannerImage);
  }

  try {
    const newArticle = new Article({
      title,
      content,
      articleBannerImage: articleBannerImageUrl,
    });

    await newArticle.save();

    return NextResponse.json({ message: "Article added successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error adding article" },
      { status: 500 }
    );
  }
};
