import mongoose, { Schema } from "mongoose";

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    articleBannerImage: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Article =
  mongoose.models.Article || mongoose.model("Article", articleSchema);

export default Article;
