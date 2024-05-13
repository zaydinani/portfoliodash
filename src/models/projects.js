import mongoose, { Schema } from "mongoose";
import connectDB from "../config/db";

connectDB();
const projectSchema = new Schema(
  {
    projectTitle: {
      type: String,
      required: true,
    },
    projectType: {
      type: String,
      required: true,
    },
    projectUrl: {
      type: String,
      required: false,
    },
    githubUrl: {
      type: String,
      required: false,
    },
    projectDescription1: {
      type: String,
      required: true,
    },
    projectDescription2: {
      type: String,
      required: true,
    },
    dateFinished: {
      type: String,
      required: true,
    },
    projectLogo: {
      type: String,
      required: true,
    },
    projectMainImages: {
      type: String,
      required: true,
    },
    projectSecondaryImages: {
      type: String,
      required: true,
    },
    projectSkills: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "skill",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const project =
  mongoose.models.project || mongoose.model("project", projectSchema);

export default project;
