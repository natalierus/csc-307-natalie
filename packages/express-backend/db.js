import mongoose from "mongoose";
import 'dotenv/config';

const uri = process.env.MONGODB_URI;

export async function connectDB() {


  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB:", uri);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
}
