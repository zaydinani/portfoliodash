import mongoose, { Schema } from "mongoose";
import connectDB from "../config/db";

connectDB();
const projectSchema = new Schema(
  {
    projectTitle: {
      type: String,
    },
    projectType: {
      type: String,
    },
    projectUrl: {
      type: String,
    },
    githubUrl: {
      type: String,
    },
    projectDescription1: {
      type: String,
    },
    projectDescription2: {
      type: String,
    },
    dateFinished: {
      type: String,
    },
    projectLogo: {
      type: String,
    },
    projectMainImages: {
      type: [String],
    },
    projectSecondaryImages: {
      type: [String],
    },
    projectSkills: [{ type: mongoose.Schema.Types.ObjectId, ref: "skill" }],
  },
  {
    timestamps: true,
  }
);

const project =
  mongoose.models.project || mongoose.model("project", projectSchema);

export default project;
