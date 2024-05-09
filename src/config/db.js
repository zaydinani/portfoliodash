import mongoose from "mongoose";
const { MONGODB_USERNAME, MONGODB_PASSWORD } = process.env;
const mongodb_url = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@maindashboard.fbvwidm.mongodb.net/?retryWrites=true&w=majority`;

if (!MONGODB_USERNAME || !MONGODB_PASSWORD) {
  throw new Error(
    "Please set the MONGODB_USERNAME and MONGODB_PASSWORD environment variables."
  );
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongodb_url);
    console.log("Connected to database successfully!");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};

export default connectDB;
