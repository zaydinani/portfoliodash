import mongoose, { Schema } from "mongoose";
import connectDB from "../config/db";

connectDB();
const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const admin = mongoose.models.admin || mongoose.model("admin", adminSchema);

export default admin;
