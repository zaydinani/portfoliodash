// src/models/skill.js

import mongoose, { Schema } from "mongoose";
import connectDB from "../config/db";

connectDB();

const skillSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const skill = mongoose.models.skill || mongoose.model("skill", skillSchema);

export default skill;
